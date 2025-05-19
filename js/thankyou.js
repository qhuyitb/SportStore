
// Lấy thông tin đơn hàng từ localStorage
document.addEventListener('DOMContentLoaded', function() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    
    // Hiển thị thông tin đơn hàng
    if (order) {
        document.getElementById('order-id').textContent = order.orderId;
        document.getElementById('order-date').textContent = new Date(order.orderDate).toLocaleDateString('vi-VN');
        document.getElementById('payment-method').textContent = getPaymentMethodName(order.paymentMethod);
        document.getElementById('order-total').textContent = formatPrice(order.total) + 'đ';
        
        document.getElementById('customer-name').textContent = order.customerInfo.fullname;
        document.getElementById('customer-phone').textContent = order.customerInfo.phone;
        document.getElementById('customer-address').textContent = order.customerInfo.address;
        document.getElementById('customer-note').textContent = order.customerInfo.note || 'Không có ghi chú';
        
        // Hiển thị sản phẩm
        const orderItemsContainer = document.getElementById('order-items');
        let itemsHTML = '';
        
        order.cartItems.forEach(item => {
            itemsHTML += `
                <div class="flex items-start">
                    <div class="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-gray-200">
                        <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover">
                    </div>
                    <div class="ml-4 flex-1">
                        <h4 class="text-sm font-medium">${item.name}</h4>
                        <p class="text-xs text-gray-500">Size: ${item.size} | Số lượng: ${item.quantity}</p>
                        <p class="text-sm font-medium mt-1">${formatPrice(item.price * item.quantity)}đ</p>
                    </div>
                </div>
            `;
        });
        
        orderItemsContainer.innerHTML = itemsHTML;
        
        // Hiển thị tổng tiền chi tiết
        const orderSummaryHTML = `
            <div class="border-t pt-4">
                <div class="flex justify-between py-2">
                    <span>Tạm tính:</span>
                    <span>${formatPrice(order.subtotal)}đ</span>
                </div>
                ${order.discount > 0 ? `
                <div class="flex justify-between py-2">
                    <span>Giảm giá:</span>
                    <span>-${formatPrice(order.discount)}đ</span>
                </div>
                ` : ''}
                <div class="flex justify-between py-2">
                    <span>Phí vận chuyển:</span>
                    <span>${formatPrice(order.shippingFee)}đ</span>
                </div>
                <div class="flex justify-between py-2 font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span>${formatPrice(order.total)}đ</span>
                </div>
            </div>
        `;
        
        document.querySelector('.order-summary-details').innerHTML = orderSummaryHTML;
    }
    
    // Cập nhật số lượng giỏ hàng (nếu cần)
    updateCartCount();
});

function getPaymentMethodName(method) {
    const methods = {
        'cod': 'Thanh toán khi nhận hàng (COD)',
        'bank': 'Chuyển khoản ngân hàng',
        'momo': 'Ví điện tử MoMo'
    };
    return methods[method] || method;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = count;
    }
}
