function updateMap(lat, lng, element) {
    // Hiển thị loading spinner khi bản đồ đang tải
    document.querySelector('.map-loading').style.display = 'flex';
    
    // Cập nhật lại đường dẫn của iframe để thay đổi vị trí trên bản đồ
    document.getElementById('mapFrame').src = `https://www.google.com/maps?q=${lat},${lng}&hl=vi&z=15&output=embed`;
    
    // Loại bỏ class "active" 
    document.querySelectorAll('.store-item').forEach(item => {
        item.classList.remove('active');
    });
    
    
    if (element) {
        // Thêm class "active" vào cửa hàng được chọn
        element.classList.add('active');
        
        // Cuộn cửa hàng được chọn vào tầm nhìn nếu nó đang bị khuất
        element.scrollIntoView({
            behavior: 'smooth',   // Cuộn mượt mà
            block: 'nearest'      // Căn chỉnh phần tử gần nhất có thể
        });
    }
}
