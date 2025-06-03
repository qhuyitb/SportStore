// click input hiện suggest 
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");

searchInput.addEventListener("click",function(event){
    searchSuggestions.style.display = "flex";
    searchSuggestions.style.flexDirection= "column";
    event.stopPropagation();
    

});
// click ra ngoài suggest cũng đóng 
document.addEventListener("click", function(event){
    if(!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)){
        searchSuggestions.style.display= "none";
    }

});






// menu phu
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Toggle menu
    menuIcon.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    // Close menu
    closeMenu.addEventListener('click', function() {
        menuIcon.classList.remove('open');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Close khi click overlay
    overlay.addEventListener('click', function() {
        menuIcon.classList.remove('open');
        mobileMenu.classList.remove('active');
        this.classList.remove('active');
    });
    
    // Submenu toggle
    menuLinks.forEach(link => {
        const parentItem = link.closest('.menu-item');
        const submenu = parentItem.querySelector('.submenu');
        
        if (submenu) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                submenu.classList.toggle('active');
                parentItem.classList.toggle('open'); 
            });
        }
    });
    
});




// Modal cart
// Mở/đóng giỏ hàng
document.querySelector('.cart').addEventListener('click', function() {
  document.querySelector('.cart-popup').classList.add('active');
  document.querySelector('.cart-overlay').classList.add('active');
  updateCartPopup();
});

document.querySelector('.close-cart').addEventListener('click', function() {
  closeCart();
});

document.querySelector('.cart-overlay').addEventListener('click', function() {
  closeCart();
});

function closeCart() {
  document.querySelector('.cart-popup').classList.remove('active');
  document.querySelector('.cart-overlay').classList.remove('active');
}

// Cập nhật popup giỏ hàng
function updateCartPopup() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.querySelector('.total-price');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-message">
        <p>Giỏ hàng của bạn đang trống</p>
      </div>
    `;
    totalPriceElement.textContent = '0đ';
    return;
  }
  
  let cartItemsHTML = '';
  let totalPrice = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    
    cartItemsHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">
            <span>Size: ${item.size}</span> | 
            <span>Số lượng: ${item.quantity}</span>
          </div>
          <div class="cart-item-price">${formatPrice(itemTotal)}đ</div>
          <div class="cart-item-remove" data-index="${index}">Xóa</div>
        </div>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = cartItemsHTML;
  totalPriceElement.textContent = formatPrice(totalPrice) + 'đ';
  
  // Thêm sự kiện xóa sản phẩm
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      cart.splice(index, 1);
      updateCartUI();
      updateCartPopup();
    });
  });
}

// Hàm định dạng giá
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Cập nhật hàm addToCart để gọi updateCartPopup
function addToCart(product) {
  // ... code hiện có ...
  updateCartPopup(); // Thêm dòng này
}


// Hàm cập nhật giao diện giỏ hàng
function updateCartPopup() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const subtotalPriceElement = document.querySelector('.subtotal-price');
  const totalPriceElement = document.querySelector('.total-price');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart text-center py-5">
        <div class="empty-icon mb-3">
          <i class="fas fa-shopping-cart fa-3x text-muted"></i>
        </div>
        <h6 class="text-muted">Giỏ hàng của bạn đang trống</h6>
        <button class="btn btn-outline-primary mt-3 continue-shopping">Tiếp tục mua sắm</button>
      </div>
    `;
    
    // Thêm sự kiện cho nút tiếp tục mua sắm
    document.querySelector('.continue-shopping')?.addEventListener('click', closeCart);
    
    subtotalPriceElement.textContent = '0đ';
    totalPriceElement.textContent = '0đ';
    return;
  }
  
  let cartItemsHTML = '';
  let subtotal = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    cartItemsHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-variant">
            Size: ${item.size} 
          </div>
          <div class="cart-item-price">${formatPrice(item.price)}đ</div>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="quantity-btn minus" data-index="${index}">-</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
            <div class="remove-item" data-index="${index}">
              <i class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  // Tính toán giảm giá (ví dụ 10%)
  const discount = Math.round(subtotal * 0 ); // giảm giá
  const total = subtotal - discount;
  
  cartItemsContainer.innerHTML = cartItemsHTML;
  subtotalPriceElement.textContent = formatPrice(subtotal) + 'đ';
  document.querySelector('.discount-price').textContent = '-' + formatPrice(discount) + 'đ';
  totalPriceElement.textContent = formatPrice(total) + 'đ';
  
  // Thêm sự kiện cho các nút
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      removeFromCart(index);
    });
  });
  
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      updateQuantity(index, -1);
    });
  });
  
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      updateQuantity(index, 1);
    });
  });
}

// Hàm xóa sản phẩm khỏi giỏ
function removeFromCart(index) {
  cart.splice(index, 1);
  // Cập nhật localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartPopup();
}

function updateQuantity(index, change) {
  const newQuantity = cart[index].quantity + change;
  
  if (newQuantity < 1) {
    removeFromCart(index);
    return;
  }
  
  cart[index].quantity = newQuantity;
  // Cập nhật localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartPopup();
}

// // Hàm cập nhật số lượng
// function updateQuantity(index, change) {
//   const newQuantity = cart[index].quantity + change;
  
//   if (newQuantity < 1) {
//     removeFromCart(index);
//     return;
//   }
  
//   cart[index].quantity = newQuantity;
//   updateCartUI();
//   updateCartPopup();
// }


// removeFromCart

// Thêm vào cuối file JS
document.addEventListener('DOMContentLoaded', function() {
  // Khôi phục giỏ hàng từ localStorage
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Cập nhật UI ngay khi trang được tải
  updateCartUI();
  
  // Nếu popup giỏ hàng đang mở, cập nhật nội dung
  if (document.querySelector('.cart-popup').classList.contains('active')) {
    updateCartPopup();
  }
});


