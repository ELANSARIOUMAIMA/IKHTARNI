import mongoose from "mongoose"
// Function to connect to the MongoDB database
const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log('Database Connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/IKHTARNI`)
    
}
export default connectDB
 /*dbName: "IKHTARNI",  // majuscules comme dans ta base
  useNewUrlParser: true,
  useUnifiedTopology: true,
})/
/*mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database connection error:", err));
*/