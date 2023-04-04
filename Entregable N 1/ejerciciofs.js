const fs = require('fs');

let now = new Date().toLocaleString();


fs.writeFile('./hora.txt', now, (error)  => {
    if (error) {
        return console.error('error al crear el archivo')
    }  


    fs.readFile('./hora.txt', 'utf-8', (error, resultado)=> {
        if (error) {
            return console.error('error al leer el archivo')
        } else {
            console.log(resultado)
        }
    })
})
