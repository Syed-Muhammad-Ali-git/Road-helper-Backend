// Note: Mongo DB connection / configuration...!

import mongoose from "mongoose";

const conectMongoDB = async () => {
  const mongoUrl = process.env.MONGO_DB_URL;
  const dbName = process.env.DB_NAME || "testing";

  try {
    const res = await mongoose.connect(mongoUrl, {
      dbName: dbName,
    });
    res && console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
  
};


export default conectMongoDB;
