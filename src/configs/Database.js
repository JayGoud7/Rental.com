import mongoose from "mongoose";

let connection = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // if already connect to database
  if (connection) {
    console.log("MongoDB is already connected.....");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connection = true;
    console.log("MONGO CONNECTED");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
