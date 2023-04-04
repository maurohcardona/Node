const fs = require("fs");

const info = {
    contenidoStr: '',
    contenidoObj: '',
}

const operaciones = async () => {

    let resultado = await fs.promises.readFile('./package.json', 'utf-8')

    info.contenidoStr = JSON.stringify(resultado)
    info.contenidoObj = JSON.parse(resultado)

    console.log(info)

    const infoJson = JSON.stringify(info,'\t')

    await fs.promises.writeFile('./info.json', infoJson)
}

operaciones()