import mongoose from "mongoose";


const databaseConnection = () => {
  const DB_URL = "mongodb+srv://Pegasus:Pegasus@cluster0.7pvd6.mongodb.net/";

  mongoose.set("strictQuery", true);
  mongoose
    .connect(DB_URL, { dbName: 
      process.env.ENVIRONMENT === "Development" ? "PegasusApplicationDevelopment" :
      process.env.ENVIRONMENT === "Practice" ? "PegasusApplicationPractice" :
      process.env.ENVIRONMENT === "Production" ? "PegasusApplicationProduction" :
      "InvalidDatabase" 
    })
    .then(response => {
      console.log(`Great... MongoDB connected on server ${response.connection.host} at ${response.connection.name}`);
    })
}

export default databaseConnection;
