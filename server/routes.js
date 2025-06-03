const express = require('express');
const router = express.Router();
const pool = require('./db').pool;
const { sql, poolConnect } = require('./db');
router.use(express.json());
// Đăng nhập cho client
router.post('/api/login', async (req, res) => {
  await poolConnect;
  const { username, password } = req.body;
  try {
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query(`SELECT * FROM client WHERE username = @username AND password = @password`);

    if (result.recordset.length > 0) {
      const fullName = result.recordset[0].fullName;
      const role = result.recordset[0].role;
      // res.json({ success: true, clientId: result.recordset[0].ID, });
      res.json({ success: true, fullName, username , role});
    } else {
      res.json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// API Đăng ký tài khoản mới cho bảng `client`
router.post('/api/signup', async (req, res) => {
  await poolConnect;
  const { username, password, fullName } = req.body;

  try {
    // Kiểm tra username (email) đã tồn tại chưa
   const checkResult = await pool.request()
  .input('username', sql.VarChar, username)
  .query('SELECT * FROM client WHERE username = @username');


    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ message: 'Email đã tồn tại.' });
    }

    // Thêm người dùng mới
    await pool.request()
  .input('username', sql.VarChar, username)
  .input('password', sql.VarChar, password)
  .input('fullName', sql.NVarChar, fullName)
  .input('role', sql.Int, 1)  // gán role = 1
  .query(`
    INSERT INTO client (username, password, fullName, role)
    VALUES (@username, @password, @fullName, @role)
  `);


    res.status(200).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
});

// tra kq 
router.post('/api/welcome', async (req, res) => {
  await poolConnect;
    if (req.session.user) {
        res.json({ fullName: req.session.user.fullName });
    } else {
        res.status(401).json({ message: 'Chưa đăng nhập' });
    }
});
// lấy email== username, fullName 
// router.post('/api/user-info', async (req, res) => {
//   const { username, fullName } = req.body; // email chính là username
//   const result = await sql.query`SELECT username, fullName FROM Client WHERE username = ${username}`;
//   if (result.recordset.length > 0) {
//     res.json(result.recordset[0]);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });

//  đổi mk 
router.post('/api/changePassword', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Thiếu thông tin' });
  }

  try {
    await poolConnect; // nếu bạn đang dùng poolConnect bên ngoài
    const request = pool.request();

    // 1. Kiểm tra mật khẩu cũ
    const checkResult = await request
      .input('username', sql.VarChar, username)
      .input('oldPassword', sql.VarChar, oldPassword)
      .query(`SELECT * FROM client WHERE username = @username AND password = @oldPassword`);

    if (checkResult.recordset.length === 0) {
      return res.status(401).json({ message: 'Mật khẩu cũ không đúng' });
    }

    // 2. Cập nhật mật khẩu mới
    const updateResult = await pool.request()
      .input('username', sql.VarChar, username)
      .input('newPassword', sql.VarChar, newPassword)
      .query(`UPDATE client SET password = @newPassword WHERE username = @username`);

    if (updateResult.rowsAffected[0] > 0) {
      res.json({ message: 'Đổi mật khẩu thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy user' });
    }

  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// cập nhật hồ sơ
router.post('/api/profile', async (req, res) => {
    const { tel, ngaySinh, sex , username} = req.body;

    // Lấy username từ session, token, hoặc middleware
    console.log(username);

    if (!username) {
        return res.status(401).json({ message: "Không xác định được người dùng" });
    }

    try {
      const request = pool.request();
        request.input('tel', sql.VarChar, tel);
        request.input('ngaySinh', sql.Date, ngaySinh);
        request.input('sex', sql.VarChar, sex);
        request.input('username', sql.VarChar, username); // Đổi lại kiểu phù hợp (username thường là chuỗi)

        await request.query(`
            UPDATE client 
            SET tel = @tel, ngaySinh = @ngaySinh, sex = @sex 
            WHERE username = @username;
        `);

        res.json({ message: "Cập nhật thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi khi cập nhật thông tin" });
    }
});
// trả thông tin đã cập nhật lên hiện thị cho người nhìn
router.post('/api/profileDisplay', async (req, res) => {
    const { username } = req.body; 
    try {
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT tel, ngaySinh, sex FROM client WHERE username = @username');

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server.' });
    }
});

// lưu thông tin để làm phần lịch sử thanh toán 
  router.post('/api/checkout', async (req, res) => {
    const { username, orderId, orderDate, total, cartItems, shippingMethod, paymentMethod } = req.body;

    if (!username || !orderId || !cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Thiếu thông tin đơn hàng.' });
    }

    try {
        const poolConn = await pool.connect(); // Dùng pool đã khai báo từ trước

        // Bắt đầu transaction nếu cần đảm bảo tính toàn vẹn
        const transaction = new sql.Transaction(poolConn);
        await transaction.begin();

        const request = new sql.Request(transaction);
        request.input('orderId', sql.VarChar(20), orderId);
        request.input('username', sql.VarChar(100), username);
        request.input('orderDate', sql.DateTime, orderDate);
        request.input('total', sql.Decimal(10, 2), total);
        request.input('shippingMethod', sql.NVarChar(100), shippingMethod);
        request.input('paymentMethod', sql.NVarChar(100), paymentMethod);

        await request.query(`
            INSERT INTO Orders (orderId, username, orderDate, total, shippingMethod, paymentMethod)
            VALUES (@orderId, @username, @orderDate, @total, @shippingMethod, @paymentMethod)
        `);

        // Thêm từng sản phẩm trong giỏ hàng vào OrderItems
        for (const item of cartItems) {
            const itemRequest = new sql.Request(transaction);
            itemRequest.input('orderId', sql.VarChar(20), orderId);
            itemRequest.input('name', sql.NVarChar(100), item.name);
            itemRequest.input('quantity', sql.Int, item.quantity);

            await itemRequest.query(`
                INSERT INTO OrderItems (orderId, name, quantity)
                VALUES (@orderId, @name, @quantity)
            `);
        }

        await transaction.commit();
        res.status(200).json({ message: 'Đơn hàng đã được lưu.' });
    } catch (err) {
        console.error('❌ Lỗi khi lưu đơn hàng:', err);
        res.status(500).json({ error: 'Lỗi server khi lưu đơn hàng.' });
    }
});
// lấy data để hiện ở phần lịch sử mua hàng
router.post('/api/history', async (req, res) => {
    const { username } = req.body;  // lấy username từ client gửi lên

    if (!username) {
        return res.status(400).json({ error: 'Thiếu username' });
    }

    try {
        // Dùng pool đã tạo sẵn (giả sử bạn đã khai báo pool ở ngoài)
        const result = await pool.request()
            .input('username', sql.VarChar(100), username)
            .query(`
                SELECT 
                    o.orderId,
                    o.orderDate,
                    o.total,
                    o.shippingMethod,
                    o.paymentMethod,
                    i.name AS productName,
                    i.quantity
                FROM Orders o
                JOIN OrderItems i ON o.orderId = i.orderId
                WHERE o.username = @username
                ORDER BY o.orderDate DESC, o.orderId, i.id
            `);

        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy lịch sử:', err);
        res.status(500).json({ error: 'Lỗi server khi lấy lịch sử' });
    }
});

 module.exports = router;






 // cap quyen cho role trong sql
// UPDATE client
// SET role = 1
// WHERE username = 'gdfgdsfds@gmail.com';

// them moi 
// INSERT INTO client (username, password, fullName, role, tel, ngaySinh, sex)
// VALUES ('admin@example.com', 'password123', N'Admin', 2, '0987654321', '1992-05-20', 'Nam');