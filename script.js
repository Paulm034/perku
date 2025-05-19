
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const galleryImages = document.querySelectorAll("#gallerySlider img");

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
}
function showGalleryImage(index) {
  galleryImages.forEach(g => g.classList.remove("active"));
  galleryImages[index].classList.add("active");
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

let currentGallery = 0;
setInterval(() => {
  currentGallery = (currentGallery + 1) % galleryImages.length;
  showGalleryImage(currentGallery);
}, 4000);

// Telegram form handler
document.getElementById("telegramForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const token = "7669309833:AAHBWwdSHUsyK77OX00LPdOYk5WeFrlyYzw";
  const chatId = "5070507244";
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const car = document.getElementById("car").value;
  const details = document.getElementById("details").value;
  const photos = document.getElementById("photos").files;

  const message = `🚘 Nauja užklausa:\n\n👤 Vardas: ${name}\n📞 Tel: ${phone}\n🚗 Auto: ${car}\n📋 Info: ${details}`;

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message })
  });

  for (let i = 0; i < Math.min(photos.length, 5); i++) {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', photos[i]);

    fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      body: formData
    });
  }

  alert("Užklausa išsiųsta!");
  this.reset();
});
