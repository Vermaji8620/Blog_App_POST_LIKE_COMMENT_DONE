const mongoose = require("mongoose");

require("dotenv").config();

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully");
  } catch (err) {
    console.error(err);
    console.log("unable to connect");
    process.exit(1);
  }
};
