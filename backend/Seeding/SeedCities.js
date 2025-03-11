// seedCities.js
import mongoose from "mongoose";
import City from "../models/City.js";
import citiesData from "./cities.json" assert { type: "json" };
// Use citiesData.default to access the JSON content.
import dotenv from "dotenv";

dotenv.config();

const seedCities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for seeding...");

    // Remove existing data
    await City.deleteMany({});
    console.log("Existing cities removed.");

    // Insert new data
    await City.insertMany(citiesData);
    console.log("Cities seeded successfully.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

seedCities();
