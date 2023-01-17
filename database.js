const mongoose = require("mongoose");

exports.connectDatabase = () =>{

    mongoose.set("debug" , true )
    mongoose.set("strictQuery" , false)
    mongoose.connect("mongodb://127.0.0.1:27017/my_database", {
        useNewUrlParser:true ,
        useUnifiedTopology:true ,
    }).then((con) => console.log(`Database connected: ${con.connect.host}`))
    .catch((err) => console.log(err))
}