const express = require('express');
const app = express();
const routerProducts = require('./Routs/products.js')
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true } )) 

app.use('/api/products', routerProducts)

app.get('/api/', (req, res) => {
    res.send('Node curse');
})

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})