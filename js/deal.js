// Countdown Timer 

document.addEventListener('DOMContentLoaded', function() {
    const timerNumbers = document.querySelectorAll('.timer-number');
    let days = 587, hours = 10, minutes = 29, seconds = 37;
    
    const countdown = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        
        if (hours < 0) {
            hours = 23;
            days--;
        }
        
        if (days < 0) {
            clearInterval(countdown);
            return;
        }
        
        timerNumbers[0].textContent = days;
        timerNumbers[1].textContent = hours.toString().padStart(2, '0');
        timerNumbers[2].textContent = minutes.toString().padStart(2, '0');
        timerNumbers[3].textContent = seconds.toString().padStart(2, '0');
    }, 1000);
});

// Heart Dùng event delegation 
document.addEventListener('click', function(e) {
    const heart = e.target.closest('.product-wishlist');
    if (heart) {
        e.preventDefault();
        heart.classList.toggle('active');
       
    }
});

// sale controls
const dealSlider = document.querySelector('.deal-products-container');
const dealLeftArrow = document.querySelector('.deal-slider-arrow.left-arrow');
const dealRightArrow = document.querySelector('.deal-slider-arrow.right-arrow');
const dealScrollAmount = 300;

function updateDealArrows() {
    dealLeftArrow.classList.toggle('disabled', dealSlider.scrollLeft <= 5);
    dealRightArrow.classList.toggle('disabled', 
        dealSlider.scrollLeft >= dealSlider.scrollWidth - dealSlider.clientWidth - 10);
}

dealLeftArrow.addEventListener('click', () => {
    dealSlider.scrollBy({ left: -dealScrollAmount, behavior: 'smooth' });
    setTimeout(updateDealArrows, 300);
});

dealRightArrow.addEventListener('click', () => {
    dealSlider.scrollBy({ left: dealScrollAmount, behavior: 'smooth' });
    setTimeout(updateDealArrows, 300);
});

// Khởi tạo ban đầu
updateDealArrows();
dealSlider.addEventListener('scroll', updateDealArrows);



// Khôi phục trạng thái khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-wishlist').forEach(heart => {
        const productId = heart.closest('.product-card').dataset.productId;
        if (productId && localStorage.getItem(`wishlist_${productId}`)) {
            heart.classList.add('active');
        }
    });
});

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


// box color 
document.addEventListener('DOMContentLoaded', function() {
    // Lắng nghe sự kiện click trên tất cả các ô màu
    document.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener('click', function() {
            // Lấy đường dẫn hình ảnh từ thuộc tính data-src
            const imagePath = this.getAttribute('data-src');
            
            if (!imagePath) return; // Nếu không có data-src thì bỏ qua
            
            // Tìm phần tử cha gần nhất là product-item
            const productItem = this.closest('.product-card');
            
            // Thay đổi hình ảnh sản phẩm
            if (productItem) {
                const imgSecond = productItem.querySelector('.product-image-second');
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





// Hàm mở modal với thông tin sản phẩm
function openProductModal(productItem) {
  const productTitle = productItem.querySelector('h3').textContent;
  const currentPrice = productItem.querySelector('.current-price').textContent;
  const comparePriceElement = productItem.querySelector('.original-price');
  const comparePrice = comparePriceElement ? comparePriceElement.textContent : null;
  
  // Sửa: Kiểm tra nếu có sold-count thì lấy, không thì để rỗng
  const soldCountElement = productItem.querySelector('.sold-count');
  const soldCount = soldCountElement ? soldCountElement.textContent : '';
  
  // Tính phần trăm giảm giá (nếu có comparePrice)
  let discountPercent = 0;
  if (comparePrice) {
    discountPercent = Math.round(
      (parsePrice(comparePrice) - parsePrice(currentPrice)) / 
      parsePrice(comparePrice) * 100
    );
  }
  
  // Lấy hình ảnh chính
  const mainImage = productItem.querySelector('.product-image-second').src;
  
  // Lấy tất cả hình ảnh màu sắc
  const colorBoxes = productItem.querySelectorAll('.color-box');
  
  // Cập nhật modal với thông tin sản phẩm
  document.getElementById('modal-product-title').textContent = productTitle;
  document.getElementById('modal-current-price').textContent = currentPrice;
  document.getElementById('modal-compare-price').textContent = comparePrice || '';
  document.getElementById('modal-discount').textContent = comparePrice ? `-${discountPercent}%` : '';
  document.getElementById('modal-product-image').src = mainImage;
  document.getElementById('modal-sold-count').textContent = soldCount;
  
  // Lấy sizes từ data attribute
  const sizesData = productItem.getAttribute('data-sizes');
  const sizeContainer = document.getElementById('size-selection');
  const sizeSection = sizeContainer.closest('.size-section');

  // Kiểm tra nếu có sizes thì hiển thị, không thì ẩn đi
  if (sizesData) {
    const sizes = sizesData.split(',');
    
    // Hiển thị section kích cỡ
    sizeSection.style.display = 'block';
    
    // Hiển thị các option kích cỡ
    sizeContainer.innerHTML = '';
    sizes.forEach(size => {
      const sizeBtn = document.createElement('button');
      sizeBtn.className = 'btn btn-sm btn-outline-dark size-option';
      sizeBtn.textContent = size.trim();
      sizeBtn.addEventListener('click', function() {
        document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
      sizeContainer.appendChild(sizeBtn);
    });
  } else {
    // Ẩn section kích cỡ nếu không có data-sizes
    sizeSection.style.display = 'none';
  }

  // Cập nhật thumbnail images
  const thumbnailContainer = document.querySelector('.thumbnail-images');
  thumbnailContainer.innerHTML = '';
  
  // Thêm hình chính đầu tiên
//   const mainThumb = document.createElement('img');
//   mainThumb.src = mainImage;
//   mainThumb.className = 'img-thumbnail active';
//   mainThumb.width = 60;
//   mainThumb.alt = 'Thumbnail';
//   mainThumb.addEventListener('click', function() {
//     document.getElementById('modal-product-image').src = mainImage;
//     document.querySelectorAll('.thumbnail-images img').forEach(img => img.classList.remove('active'));
//     this.classList.add('active');
//   });
//   thumbnailContainer.appendChild(mainThumb);
  
  // Thêm các màu sắc khác
  colorBoxes.forEach(box => {
    const imgSrc = box.getAttribute('data-src');
    if (imgSrc && imgSrc !== mainImage) { // Tránh trùng lặp với hình chính
      const thumbImg = document.createElement('img');
      thumbImg.src = imgSrc;
      thumbImg.className = 'img-thumbnail';
      thumbImg.width = 60;
      thumbImg.alt = 'Thumbnail';
      thumbImg.addEventListener('click', function() {
        document.getElementById('modal-product-image').src = imgSrc;
        document.querySelectorAll('.thumbnail-images img').forEach(img => img.classList.remove('active'));
        this.classList.add('active');
      });
      thumbnailContainer.appendChild(thumbImg);
    }
  });
  
  // Reset số lượng về 1 mỗi khi mở modal mới
  document.querySelector('.quantity-value').textContent = '1';
  
  // Kích hoạt modal
  const modal = new bootstrap.Modal(document.getElementById('productOptionsModal'));
  modal.show();
}

// Hàm chuyển đổi giá từ string sang number
function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^\d]/g, ''));
}

// Gắn sự kiện click cho tất cả nút "Tùy chọn"
document.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const productItem = this.closest('.product-card');
    openProductModal(productItem);
  });
});

// Xử lý chọn số lượng
document.querySelector('.quantity-minus').addEventListener('click', function() {
  const quantityElement = document.querySelector('.quantity-value');
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
  }
});

document.querySelector('.quantity-plus').addEventListener('click', function() {
  const quantityElement = document.querySelector('.quantity-value');
  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  quantityElement.textContent = quantity;
});

// Xử lý giỏ hàng 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const existingItem = cart.find(item => 
    item.id === product.id && item.size === product.size);
  
  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  showToast('Đã thêm sản phẩm vào giỏ hàng');
}

// Hàm hiển thị toast notification
function showToast(message) {
  const toast = document.querySelector('.toast-notification');
  const toastMessage = toast.querySelector('.toast-message');
  
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Hàm cập nhật giao diện giỏ hàng
function updateCartUI() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.cart-count').textContent = cartCount;
}

// Xử lý click nút Thêm vào giỏ
document.getElementById('add-to-cart-btn').addEventListener('click', function() {
  const selectedSize = document.querySelector('.size-option.active');
  
  if (!selectedSize) {
    showWarningToast('Vui lòng chọn kích cỡ trước khi thêm vào giỏ!');
    return;
  }
  
  const product = {
    id: document.getElementById('modal-product-title').textContent.trim(),
    name: document.getElementById('modal-product-title').textContent,
    image: document.getElementById('modal-product-image').src,
    price: parsePrice(document.getElementById('modal-current-price').textContent),
    size: selectedSize.textContent,
    quantity: parseInt(document.querySelector('.quantity-value').textContent)
  };
  
  addToCart(product);
});

// Hiển thị cảnh báo
function showWarningToast(message) {
  const toast = document.createElement('div');
  toast.className = 'warning-toast';
  
  toast.innerHTML = `
    <span class="warning-icon">⚠</span>
    <span class="warning-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// Khởi tạo
updateSliderArrows();
dealSlider.addEventListener('scroll', updateSliderArrows);



