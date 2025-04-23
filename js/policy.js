 // Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const policyItems = document.querySelectorAll(".policy-item");

    policyItems.forEach(item => {
      item.addEventListener("click", function () {
        this.classList.toggle("open");
      });
    });
  });
 
 // Scroll to top button
 function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
// fir scrolling top button
window.addEventListener("scroll", function () {
    const button = document.querySelector(".back-to-top");
    if (window.scrollY > 200) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });
  