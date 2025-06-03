document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn submit mặc định

    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp.');
        return;
    }

    const data = {
        fullName,
        username,
        password
    };

    fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(async (response) => {
        const text = await response.text();
        if (!response.ok) {
            // Phân tích nội dung lỗi từ JSON để xác định lỗi chi tiết
            let errorMessage = 'Đã xảy ra lỗi khi đăng ký.';
            try {
                const errorData = JSON.parse(text);
                if (errorData.message && errorData.message.includes('Email')) {
                    errorMessage = 'Email đã tồn tại. Vui lòng dùng email khác.';
                } else if (errorData.message && errorData.message.includes('username')) {
                    errorMessage = 'Tên tài khoản đã tồn tại.';
                }
            } catch (e) {
                console.error('Không thể phân tích lỗi JSON:', e);
            }

            throw new Error(errorMessage);
        }
        return JSON.parse(text);
    })
    .then((data) => {
        console.log('Đăng ký thành công:', data);
        alert('Đăng ký thành công!');
        window.location.href = "../html/main.html";
        // Optionally reset form
        // document.getElementById('signupForm').reset();
    })
    .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        alert(error.message);
    });
});