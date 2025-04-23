document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const roomDetails = toggle.nextElementSibling;
      roomDetails.classList.toggle("hidden");

      // Arrow direction toggle
      if (toggle.textContent.includes("▾")) {
        toggle.textContent = toggle.textContent.replace("▾", "▸");
      } else {
        toggle.textContent = toggle.textContent.replace("▸", "▾");
      }
    });
  });
});

// Filtering the images
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-type');
    const images = document.querySelectorAll('.gallery-img');

    images.forEach(img => {
      const isPool = img.classList.contains('pool');
      if (isPool) {
        img.style.display = 'block'; // Always show pool images
        return;
      }

      if (type === 'all') {
        img.style.display = 'block';
      } else {
        img.style.display = img.classList.contains(type) ? 'block' : 'none';
      }
    });
  });
});



const fadeElements = document.querySelectorAll('.fade-in');

const revealOnScroll = () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");
const nextBtn = document.querySelector(".lightbox-next");
const prevBtn = document.querySelector(".lightbox-prev");

const galleryImgs = Array.from(document.querySelectorAll(".gallery-img"));
let currentIndex = 0;

function showImage(index) {
  lightboxImg.src = galleryImgs[index].src;
  lightboxImg.alt = galleryImgs[index].alt;
  currentIndex = index;
  lightbox.style.display = "flex";
}

galleryImgs.forEach((img, index) => {
  img.addEventListener("click", () => {
    showImage(index);
  });
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImgs.length;
  showImage(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
  showImage(currentIndex);
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});





