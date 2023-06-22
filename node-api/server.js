const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());


const StaffRoute = require("./Routes/Admin/Staff");
app.use("/api/admin/staff", StaffRoute);

const AccessConfigRoute = require("./Routes/Admin/AccessConfig");
app.use("/api/admin/accessconfig", AccessConfigRoute);

const RoleRoute = require("./Routes/Admin/Role");
app.use("/api/admin/role", RoleRoute);

const LoginAdminRoute = require("./Routes/Admin/LoginAdmin");
app.use("/api/admin/login", LoginAdminRoute);

const LoginRoute = require("./Routes/Customer/Login")
app.use("/api/login", LoginRoute);

// Start the server
app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});
