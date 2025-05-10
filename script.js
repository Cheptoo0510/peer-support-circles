let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const progressBar = document.getElementById("progressBar");
const container = document.querySelector(".container");
const dots = document.querySelectorAll(".dot");
let autoAdvance;
let touchStartX = 0;
let touchEndX = 0;

function changeSlide(direction = 1) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  updateDots();
  resetProgressBar();
  stopAutoAdvance();
  setTimeout(startAutoAdvance, 3000); // Restart auto-advance after 3 seconds
}

function goToSlide(index) {
  if (index !== currentSlide) {
    slides[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");
    updateDots();
    resetProgressBar();
    stopAutoAdvance();
    setTimeout(startAutoAdvance, 3000); // Restart auto-advance after 3 seconds
  }
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === currentSlide) {
      dot.classList.add("active");
    }
  });
}

function resetProgressBar() {
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  setTimeout(() => {
    progressBar.style.transition = "width 8s linear";
    progressBar.style.width = "100%";
  }, 50); // slight delay to allow transition reset
}

function startAutoAdvance() {
  autoAdvance = setInterval(() => changeSlide(1), 8000);
  resetProgressBar();
}

function stopAutoAdvance() {
  clearInterval(autoAdvance);
  progressBar.style.transition = "none";
}

function handleSwipe() {
  if (touchEndX < touchStartX) {
    changeSlide(1); // Swipe left -> Next slide
  } else if (touchEndX > touchStartX) {
    changeSlide(-1); // Swipe right -> Previous slide
  }
}

container.addEventListener("mouseenter", stopAutoAdvance);
container.addEventListener("mouseleave", startAutoAdvance);

// Pause auto-advance on button click
document.querySelectorAll(".controls button").forEach(button => {
  button.addEventListener("click", () => {
    stopAutoAdvance();
    setTimeout(startAutoAdvance, 3000); // Restart auto-advance after 3 seconds
  });
});

// Keyboard navigation: left and right arrow keys
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    changeSlide(-1); // Previous slide
  } else if (event.key === "ArrowRight") {
    changeSlide(1); // Next slide
  }
});

// Touch event listeners for swipe
container.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

container.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

startAutoAdvance(); // Start auto advance when page loads
