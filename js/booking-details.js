// Format to 2 decimal places
function formatCurrency(num) {
  return Number(num).toFixed(2);
}

// Check if it's a weekend (Friday to Sunday)
function isWeekend(dateStr) {
  const day = new Date(dateStr).getDay();
  return day === 0 || day === 5 || day === 6;
}

function isBookingOnClosedDate(checkin, checkout) {
  let closedDates = JSON.parse(localStorage.getItem("closedDates")) || [];

  let checkinDate = new Date(checkin);
  let checkoutDate = new Date(checkout);

  for (let closed of closedDates) {
    let closedDate = new Date(closed);
    if (closedDate >= checkinDate && closedDate <= checkoutDate) {
      return true;
    }
  }
  return false;
}


// Calculate price and save data
function calculatePrice() {
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = parseInt(document.getElementById("guests").value);
  const includeBreakfast = document.getElementById("breakfast").checked;
  const selectedRooms = Array.from(document.querySelectorAll(".room:checked")).map(r => r.value);

  if (!checkin || !checkout || !guests || guests <= 0) {
    alert("Please enter valid dates and number of guests.");
    return;
  }

  if (selectedRooms.length === 0) {
    alert("Please select at least one room.");
    return;
  }

  const startDate = new Date(checkin);
  const endDate = new Date(checkout);

  if (endDate <= startDate) {
    alert("Check-out date must be after check-in date.");
    return;
  }
  if (isBookingOnClosedDate(checkin, checkout)) {
    alert("Sorry, booking is not available on one or more selected dates. Please choose a different date.");
    return;
  }
  
  let totalPrice = 0;
  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    const day = currentDate.getDay(); // 0 (Sun) - 6 (Sat)
    const isWeekend = day === 0 || day === 5 || day === 6;

    const ratePerHead = isWeekend
      ? includeBreakfast ? 1200 : 1000
      : includeBreakfast ? 1000 : 800;

    totalPrice += ratePerHead * guests;

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const advance = totalPrice * 0.2;

  // Display price
  document.getElementById("total-price").textContent = formatCurrency(totalPrice);
  document.getElementById("advance-amount").textContent = formatCurrency(advance);

  // Save data
  const bookingData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    checkin,
    checkout,
    guests,
    breakfast: includeBreakfast,
    selectedRooms,
    totalPrice: formatCurrency(totalPrice),
    advancePayment: formatCurrency(advance)
  };

  localStorage.setItem("wildSandBooking", JSON.stringify(bookingData));
}


function proceedToPayment() {
  const bookingData = JSON.parse(localStorage.getItem("wildSandBooking"));
  
  if (!bookingData || !bookingData.totalPrice) {
    alert("Please check the price before proceeding to payment.");
    return;
  }

  // Navigate to the payment page
  window.location.href = "payment.html";
}

function displayClosedDates() {
  const closedDatesList = document.getElementById("closedDatesList");
  closedDatesList.innerHTML = "";

  let closedDates = JSON.parse(localStorage.getItem("closedDates")) || [];

  if (closedDates.length === 0) {
    document.getElementById("closedDatesNotice").style.display = "none";
    return;
  }

  document.getElementById("closedDatesNotice").style.display = "block";

  closedDates.forEach((date) => {
    let li = document.createElement("li");
    li.textContent = `📅 ${date}`;
    closedDatesList.appendChild(li);
  });
}
// On page load: Display closed dates and pre-fill floor
document.addEventListener("DOMContentLoaded", () => {
  displayClosedDates();

  const urlParams = new URLSearchParams(window.location.search);

  // Get pre-selected room numbers from URL (e.g., ?rooms=101,102)
  const roomsFromURL = urlParams.get("rooms");
  if (roomsFromURL) {
    const roomList = roomsFromURL.split(",");
    roomList.forEach(roomNumber => {
      const roomCheckbox = document.querySelector(`.room[value="${roomNumber}"]`);
      if (roomCheckbox) {
        roomCheckbox.checked = true;
      }
    });
  }
});


