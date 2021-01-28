const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

//*ejs middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

//*Routes
app.use("/", require("./Routes/index"));
app.use("/users", require("./Routes/users"));

//*Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
