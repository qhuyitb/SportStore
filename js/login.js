async function login() {
  event.preventDefault();// ngăn trang load lại 
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (data.success) {
    // localStorage.setItem("clientId", data.clientId);
    localStorage.setItem('fullName', data.fullName);
    localStorage.setItem('username', data.username);
    localStorage.setItem('role', data.role);
     // thay managerId thành clientId
    if (data.role === 1) {
      window.location.href = "../html/main.html"; // Người dùng thông thường
    } else if (data.role === 2) {
      window.location.href = "../html/admin.html"; // Quản trị viên
    } else {
      alert("Vai trò không xác định!");
    }
  } else {
    alert("Đăng nhập thất bại: " + data.message);
  }
  return false;// ngăn trang submit thêm
}