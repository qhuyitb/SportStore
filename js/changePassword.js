// document.getElementById('passwordForm').addEventListener('submit', async function(e) {
//   e.preventDefault();

//   const username = localStorage.getItem('username');
//   const oldPass = document.getElementById('currentPassword').value;
//   const newPass1 = document.getElementById('newPassword').value;
//   const newPass2 = document.getElementById('confirmPassword').value;
//   const resultBox = document.getElementById('result');
//   console.log(oldPass);
//   console.log(newPass1);
//   console.log(newPass2);
//    console.log('passwordForm');
//   // Kiểm tra mật khẩu mới nhập 2 lần có khớp không
//   if (newPass1 !== newPass2) {
//     resultBox.innerText = 'Mật khẩu mới nhập lại không khớp!';
//     return;
//   }

//   // Kiểm tra mật khẩu mới khác mật khẩu cũ
//   if (newPass1 === oldPass) {
//     resultBox.innerText = 'Mật khẩu mới không được trùng với mật khẩu cũ!';
//     return;
//   }

//   // Gửi dữ liệu lên server
//   try {
//     const response = await fetch('http://localhost:3000/api/changePassword', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         username,
//         oldPassword: oldPass,
//         newPassword: newPass1
//       })
//     });

//     const data = await response.json();
//     resultBox.style.color = response.ok ? 'green' : 'red';
//     resultBox.innerText = data.message;
//   } catch (error) {
//     resultBox.innerText = 'Có lỗi xảy ra khi gửi yêu cầu!';
//   }
// });
document.getElementById('passwordForm').addEventListener('submit', async function(e) {
  e.preventDefault();
e.stopImmediatePropagation();
  // Kiểm tra phần tử hiển thị kết quả
  const resultBox = document.getElementById('result');
  if (!resultBox) {
    console.error('Không tìm thấy phần tử #result để hiển thị thông báo');
    alert('Hệ thống đang có lỗi, vui lòng thử lại sau');
    return;
  }

  // Lấy giá trị từ form
  const username = localStorage.getItem('username');
  const oldPass = document.getElementById('currentPassword').value;
  const newPass1 = document.getElementById('newPassword').value;
  const newPass2 = document.getElementById('confirmPassword').value;

  console.log('Dữ liệu gửi đi:', { username, oldPass, newPass1, newPass2 });

  // Reset thông báo
  resultBox.innerText = '';
  resultBox.style.color = '';

  // Validate
  if (newPass1 !== newPass2) {
    resultBox.innerText = 'Mật khẩu mới nhập lại không khớp!';
    resultBox.style.color = 'red';
    return;
  }

  if (newPass1 === oldPass) {
    resultBox.innerText = 'Mật khẩu mới không được trùng với mật khẩu cũ!';
    resultBox.style.color = 'red';
    return;
  }

  try {
    console.log('Đang gửi yêu cầu đổi mật khẩu...');
    
    const response = await fetch('http://localhost:3000/api/changePassword', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        username,
        oldPassword: oldPass,
        newPassword: newPass1
      })
    });

    const data = await response.json();
    console.log('Phản hồi từ server:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Lỗi không xác định từ server');
    }

    resultBox.style.color = 'green';
    resultBox.innerText = data.message || 'Đổi mật khẩu thành công!';
    
    // Reset form
    this.reset();

  } catch (error) {
    console.error('Lỗi trong quá trình đổi mật khẩu:', error);
    resultBox.style.color = 'red';
    resultBox.innerText = error.message || 'Có lỗi xảy ra khi đổi mật khẩu';
  }
});