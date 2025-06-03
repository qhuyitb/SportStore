// Thêm đoạn code này vào file JavaScript của trang main.html
// hoặc trong thẻ <script> ở cuối trang main.html

document.addEventListener('DOMContentLoaded', function() {
    // Lấy thông tin từ localStorage
    const fullName = localStorage.getItem('fullName');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    
    const accountDropdown = document.querySelector('.account-dropdown');
    
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!fullName && !username && !role) {
        // Nếu CHƯA đăng nhập, hiển thị giao diện cũ
        accountDropdown.innerHTML = `
            <i class="fa-solid fa-user"></i>
            <div class="nav-text">
                <span>Thông tin </span> 
                <span class="highlight">
                    Tài khoản
                    <i class="fa-solid fa-caret-down"></i>
                </span>
            </div>
            <div class="dropdown-menu">
                <a href="../html/login.html">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    Đăng nhập
                </a>
                <a href="../html/signup.html">
                    <i class="fa-solid fa-user-plus"></i>
                    Đăng ký
                </a>
                <a href="#" data-wishlist-trigger>
                    <i class="fa-solid fa-heart"></i>
                    Danh sách yêu thích 
                </a>
            </div>
        `;
    } else {
        // Nếu ĐÃ đăng nhập, hiển thị tên người dùng
        accountDropdown.innerHTML = `
            <i class="fa-solid fa-user"></i>
            <div class="nav-text">
                <span>Xin chào </span>
                <span class="highlight">
                    <span id="userNameDisplay" style="font-size: 14px;">${fullName || username}</span>
                    <i class="fa-solid fa-caret-down"></i>
                </span>
            </div>
            <div class="dropdown-menu">
                <a href="javascript:logout()">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    Đăng xuất
                </a>
                <a href="../html/account.html">
                    <i class="fa-solid fa-user"></i>
                    Tài khoản
                </a>
            </div>
        `;
    }
});

// Thêm chức năng đăng xuất
function logout() {
    // Xóa thông tin khỏi localStorage
    localStorage.removeItem('fullName');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    
    // Reload trang để hiển thị lại giao diện chưa đăng nhập
    window.location.reload();
}