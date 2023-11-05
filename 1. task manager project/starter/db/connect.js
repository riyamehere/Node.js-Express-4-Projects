const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    //all these are to remove the warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
