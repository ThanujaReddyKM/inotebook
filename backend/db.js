const mongoose = require('mongoose');

 const mongoURI = "mongodb://127.0.0.1:27017/inotebook"
//const mongoURI = "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


mongoose.set('strictQuery', false)

// const connectToMongo =()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to mongo successfully thanuja")
//     })
// }
const connectToMongo = () => {
    mongoose
      .connect(mongoURI)
      .then(() => console.log("connected to mongo successfully thanuja"))
      .catch((err) => console.log(err));
  };

module.exports = connectToMongo;

