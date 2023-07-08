const buttonCart = document.getElementById('addToCart')

// const addToCart = () => {
//     alert('Producto agregado')
// }

async function addToCart() {
    try {
      const response = await fetch('http://localhost:8080/products/cc');
      if (!response.ok) {
        throw new Error('No se pudo obtener los datos');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
buttonCart.addEventListener('click', addToCart)
// const socket = io()


// const form = document.getElementById('form')
// const title = document.getElementById('Title')
// const description = document.getElementById('Description')
// const price = document.getElementById('Price')
// const thumbnail = document.getElementById('Thumbnail')
// const code = document.getElementById('Code')
// const stock = document.getElementById('Stock')
// const category = document.getElementById('Category')

// const deleteForm = document.getElementById('deleteform')
// const id = document.getElementById('id')

// function blankvalues(){
//     title.value = '',
//     description.value = '',
//     price.value = '',
//     thumbnail.value = '',
//     code.value = '',
//     stock.value = '',
//     category.value = '',
//     id.value = ''
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
    
    
//     socket.emit('newProduct',{
//         Title: title.value,
//         Description: description.value,
//         Price: price.value,
//         Thumbnail: thumbnail.value,
//         Code: code.value,
//         Stock: stock.value,
//         Category: category.value,
//     })
//     blankvalues()


//         socket.on('sendProducts',async data => {
//         let productos = document.getElementById('hh')
//         let products = ''
//         //console.log(data)
//         await data.forEach(element => {
//             products = products + `
//             <div class="card">
//             <h3>${element.title}</h3>
//             <p>${element.description}<p>
//             <p>Price: $${element.price}<p>
//             <p>Stock: ${element.stock}<p>
//             </div>`
//         });
//         productos.innerHTML = products
        
//     })
// })
    


// deleteForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     socket.emit('deleteProduct', parseInt(id.value))

//     socket.on('senddelete', data => {
//         let productos = document.getElementById('hh')
//         let products = ''
//         data.forEach(element => {
//             products = products + `
//             <div class="card">
//             <h3>${element.title}</h3>
//             <p>${element.description}<p>
//             <p>Price: $${element.price}<p>
//             <p>Stock: $${element.stock}<p>
//             </div>`
//         });
//         productos.innerHTML = products
//         blankvalues()
//     })
// })

