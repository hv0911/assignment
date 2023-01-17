const express = require("express");
const { connectDatabase} = require("./database")
const routes = require("./routes");
const app = express();

connectDatabase();
app.use(express.json());

app.use(express.static('images'))
app.use(routes)




app.get("/" , ( req , res) => {
    res.send("Hello world")
})

app.listen(4000, () => {
    console.log("server is listening on port 4000")
})