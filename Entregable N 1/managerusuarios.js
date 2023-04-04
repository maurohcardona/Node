const fs = require('fs')

class manager {
    
    

    async crearUsuario (usuario) {


        const contenido = await fs.promises.readFile('./usuarios.json', 'utf8')
        
        const usuarioparse = JSON.parse(contenido)
        //console.log(usuarioparse)
        usuarioparse.push(usuario)

        const nuevocontenido = JSON.stringify(usuarioparse)
        
        await fs.promises.writeFile('./usuarios.json', nuevocontenido)
        
    }

    async obtenerUsuarios() {

        const constenido = await fs.promises.readFile('./usuarios.json', 'utf8')

        console.log(JSON.parse(constenido))
    }
    
    
}

const usuario = new manager()




usuario.crearUsuario({
    nombre:'juan', 
    apellido:'gomez',
    edad: 32,
    curso: 'backend'
})
    

usuario.obtenerUsuarios()