
// Modal wishlist 
document.addEventListener('DOMContentLoaded', function() {
    // 1. Khởi tạo danh sách yêu thích từ LocalStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // 2. Các phần tử UI
    const favoriteTotalElement = document.querySelector('.favorite-total');
    const wishlistModal = document.getElementById('wishlistModal');

    // 3. Cập nhật giao diện ban đầu
    updateFavoriteUI();
    initModalEvents();

    // 4. Lắng nghe sự kiện click vào trái tim
    document.addEventListener('click', function(e) {
        const heartIcon = e.target.closest('.product-wishlist i');
        if (!heartIcon) return;

        e.preventDefault();
        e.stopPropagation();

        const productCard = heartIcon.closest('.product-card');
        const productData = getProductData(productCard);

        toggleFavorite(productData, heartIcon);
    });

    // 5. Lấy thông tin sản phẩm
    function getProductData(productCard) {
        // Chỉ lấy ảnh second (ảnh chính)
        const productImage = productCard.querySelector('.product-image-second');
        
        return {
            id: productCard.dataset.id || generateUniqueId(),
            name: productCard.querySelector('h3')?.textContent.trim() || "Sản phẩm chưa có tên",
            price: productCard.querySelector('.current-price')?.textContent.trim() || "0 đ",
            image: productImage?.src || 'https://via.placeholder.com/80', // Chỉ lấy ảnh second
            sizes: productCard.dataset.sizes ? productCard.dataset.sizes.split(',') : ["Không có kích thước"]
        };
    }

    // 6. Thêm/xóa sản phẩm khỏi yêu thích
    function toggleFavorite(product, heartIcon) {
        const existingIndex = favorites.findIndex(item => item.id === product.id);

        if (existingIndex === -1) {
            favorites.push(product);
            heartIcon.classList.add('active');
            showAlert(`Đã thêm "${product.name}" vào yêu thích`);
        } else {
            favorites.splice(existingIndex, 1);
            heartIcon.classList.remove('active');
            showAlert(`Đã bỏ "${product.name}" khỏi yêu thích`);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteUI();
    }

    // 7. Cập nhật giao diện
    function updateFavoriteUI() {
        if (favoriteTotalElement) {
            favoriteTotalElement.textContent = `${favorites.length} sản phẩm`;
        }

        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.id;
            const heartIcon = card.querySelector('.product-wishlist i');
            if (heartIcon) {
                heartIcon.classList.toggle('active', 
                    favorites.some(item => item.id === productId));
            }
        });
    }

    // 8. Hiển thị thông báo
    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'favorite-alert animate__animated animate__fadeInUp';
        alert.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
        document.body.appendChild(alert);
        setTimeout(() => {
            alert.classList.add('animate__fadeOutDown');
            setTimeout(() => alert.remove(), 500);
        }, 2500);
    }

    // 9. Khởi tạo sự kiện cho modal
    function initModalEvents() {
        document.addEventListener('click', function(e) {
            const trigger = e.target.closest('[data-wishlist-trigger]');
            if (!trigger) return;

            e.preventDefault();
            renderWishlistModal();

            if (wishlistModal) {
                const modal = new bootstrap.Modal(wishlistModal, {
                    backdrop: 'static',
                    keyboard: false
                });
                modal.show();
            }
        });
    }

    // 10. Render nội dung modal
    function renderWishlistModal() {
        if (!wishlistModal) return;

        const container = wishlistModal.querySelector('.modal-body');
        if (!container) return;

        if (favorites.length === 0) {
            container.innerHTML = `<div class="empty-wishlist text-center py-5">
                <i class="far fa-heart text-muted" style="font-size: 3rem;"></i>
                <p class="mt-3">Danh sách yêu thích trống</p>
            </div>`;
            return;
        }

        container.innerHTML = favorites.map(product => `
            <div class="wishlist-item d-flex align-items-center py-3 border-bottom">
                <img src="${product.image}" alt="${product.name}" 
                     class="wishlist-item-img rounded" width="80" height="80">
                <div class="ms-3 flex-grow-1">
                    <h6 class="mb-1">${product.name}</h6>
                    <div class="text-danger fw-bold">${product.price}</div>
                    <div class="text-muted small">Size: ${(product.sizes || []).join(', ')}</div>
                </div>
                <button class="btn btn-sm btn-outline-danger remove-wishlist" 
                        data-id="${product.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');

        container.querySelectorAll('.remove-wishlist').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                favorites = favorites.filter(item => item.id !== productId);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderWishlistModal();
                updateFavoriteUI();
            });
        });
    }

    // 11. Tạo ID ngẫu nhiên
    function generateUniqueId() {
        return 'prod-' + Math.random().toString(36).substr(2, 9);
    }
});


// (modal cart bên navbar.js)