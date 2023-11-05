require("dotenv").config();

//another connection to database
const connectDB = require("./db/connect");
//import product model
const Product = require("./models/product");
//json product i.e data
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); //delete any previous data
    await Product.create(jsonProducts); //dynamically creating product by passing the json data
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
