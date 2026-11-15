// Знаходимо елементи форми реєстрації та повідомлення.
const registrationForm = document.querySelector("#registrationForm");
const registrationMessage = document.querySelector("#registrationMessage");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const attendeesInput = document.querySelector("#attendees");

// Показуємо помилки для кожного поля та не відправляємо форму на сервер.
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  registrationForm.classList.add("was-validated");

  const nameIsValid = fullNameInput.value.trim().length >= 3;
  const emailIsValid = emailInput.validity.valid;
  const attendees = Number(attendeesInput.value);
  const attendeesAreValid = Number.isInteger(attendees) && attendees >= 1 && attendees <= 20;

  if (!nameIsValid || !emailIsValid || !attendeesAreValid) {
    registrationMessage.className = "alert alert-danger";
    registrationMessage.textContent = "Перевір поля форми та виправ позначені помилки.";
    return;
  }

  registrationMessage.className = "alert alert-success";
  registrationMessage.textContent = `Реєстрація успішна, ${fullNameInput.value.trim()}! Чекаємо на тебе на IT Future.`;
  registrationForm.reset();
  registrationForm.classList.remove("was-validated");
  attendeesInput.value = "1";
});

// Знаходимо поля та місця для показу розрахунку квитків.
const ticketForm = document.querySelector("#ticketForm");
const ticketTypeInput = document.querySelector("#ticketType");
const ticketQuantityInput = document.querySelector("#ticketQuantity");
const promoCodeInput = document.querySelector("#promoCode");
const ticketError = document.querySelector("#ticketError");
const subtotalOutput = document.querySelector("#subtotal");
const quantityDiscountOutput = document.querySelector("#quantityDiscount");
const promoDiscountOutput = document.querySelector("#promoDiscount");
const finalTotalOutput = document.querySelector("#finalTotal");
const promoNote = document.querySelector("#promoNote");

// Форматуємо числа у гривнях без копійок.
function formatUAH(amount) {
  return `${amount.toLocaleString("uk-UA")} грн`;
}

// Рахуємо ціну категорії, знижку за кількість і промокод EVENT50.
ticketForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const quantity = Number(ticketQuantityInput.value);
  ticketError.textContent = "";

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    ticketError.textContent = "Введи цілу кількість квитків від 1 до 20.";
    ticketQuantityInput.focus();
    return;
  }

  const ticketPrice = ticketTypeInput.value === "vip" ? 800 : 400;
  const subtotal = ticketPrice * quantity;
  let discountRate = 0;

  if (quantity >= 5) {
    discountRate = 0.20;
  } else if (quantity >= 3) {
    discountRate = 0.10;
  }

  const quantityDiscount = subtotal * discountRate;
  const hasPromo = promoCodeInput.value.trim().toUpperCase() === "EVENT50";
  const promoDiscount = hasPromo ? 50 : 0;
  const total = Math.max(0, subtotal - quantityDiscount - promoDiscount);

  subtotalOutput.textContent = formatUAH(subtotal);
  quantityDiscountOutput.textContent = `− ${formatUAH(quantityDiscount)} (${discountRate * 100}%)`;
  promoDiscountOutput.textContent = hasPromo ? `− ${formatUAH(promoDiscount)}` : "0 грн";
  finalTotalOutput.textContent = formatUAH(total);
  promoNote.textContent = hasPromo
    ? "Промокод EVENT50 застосовано. Знижка з промокоду додана після знижки за кількість."
    : "Введи EVENT50, щоб отримати додаткову знижку 50 грн.";
});
