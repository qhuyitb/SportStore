// lọc sản phẩm theo dataglory
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productWrapper = document.querySelector('.best-selling-section');
    const productCards = productWrapper.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Xóa class active khỏi tất cả các nút
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Thêm class active vào nút được click
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Lọc sản phẩm với hiệu ứng mượt
            productCards.forEach(card => {
                card.style.transition = 'opacity 0.3s, transform 0.3s';
                
                if (category === 'all' || card.dataset.category === category) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.display = 'block';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); 
                }
            });
        });
    });
});


// ẩn sản phâm 
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const productWrapper = document.querySelector('.bestsale-products-wrapper');
    const allProducts = Array.from(productWrapper.querySelectorAll('.product-card'));
    const productsPerRow = 5; // Số sản phẩm mỗi hàng
    let isExpanded = false;
    
    // Chia sản phẩm thành các hàng
    const productRows = [];
    for (let i = 0; i < allProducts.length; i += productsPerRow) {
        productRows.push(allProducts.slice(i, i + productsPerRow));
    }
    
    // Ban đầu hiển thị 2 hàng đầu
    productRows.forEach((row, index) => {
        row.forEach(product => {
            if (index < 2) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
    
    viewMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (isExpanded) {
            // Thu gọn - chỉ hiển thị 2 hàng đầu
            productRows.forEach((row, index) => {
                row.forEach(product => {
                    if (index >= 2) {
                        product.style.display = 'none';
                    }
                });
            });
            viewMoreBtn.innerHTML = '<span>Xem thêm sản phẩm</span><i class="fas fa-arrow-right"></i>';
            isExpanded = false;
            
            // Cuộn lên trên
            setTimeout(() => {
                window.scrollBy({
                    top: -200,
                    behavior: 'smooth'
                });
            }, 300);
        } else {
            // Mở rộng - hiển thị tất cả
            productRows.forEach(row => {
                row.forEach(product => {
                    product.style.display = 'block';
                });
            });
            viewMoreBtn.innerHTML = '<span>Thu gọn</span><i class="fas fa-arrow-right"></i>';
            isExpanded = true;
        }
    });
});






