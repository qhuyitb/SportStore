document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username'); // Lấy username từ localStorage

    fetch('http://localhost:3000/api/profileDisplay', {
        method: 'POST', // ✅ Sử dụng POST
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username }) // ✅ Truyền username vào body
    })
    .then(response => {
        if (!response.ok) throw new Error("Không thể lấy thông tin");
        return response.json();
    })
    .then(data => {
        // Gán giá trị vào form
        document.getElementById("phone").value = data.tel || '';
        document.getElementById("birthday").value = data.ngaySinh?.split('T')[0] || ''; // format ISO
        document.getElementById("gender").value = data.sex || 'male';
    })
    .catch(error => {
        console.error("Lỗi khi lấy thông tin hồ sơ:", error);
    });
});