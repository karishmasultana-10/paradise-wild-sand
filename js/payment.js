function formatDate(dateStr) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-GB', options).replace(/ /g, '-');
}

document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("wildSandBooking"));

  if (!data) {
    alert("Booking details not found. Please complete the booking first.");
    window.location.href = "booking.html";
    return;
  }

  document.getElementById("user-name").textContent = data.name;
  document.getElementById("user-email").textContent = data.email;
  document.getElementById("user-phone").textContent = data.phone;
  document.getElementById("user-checkin").textContent = formatDate(data.checkin);
  document.getElementById("user-checkout").textContent = formatDate(data.checkout);
  document.getElementById("user-guests").textContent = data.guests;
  document.getElementById("user-breakfast").textContent = data.breakfast ? "Yes" : "No";
  document.getElementById("user-rooms").textContent = data.selectedRooms.join(", ");
  document.getElementById("user-total").textContent = data.totalPrice;
  document.getElementById("user-advance").textContent = data.advancePayment;

  // Calculate and show remaining payment
  const total = parseFloat(data.totalPrice);
  const advance = parseFloat(data.advancePayment);
  const remaining = (total - advance).toFixed(2);
  document.getElementById("user-remaining").textContent = remaining;

  document.getElementById("payBtn").addEventListener("click", () => {
    const options = {
      key: "rzp_live_olZWPNDyOHUUTe", // Replace with your Razorpay API Key
      amount: advance * 100, // Razorpay accepts amount in paise
      currency: "INR",
      name: "Paradise Wild Sand",
      description: "Advance Booking Payment",
      image: "images/favicon.ico", // Optional: your logo
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // Redirect or show confirmation here
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone,
      },
      notes: {
        checkin: formatDate(data.checkin),
        checkout: formatDate(data.checkout),
        guests: data.guests,
      },
      theme: {
        color: "#00796b",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
});