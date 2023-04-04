const randonNumber = []

const min = 1
const max = 20

    for (let i = 0; i <10; i++) {
        let numero = Math.floor((Math.random() * (max - min + 1)) + min);
        randonNumber.push(numero)
    }


//      const resultado = randonNumber.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
    
const resultado = {}
randonNumber.forEach((el) => {resultado[el] = (resultado[el]  || 0) + 1
    console.log(resultado)
}
    )

console.log(randonNumber)
console.log(resultado[2])

