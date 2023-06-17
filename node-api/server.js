const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

const StaffRoute = require("./Routes/Admin/Staff");
app.use("/staff", StaffRoute);

const RoleRoute = require("./Routes/Admin/Role");
app.use("/role", RoleRoute);

// Start the server
app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});
