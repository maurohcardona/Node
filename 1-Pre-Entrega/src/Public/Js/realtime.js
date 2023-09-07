let decrementButtons = document.querySelectorAll(".decrement");
let incrementButtons = document.querySelectorAll(".increment");
let counterInputs = document.querySelectorAll(".counter");
let user = document.querySelector(".user");

decrementButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    let currentValue = parseInt(counterInputs[index].value);
    if (currentValue > 1) {
      currentValue--;
      counterInputs[index].value = currentValue;
    }
  });
});

incrementButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    let currentValue = parseInt(counterInputs[index].value);
    currentValue++;
    counterInputs[index].value = currentValue;
  });
});
const carritoJSON = localStorage.getItem("carrito");
const carrito = JSON.parse(carritoJSON);
let emptyCart = { user: user.textContent, cart: [] };
const cart = carrito ? carrito : emptyCart;
console.log(cart);

document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".addToCart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = button.getAttribute("data-product-id");
      const productTitle = event.target.parentElement.querySelector(
        "[data-product-Title]"
      ).textContent;
      const productDescription = event.target.parentElement.querySelector(
        "[data-product-Description]"
      ).textContent;
      const productPrice = event.target.parentElement.querySelector(
        "[data-product-Price]"
      ).textContent;
      const productCategory = event.target.parentElement.querySelector(
        "[data-product-Category]"
      ).textContent;
      const quantityInput = document.getElementById(productId);
      const quantity = parseInt(quantityInput.value);

      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.cart.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity = quantity;
      } else {
        cart.cart.push({
          id: productId,
          title: productTitle,
          description: productDescription,
          price: productPrice,
          category: productCategory,
          quantity,
        });
      }
      const carritoJSON = JSON.stringify(cart);
      localStorage.setItem("carrito", carritoJSON);
      // Actualizar el carrito visualmente o realizar otras acciones
      //console.log("Cart:", cart);
      Swal.fire("Agregaste el producto al carrito");
    });
  });
});
