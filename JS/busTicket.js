const totalSeatCountBtn = document.getElementById("totalSeat");
const selectedSeatsBody = document.getElementById("selectedSeats");

const totalPriceEl = document.getElementById("totalPrice");
const grandTotalEl = document.getElementById("grandTotal");
const couponCodeEl = document.getElementById("couponCode");

const applyCouponBtn = document.querySelector("#applyCoupon");
const totalSeatLeftEl = document.querySelector("#total_seat_left");

let submitBtn = document.getElementById("submit");
let submitForm = document.getElementById("form");

let disableSubmitBtn = true;

submitForm.addEventListener("change", function (e) {
  e.preventDefault();

  const formData = new FormData(submitForm);
  const phone = formData.get("phone");
  disableSubmitBtn = !phone;
  updateView();
});

submitForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (selectedSeats.length > 0) window.location.href = "/alert.html";
  else alert("You Haven't Selected any Seat!");
});

let selectedSeats = [];
let coupon = "";
let totalSeatLeft = 40;
const seatPrice = 550; // Pre-calculated seat price

let seats = document.querySelectorAll(".seat");

let total = 0;
let grandTotal = total;

for (let i = 0; i < seats.length; i++) {
  seats[i].addEventListener("click", () => {
    const seatNo = seats[i].innerHTML;

    if (!selectedSeats.includes(seatNo)) {
      if (selectedSeats.length !== 4) {
        seats[i].classList.add("selected");
        selectedSeats.push(seatNo);
        totalSeatLeft--;
      } else {
        alert("You Can't Select More than 4 Tickets");
      }
    } else {
      seats[i].classList.remove("selected");
      selectedSeats = selectedSeats.filter((item) => item !== seatNo);
      totalSeatLeft++;
    }
    updateView();
  });
}

applyCouponBtn.addEventListener("click", () => {
  updateView();
});

couponCodeEl.addEventListener("change", () => {
  coupon = couponCodeEl.value;
  applyCouponBtn.disabled = !coupon;
});

function updateView() {
  let rows = selectedSeats.sort().map((item, index) => {
    if (index === selectedSeats.length - 1) {
      return `<tr class="flex justify-between text-base text-[#03071299] border-b-2 border-[#03071233] mx-4">
                <td class="-ml-4">${item}</td>
                <td>Economy</td>
                <td class="-mr-4">550</td>
              </tr>`;
    } else {
      return `<tr class="flex border-none justify-between text-base text-[#03071299] -mb-4">
                <td>${item}</td>
                <td>Economy</td>
                <td>550</td>
              </tr>`;
    }
  });

  total = selectedSeats.length * seatPrice;
  const discount = coupon === "NEW15" ? 0.15 : coupon === "Couple 20" ? 0.2 : 0;
  grandTotal = selectedSeats.length * seatPrice * (1 - discount);

  applyCouponBtn.disabled = !coupon;
  submitBtn.disabled = disableSubmitBtn;
  selectedSeatsBody.innerHTML = rows.join("");
  totalPriceEl.innerHTML = "BDT " + total;
  grandTotalEl.innerHTML = "BDT " + grandTotal;
  totalSeatLeftEl.innerHTML = totalSeatLeft;
  totalSeatCountBtn.innerHTML = selectedSeats.length;
}

updateView();
