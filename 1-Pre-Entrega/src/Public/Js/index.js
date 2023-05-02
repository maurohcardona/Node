const socket = io()


const form = document.getElementById('form')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')
const code = document.getElementById('code')
const stock = document.getElementById('stock')
const category = document.getElementById('category')

const deleteForm = document.getElementById('deleteform')
const id = document.getElementById('id')

function blankvalues(){
    title.value = '',
    description.value = '',
    price.value = '',
    thumbnail.value = '',
    code.value = '',
    stock.value = '',
    category.value = '',
    id.value = ''
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    
    socket.emit('newProduct',{
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
        category: category.value,
        status
    })

    socket.on('sendProducts', data => {
        let productos = document.getElementById('hh')
        let products = ''
        data.forEach(element => {
            products = products + `
            <div class="card">
            <h3>${element.title}</h3>
            <p>${element.description}<p>
            <p>Price: $${element.price}<p>
            <p>Stock: ${element.stock}<p>
            </div>`
        });
        productos.innerHTML = products
        blankvalues()
    })
    
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    socket.emit('deleteProduct', parseInt(id.value))

    socket.on('senddelete', data => {
        let productos = document.getElementById('hh')
        let products = ''
        data.forEach(element => {
            products = products + `
            <div class="card">
            <h3>${element.title}</h3>
            <p>${element.description}<p>
            <p>Price: $${element.price}<p>
            <p>Stock: $${element.stock}<p>
            </div>`
        });
        productos.innerHTML = products
        blankvalues()
    })
})

