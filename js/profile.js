document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const tel = document.getElementById("phone").value;
    const ngaySinh = document.getElementById("birthday").value;
    const sex = document.getElementById("gender").value;
    const username = localStorage.getItem('username');
    console.log(username);
    console.log(tel);
    console.log(sex);
    console.log(ngaySinh);
    fetch("http://localhost:3000/api/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tel, ngaySinh, sex , username})
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(err => console.error(err));
    });