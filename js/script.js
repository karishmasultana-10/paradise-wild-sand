document.addEventListener("DOMContentLoaded", () => {
    // Room card click event
    document.querySelectorAll(".room-card").forEach(card => {
        card.addEventListener("click", () => {
            alert("You selected: " + card.querySelector("h3").innerText);
        });
    });

    // Booking form validation
    document.getElementById("booking-form").addEventListener("submit", function(event) {
        event.preventDefault();
        let checkin = document.getElementById("checkin").value;
        let checkout = document.getElementById("checkout").value;

        if (!checkin || !checkout) {
            alert("Please select check-in and check-out dates.");
            return;
        }

        alert("Booking request submitted! We'll contact you shortly.");
    });
});

// JavaScript for smooth scrolling to section with class "tariff-section"
document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default link behavior
  
      // Scroll to the element with the class "tariff-section"
      document.querySelector('.tariff-section').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
 
  
  