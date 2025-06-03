// Biến toàn cục
let cart = [];
let currentShipping = {
    method: 'standard',
    fee: 30000
};
let currentVoucher = null;

// Hàm hiển thị giỏ hàng
function renderCartSummary() {
    const orderSummary = document.getElementById('order-summary');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping-fee');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
        orderSummary.innerHTML = '<div class="text-center py-4 text-gray-500">Giỏ hàng của bạn đang trống</div>';
        subtotalElement.textContent = '0đ';
        shippingElement.textContent = '0đ';
        discountElement.textContent = '0đ';
        totalElement.textContent = '0đ';
        return;
    }
    
    let html = '';
    let subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    cart.forEach(item => {
        html += `
            <div class="flex items-start border-b pb-4 mb-4">
                <div class="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden">
                    <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover">
                </div>
                <div class="ml-4 flex-1">
                    <h3 class="text-sm font-medium text-gray-900">${item.name}</h3>
                    <p class="text-sm text-gray-500">Size: ${item.size} | Số lượng: ${item.quantity}</p>
                    <p class="text-sm font-medium text-gray-900 mt-1">${formatPrice(item.price * item.quantity)}đ</p>
                </div>
            </div>
        `;
    });
    
    // Tính toán giảm giá
    let discount = calculateDiscount(subtotal);
    
    // Tính tổng cộng
    const shippingFee = currentVoucher?.type === 'freeship' ? 0 : currentShipping.fee;
    const total = subtotal - discount + shippingFee;
    
    orderSummary.innerHTML = html;
    subtotalElement.textContent = formatPrice(subtotal) + 'đ';
    shippingElement.textContent = formatPrice(shippingFee) + 'đ';
    discountElement.textContent = discount > 0 ? '-' + formatPrice(discount) + 'đ' : '0đ';
    totalElement.textContent = formatPrice(total) + 'đ';
}

// Hàm tính toán giảm giá
function calculateDiscount(subtotal) {
    if (!currentVoucher) return 0;
    
    let discount = 0;
    const voucher = currentVoucher;
    
    if (voucher.type === 'percent') {
        discount = subtotal * (voucher.discount / 100);
        if (voucher.max && discount > voucher.max) {
            discount = voucher.max;
        }
    } else if (voucher.type === 'fixed') {
        discount = voucher.discount;
    } else if (voucher.type === 'freeship') {
        discount = currentShipping.fee;
    }
    
    return Math.min(discount, subtotal);
}

// Hàm định dạng giá
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
}

// Hàm thiết lập phương thức vận chuyển
function setupShippingMethods() {
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                currentShipping = {
                    method: this.value,
                    fee: this.value === 'express' ? 50000 : 30000
                };
                renderCartSummary();
            }
        });
    });
}

// Hàm áp dụng voucher
function applyVoucher() {
    const voucherCode = document.getElementById('voucher-code').value.trim().toUpperCase();
    const voucherMessage = document.getElementById('voucher-message');
    
    if (!voucherCode) {
        showVoucherMessage('Vui lòng nhập mã giảm giá', 'error');
        return;
    }
    
    // Danh sách voucher hợp lệ 
    const validVouchers = {
        'FREESHIP': { 
            type: 'freeship',
            name: "Miễn phí vận chuyển",
            description: "Áp dụng cho đơn từ 0đ",
            minOrder: 0
        },
        'SALE10': { 
            type: 'percent',
            discount: 10,
            max: 100000,
            name: "Giảm 10%",
            description: "Tối đa 100.000đ",
            minOrder: 0
        },
        
    };
    
    const voucher = validVouchers[voucherCode];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    if (!voucher) {
        showVoucherMessage('Mã giảm giá không hợp lệ', 'error');
        return;
    }
    
    // Kiểm tra điều kiện áp dụng
    if (voucher.minOrder && subtotal < voucher.minOrder) {
        showVoucherMessage(`Đơn tối thiểu ${formatPrice(voucher.minOrder)}đ để áp dụng mã này`, 'error');
        return;
    }
    
    currentVoucher = voucher;
    showVoucherMessage(`Áp dụng thành công: ${voucher.name} (${voucher.description})`, 'success');
    renderCartSummary();
}

// Hàm hiển thị thông báo voucher
function showVoucherMessage(message, type) {
    const voucherMessage = document.getElementById('voucher-message');
    voucherMessage.textContent = message;
    voucherMessage.className = 'mt-2 text-sm ' + (type === 'success' ? 'text-green-600' : 'text-red-600');
    voucherMessage.classList.remove('hidden');
}

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy giỏ hàng từ localStorage (giả lập với giá trị đủ lớn để test BLACKFRIDAY)
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Thiết lập sự kiện
    setupShippingMethods();
    
    // Sự kiện áp dụng voucher
    document.getElementById('apply-voucher').addEventListener('click', applyVoucher);
    
    // Sự kiện click áp dụng từ danh sách voucher
    document.querySelectorAll('.apply-voucher-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('voucher-code').value = this.getAttribute('data-code');
            applyVoucher();
        });
    });
    
    // Hiển thị giỏ hàng ban đầu
    renderCartSummary();
    updateCartCount();
});

// Hàm cập nhật số lượng giỏ hàng
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = count;
    }
}
// xử lý alert cho đẹp hơn 

function showErrorToast(message) {
  // Tạo toast element
  const toast = document.createElement('div');
  toast.className = 'error-toast';
  
  // Thêm icon error (sử dụng Unicode ⚠)
  toast.innerHTML = `
    <span class="error-icon">❌</span>
    <span class="error-message">${message}</span>
  `;
  
  // Thêm vào DOM
  document.body.appendChild(toast);
  
  // Hiệu ứng hiện lên
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Tự động ẩn sau 3 giây
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// Xử lý sự kiện xác nhận đơn hàng
document.getElementById('confirmCheckout').addEventListener('click', function() {
    const btn = this;
    
    // Validate form
    const fullname = document.getElementById('fullNameDisplay');
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const note = document.getElementById('note').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (!fullname || !phone || !address) {
        showErrorToast('Vui lòng điền đầy đủ thông tin bắt buộc');
        return;
    }
    
    if (!/^\d{10,11}$/.test(phone)) {
        showErrorToast('Số điện thoại không hợp lệ');
        return;
    }
    
    // Hiển thị loading
    btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Đang xử lý...
    `;
    btn.disabled = true;
    
    // Tính toán tổng tiền
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = calculateDiscount(subtotal);
    const shippingFee = currentVoucher?.type === 'freeship' ? 0 : currentShipping.fee;
    const total = subtotal - discount + shippingFee;
    

//  start history   
// Lấy ra name và quantity từ giỏ hàng
const cartItems = cart.map(item => ({
    name: item.name,
    quantity: item.quantity
}));

// Lấy số thứ tự đơn hàng cuối cùng từ localStorage, nếu chưa có thì bắt đầu từ 1
let lastOrderNumber = localStorage.getItem('lastOrderNumber');
if (!lastOrderNumber) lastOrderNumber = 1;
else lastOrderNumber = parseInt(lastOrderNumber) + 1;

// Tạo orderId từ số tăng dần
const orderId = 'DH' + String(lastOrderNumber).padStart(6, '0');  // Ví dụ: DH000001, DH000002
const username = localStorage.getItem('username');

// Lưu lại số thứ tự mới để lần sau tăng tiếp
localStorage.setItem('lastOrderNumber', lastOrderNumber);

// Tạo dữ liệu đơn hàng
const historyData = {
    username: username,
    orderId: orderId,
    orderDate: new Date().toISOString(),
    total: total,
    cartItems: cartItems,
    shippingMethod: currentShipping.method,
    paymentMethod: paymentMethod
};

// In ra từng sản phẩm trong đơn hàng
historyData.cartItems.forEach(item => {
    console.log(`${item.name} - SL: ${item.quantity}`);
});

// In ra toàn bộ đơn hàng
console.log(historyData);
fetch('http://localhost:3000/api/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(historyData)
});

// end history 
    // Tạo thông tin đơn hàng
    const orderData = {
        orderId: orderId,
        orderDate: new Date().toISOString(),
        customerInfo: { fullname, phone, address, note },
        paymentMethod,
        cartItems: [...cart], // Copy mảng cart
        shipping: currentShipping,
        voucher: currentVoucher,
        subtotal,
        discount,
        shippingFee,
        total,
        status: 'pending'
    };
// Lưu đơn hàng
localStorage.setItem('currentOrder', JSON.stringify(orderData));

    // Lưu thông tin đơn hàng vào localStorage
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    console.log('Order đã lưu:', orderData);
    // Xóa giỏ hàng
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Giả lập gửi dữ liệu (2 giây) rồi chuyển hướng
    setTimeout(() => {
        window.location.href = 'thankyou.html';
    }, 2000);
});

tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        primary: {
                            600: '#2563eb',
                            700: '#1d4ed8',
                        },
                        secondary: {
                            600: '#ea580c',
                            700: '#c2410c',
                        }
                    },
                    boxShadow: {
                        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
                        'button': '0 4px 12px rgba(37, 99, 235, 0.3)',
                    }
                }
            }
        }

