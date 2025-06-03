
  async function fetchOrderHistory() {
  const username = localStorage.getItem('username'); // lấy từ login hoặc client truyền vào
    const res = await fetch('http://localhost:3000/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();

    // Chuyển dữ liệu dạng flat thành grouped theo orderId
    const ordersMap = {};

    data.forEach(item => {
      const id = item.orderId;
      if (!ordersMap[id]) {
        ordersMap[id] = {
          orderId: id,
          orderDate: item.orderDate,
          total: item.total,
          shippingMethod: item.shippingMethod,
          paymentMethod: item.paymentMethod,
          products: [],
        };
      }
      ordersMap[id].products.push({
        name: item.productName,
        quantity: item.quantity,
      });
    });

    const orders = Object.values(ordersMap);

    const container = document.getElementById('orders-container');
    container.innerHTML = '';

    orders.forEach(order => {
      const orderDate = new Date(order.orderDate);
      const formattedDate = orderDate.toLocaleDateString('vi-VN');

      // Tạo chuỗi sản phẩm
      const productsStr = order.products
        .map(p => `${p.name} (x${p.quantity})`)
        .join(', ');

      // Tạo HTML cho đơn hàng
      const orderHTML = `
        <div class="order-card">
          <div class="order-header">
            <div>
              <div class="order-id">#${order.orderId}</div>
              <div>Ngày đặt: ${formattedDate}</div>
            </div>
            <div class="order-methods">
              <div><strong>Vận chuyển:</strong> ${order.shippingMethod}</div>
              <div><strong>Thanh toán:</strong> ${order.paymentMethod}</div>
            </div>
          </div>
          <div class="order-details">
            <p><strong>Sản phẩm:</strong> ${productsStr}</p>
            <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString('vi-VN')} VNĐ</p>
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', orderHTML);
    });
  }

  // Gọi hàm lấy dữ liệu và render
  fetchOrderHistory();
