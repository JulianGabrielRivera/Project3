const Places = require("../models/Place.model");
const placesData = require("./places-data.json");
// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const main = async () => {
  try {
    for (let i = 0; i < placesData.length; i++) {
      await Places.create({
        name: placesData[i].name,
        description: placesData[i].description,
        rating: placesData[i].rating,
        comments: [],
        url: placesData[i].url,
        price: 9.99,
        continent: "North America",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/safetravels";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    main();
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
