const express = require("express");
const app = express();
require("dotenv").config();
require('./db/conn');
const router = require("./Routes/router");
const PORT = process.env.PORT;
const cors = require('cors');
const cookiParser = require('cookie-parser');

app.use(cookiParser());
app.use(express.json());
app.use(cors());
app.use(router);


app.listen(PORT,()=>{
    console.log(`Server started at port No. ${PORT}`);
})