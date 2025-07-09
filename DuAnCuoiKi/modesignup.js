document.getElementById("signup2").addEventListener("click", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name2").value.trim();
    const email = document.getElementById("email2").value.trim();
    const password = document.getElementById("password2").value;
    const confirm = document.getElementById("confirm2").value;
  
    if (!name || !email || !password || !confirm) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
  
    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }
  
    if (localStorage.getItem(email)) {
      alert("Email đã được đăng ký.");
      return;
    }
  
    const user = { name, email, password };
    localStorage.setItem(email, JSON.stringify(user));
  
    alert("Đăng ký thành công!");
    window.location.href = "indexlogin.html"; 
  });