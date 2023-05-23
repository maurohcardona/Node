const socket = io()

const form = document.getElementById('form')
const user = document.getElementById('user')
const message = document.getElementById('message')
const log = document.getElementById('log')

function clearform(){
    user.value = '',
    message.value = ''
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    socket.emit('message', {
      user: user.value,
      message: message.value  
    })
    clearform()
})


socket.on('messages', (data) => {
    let logs = ''
    data.products.forEach(e => {
    logs += `${e.user} dice: ${e.message}<br/>`})
    log.innerHTML=logs;
})














