const carritoJSON = localStorage.getItem("carrito");
const carrito = JSON.parse(carritoJSON);

let cart = carrito ? carrito : [];

console.log(carrito);
//localStorage.clear();

const cartContainer = document.getElementById("cart");
const buttonContainer = document.getElementById("button");
cartContainer.innerHTML = "";

if (carrito.cart.length > 0) {
  const fragment = document.createDocumentFragment();

  // Recorre el array "cart" y crea elementos HTML para cada producto
  carrito.cart.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("pd");

    const title = document.createElement("h3");
    title.textContent = product.title;

    const description = document.createElement("p");
    description.textContent = product.description;

    const quantity = document.createElement("p");
    quantity.textContent = `Cantidad: ${product.quantity}`;

    const totalPrice = product.price * product.quantity;

    const price = document.createElement("p");
    price.textContent = `Precio: $${totalPrice}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar elemento";
    deleteButton.addEventListener("click", () => {
      // Encuentra y elimina el producto del array cart
      const updatedCart = carrito.cart.filter(
        (cartProduct) => cartProduct.id !== product.id
      );
      carrito.cart = updatedCart;
      // Actualiza el array cart
      const carritoJSON = JSON.stringify(carrito);
      localStorage.setItem("carrito", carritoJSON);
      console.log("producto eliminado");

      // Vuelve a renderizar la vista del carrito
      window.location.reload();
    });

    productDiv.appendChild(title);
    productDiv.appendChild(description);
    productDiv.appendChild(quantity);
    productDiv.appendChild(price);
    productDiv.appendChild(deleteButton);

    fragment.appendChild(productDiv);
  });

  // const productDiv = document.createElement("div");
  // productDiv.appendChild(clearCartButton);

  // Vacía el contenido actual del contenedor del carrito (por si hay productos anteriores)
  //cartContainer.innerHTML = "";

  // Agrega el fragmento al contenedor del carrito
  cartContainer.appendChild(fragment);

  const clearCartButton = document.createElement("button");
  clearCartButton.textContent = "vaciar carrito";
  clearCartButton.addEventListener("click", () => {
    carrito.cart = [];
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
    window.location.reload();
  });

  const purchaseButton = document.createElement("button");
  purchaseButton.textContent = "Realizar compra";

  const simpleCart = carrito.cart.map((product) => ({
    cart: product.id,
    quantity: product.quantity,
  }));

  const purchasecart = {
    user: carrito.user,
    Cart: simpleCart,
  };
  console.log(JSON.stringify(purchasecart));
  // Agrega un evento click al botón para manejar la acción de compra
  purchaseButton.addEventListener("click", () => {
    // Realiza una solicitud POST a la ruta "/purchase" con el carrito en el cuerpo (body)
    fetch("/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchasecart),
    })
      //.then((response) => response.json())
      .then((response) => {
        // Maneja la respuesta de la solicitud (si es necesario)
        if (response.ok) {
          Swal.fire("Compra realizada correctamente");
          // setTimeout(() => {
          //   carrito.cart = [];
          //   const carritoJSON = JSON.stringify(carrito);
          //   localStorage.setItem("carrito", carritoJSON);
          //   window.location.reload();
          // }, 2000);
        } else {
          Swal.fire(`${response}`);
          console.log(response);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la compra:", error);
      });
  });
  buttonContainer.appendChild(clearCartButton);
  buttonContainer.appendChild(purchaseButton);
} else {
  const h3EmptyCart = document.createElement("h3");
  h3EmptyCart.textContent = "Carrito vacio";

  buttonContainer.appendChild(h3EmptyCart);
}
