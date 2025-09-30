const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
connectDb();
const app = express();
app.use(express.json());

app.use("/api/contacts" , require("./routes/contactRoutes"));
app.use("/api/users" , require("./routes/userRouter"));
app.use(errorHandler);



const port = process.env.PORT || 5001;
app.listen(port, ()=>{
    console.log("server is running on the port",`${port}`);
    
})