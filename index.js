const express = require('express');
const app = express();
const user_routes = require('./routes/user_routes');
const mongoose = require('mongoose');


app.use(express.json());
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://localhost:27017',{
        useUnifiedTopology : true,
        useNewUrlParser : true,
}).then(()=>{
    console.log("conneced to mongo db")
}).catch((err)=>{
    console.log("Unable to connect")
    console.error(err.message)
})

app.use('/todo_list/api/v1', user_routes)


app.listen(8001, ()=>{
    console.log("Listening to port number 8001");
})



