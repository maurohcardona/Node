const express = require("express");
const app = express();
const port = 8080

app.get("/bienvenida", (req, res) => {
    res.send('Hello, world!');
})

app.listen(port, () => {
    console.log('listening on port  ' + port);
});