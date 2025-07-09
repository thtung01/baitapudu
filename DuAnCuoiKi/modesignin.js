document.getElementById("signin1").addEventListener("click", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email1").value.trim();
    const password = document.getElementById("password1").value;
  
    const data = localStorage.getItem(email);
    if (!data) {
      alert("Vui lòng nhập chính xác Email và mật khẩu.");
      return;
    }
  
    const user = JSON.parse(data);
    if (user.password !== password) {
      alert("Sai mật khẩu.");
      return;
    }
    alert(`Xin chào ${user.name}, Đăng nhập thành công.`);
     window.location.href = "index.html"; 
  });