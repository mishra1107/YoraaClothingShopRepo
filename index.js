require("dotenv").config();
const express = require("express");
const cors = require("cors");



const authRouter  = require("./src/routes/Auth");
const { sendOTP } = require("./src/utils/generateOtp");
const { connectToDB } = require("./src/database/db");
const ProductRouter = require("./src/routes/Product");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// app.use("/",(req,res,next) => {
//     console.log("Hello World");
//     res.send("<h1> This is Yoraa Shop </h1>");
   
    
// })
connectToDB();

app.use("/api/auth",authRouter);
app.use("/api/product",ProductRouter);

app.listen(8080,() => {
    console.log(`Server is running on http://localhost:8080`)
});