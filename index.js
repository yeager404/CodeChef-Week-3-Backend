const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const getHTMLRoute = require("./routes/getHTML.js");
const editHTMLRoute = require("./routes/editHTML.js");

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials: true,
    })
);

app.use("/getHTML", (req,res, next)=>{
    console.log("Request recieved at /getHTML");
    next();
} ,getHTMLRoute);

app.use("/editHTML", (req,res, next)=>{
    console.log("Request recieved at /editHTML");
    next();
} ,editHTMLRoute);

app.get('/', (req, res)=>{
    return res.json({
        success: true,
        message: "Your server is up and running ....",
    })
});

app.listen(PORT, ()=>{
    console.log(`App is listening at ${PORT}`);
})