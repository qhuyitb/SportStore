document.addEventListener('DOMContentLoaded', function() {
    const optionBtn = document.querySelector('.option-btn');
    const popup = document.getElementById('product-popup');
    const closeBtn = document.querySelector('.close-btn');

    // Mở popup khi click Tùy chọn
    optionBtn.addEventListener('click', function() {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Ngăn scroll khi popup mở
    });

    // Đóng popup khi click nút đóng
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Đóng popup khi click bên ngoài
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Lắng nghe sự kiện click trên tất cả các ô màu
    document.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener('click', function() {
            // Lấy đường dẫn hình ảnh từ thuộc tính data-src
            const imagePath = this.getAttribute('data-src');
            
            if (!imagePath) return; // Nếu không có data-src thì bỏ qua
            
            // Tìm phần tử cha gần nhất là product-item
            const productItem = this.closest('.product-item');
            
            // Thay đổi hình ảnh sản phẩm
            if (productItem) {
                const imgSecond = productItem.querySelector('.product-img-second');
                if (imgSecond) {
                    imgSecond.src = imagePath ; // Thêm đuôi file
                    
                    // Cập nhật cả data-src của hình ảnh để sau này có thể sử dụng
                    imgSecond.setAttribute('data-src', imagePath);
                }
                
                
            }
            
            // Thêm hiệu ứng active cho ô màu được chọn
            this.closest('.color-boxes').querySelectorAll('.color-box').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});



// / heart  
// Cách 1: Dùng event delegation (chắc chắn bắt được sự kiện)
document.addEventListener('click', function(e) {
    const heart = e.target.closest('.favor-heart');
    if (heart) {
        e.preventDefault();
        heart.classList.toggle('active');
        console.log("Đã click!"); // Kiểm tra trong Console (F12)
    }
});