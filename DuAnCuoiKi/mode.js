const images = [
  "https://cdn-images.kooding.com/bannerItem/desktop/1497/196da62107ade0b5dcd83d17f069a876aabd86ce.jpg",
  "https://cdn-images.kooding.com/bannerItem/desktop/1498/871363bb71d70e99b4bc8852373af5e751c671b5.jpg",
  "https://cdn-images.kooding.com/bannerItem/desktop/1461/d6e2e59fe61f8e04719d1e93bc9b84c499e0d6e2.jpg"
];
let currentIndex = 0;
const imgElement = document.getElementById("slide");
function showImage(index) {
    imgElement.style.opacity = 0;
  
    setTimeout(() => {
      imgElement.src = images[index];
      imgElement.onload = () => {
        imgElement.style.opacity = 1;
      };
    }, 400); // Thời gian chờ khớp với transition
  }
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
setInterval(nextImage, 5555);
showImage(currentIndex);

const whiteBtn = document.getElementById('whiteBtn');
const darkBtn = document.getElementById('darkBtn');
const colorToggle = document.getElementById('colorToggle');
const body = document.body;

whiteBtn.addEventListener('click', () => {
    colorToggle.classList.remove('dark');
    colorToggle.classList.add('white');

    whiteBtn.classList.add('active');
    darkBtn.classList.remove('active');

    body.style.backgroundColor = 'white';
    body.style.color = 'black';
});

darkBtn.addEventListener('click', () => {
    colorToggle.classList.remove('white');
    colorToggle.classList.add('dark');

    darkBtn.classList.add('active');
    whiteBtn.classList.remove('active');

    body.style.backgroundColor = '#121212';
    body.style.color = '#eee';
});
whiteBtn.addEventListener('click', () => {
    body.classList.remove('dark');
    body.classList.add('white');
});

darkBtn.addEventListener('click', () => {
    body.classList.remove('white');
    body.classList.add('dark');
});
const searchInput = document.getElementById('sb');

  searchInput.addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    const cards = document.querySelectorAll('.sp');

    cards.forEach(card => {
      const ten = card.querySelector('p').innerText.toLowerCase();
      if (ten.includes(keyword)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
const form = document.getElementById('subscribeForm');
const emailInput = document.getElementById('emailInput');
  
form.addEventListener('submit', function (e) {
e.preventDefault();
  
const email = emailInput.value.trim().toLowerCase();
const data = localStorage.getItem(email);
  
if (data) {
    const user = JSON.parse(data);
    alert(`Chúng tôi cảm ơn và sẽ gửi thư phản hồi đến ${user.name} sớm nhất về các sản phẩm.`);
    } else {
      alert(`Chúng tôi cảm ơn và sẽ gửi thư phản hồi đến ${email} sớm nhất về các sản phẩm.`);
    }
  
    emailInput.value = "";
  });