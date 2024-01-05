const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connection } = require("./Config/db");
const { userRoute } = require('./Routes/user.routes');
const { productRoute } = require('./Routes/product.routes');

const PORT = process.env.PORT;


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: '*',
}));

// Login and register route middleware
app.use("/api", userRoute);

// product route
app.use("/api", productRoute);


app.get('/', (req, res) => res.send('Hello'));

app.listen(8080, async () => {
    // connected to database 
    try{
        await connection;
        console.log("Connected to DB");
    } catch(err){
        console.log(err);
    }
    console.log('server started on http://localhost:8080')
});