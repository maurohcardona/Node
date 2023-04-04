async function suma (a, b) {
  try {
    const result =  await a + b;
    if (a === 0 || b === 0) {
      throw new Error ('Operacion Innecesaria');
    }else if (result < 0) {
      throw new Error ('La calculadora solo debe devolver valores positivos');
    }else {
     console.log ('Resultado suma: ', result);
     return result;
    }
  }
  catch (err) {
    console.error (err.message);
  }
}

async function resta (a, b) {
  try{
    const result = await a - b;
    if (a === 0 || b === 0) {
      throw new Error('Operacion Invalida')
    }else if (result < 0) {
      throw new Error ('La calculadora solo debe devolver valores positivos');
    }else {
       console.log ('Resultado resta: ', result);
    }
  }catch(err) {
    console.error (err.message);
  }
}

async function multiplicacion (a, b) {
  try {
    const result = await a * b;
    if (result < 0)  {
      throw new Error('La calculadora solo debe devolver valores positivos')
    }else {
      console.log('Resultado multiplicacion: ', result)
    }
  }catch(err) {
    console.log(err.message);
  }
}

async function division (a, b) {
  try{
    const result = await a / b;
    if (result < 0) {
      throw new Error ('La calculadora solo puede devolver valores positivos')
    }else {
      console.log('Resultado division: ', result)
    }
  } catch(err) {
      console.log(err.message)
  }
}

async function calculos (a, b) {
  try {
    const rsuma = await suma(a, b);
    const rresta = await resta(a, b);
    const rmultiplicacion = await multiplicacion(a, b);
    const rdivision = await division (a, b)
  } catch (err){
    console.error (err)
  }
}

calculos (0, 5)