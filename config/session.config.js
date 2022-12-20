// config/session.config.js

// require session
const session = require("express-session");

// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter

const MongoStore = require("connect-mongo");

// ADDED: require mongoose
const mongoose = require("mongoose");
//  can do const myMiddlewareFunction = app
module.exports = (app) => {
  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there

  // required for the app when deployed to Heroku (in production)
  app.set("trust proxy", 1);

  // use session
  app.use(
    session({
      // make a sesh secret so people cant unlock your cookies.
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 100000000, // 60 * 1000 ms === 1 min
      },
      //  sets up the store.
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/fitnessa",

        // ttl => time to live
        // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      }),
    })
  );
};
//  can use this combined with the top midware
// module.exports = myMiddlewareFunction;
