const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
/** display flash messages using flash connect and sessions  */
const flash = require("connect-flash");
const session = require("express-session");

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

//*Express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

//*connect flash middleware
app.use(flash());

//global variables
app.use((request, response, next) => {
  response.locals.success_msg = request.flash("success_msg");
  response.locals.error_msg = request.flash("error_msg");
  next();
});

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
