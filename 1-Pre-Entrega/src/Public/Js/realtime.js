const cart = []


function handleAddToCartClick(event) {
  let productId = event.target.getAttribute("data-product-id");
  cart.push(productId);
  console.log(cart)
}

const button = document.querySelectorAll(".addToCart");

button.forEach(function(button) {
  button.onclick = handleAddToCartClick;
});

let decrementButtons = document.querySelectorAll(".decrement");
let incrementButtons = document.querySelectorAll(".increment");
let counterInputs = document.querySelectorAll(".counter");

decrementButtons.forEach(function(button, index) {
  button.addEventListener("click", function() {
      let currentValue = parseInt(counterInputs[index].value);
      if (currentValue > 1) {
          currentValue--;
          counterInputs[index].value = currentValue;
      }
  });
});

incrementButtons.forEach(function(button, index) {
  button.addEventListener("click", function() {
      let currentValue = parseInt(counterInputs[index].value);
      currentValue++;
      counterInputs[index].value = currentValue;
  });
});
