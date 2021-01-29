const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();

//* DB config
const db = require("./config/keys").mongoURI;

//*Connect to Mongo
const connectDB = async () => {
  try {
    const connecx = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`mongodb connected: ${connecx.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();

//*ejs middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

//*add bodyparser
app.use(express.urlencoded({ extended: false }));

//*Routes
app.use("/", require("./Routes/index"));
app.use("/users", require("./Routes/users"));

//*Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
