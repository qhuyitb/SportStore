const fullName = localStorage.getItem('fullName');
const username = localStorage.getItem('username');
//   if (fullName ) {
    document.getElementById('fullNameDisplay').textContent = fullName;
    document.getElementById('usernameDisplay').textContent = username;
    document.getElementById('fullNameDisplay1').textContent = fullName;
    document.getElementById('getemail').textContent = username;
    
//   } else {
//     // Nếu không có fullName (chưa đăng nhập) thì chuyển về login
//     window.location.href = '../html/login.html';
//   }