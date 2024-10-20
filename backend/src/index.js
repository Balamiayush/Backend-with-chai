// require ('dotenv').config({path: './env'})
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index_db.js";
const PORT = process.env.PORT || 3002;  
dotenv.config({
  path: "./.env",
});

app.get('/',(req,res)=>{
  res.send('Hello World!')
})

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`���️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!! ", err);
  });
app.listen(PORT)