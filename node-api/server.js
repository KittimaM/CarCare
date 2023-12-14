const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

// const StaffRoute = require("./Routes/Admin/Staff");
// app.use("/api/admin/staff", StaffRoute);

// const AccessConfigRoute = require("./Routes/Admin/AccessConfig");
// app.use("/api/admin/accessconfig", AccessConfigRoute);

// const RoleRoute = require("./Routes/Admin/Role");
// app.use("/api/admin/role", RoleRoute);

// const LoginAdminRoute = require("./Routes/Admin/LoginAdmin");
// app.use("/api/admin/login", LoginAdminRoute);

// const LoginRoute = require("./Routes/Customer/Login")
// app.use("/api/login", LoginRoute);

// const LoginRoute = require("./Routes/Login");
// app.use("/api/login", LoginRoute);

// const RegisterRoute = require("./Routes/Register");
// app.use("/api/register", RegisterRoute);

// customer
const CustomerRegisterRoute = require("./Routes/Customer/CustomerRegister");
app.use("/api/customer/register", CustomerRegisterRoute);

const CustomerLoginRoute = require("./Routes/Customer/CustomerLogin");
app.use("/api/customer/login", CustomerLoginRoute);

const CustomerBookingRoute = require("./Routes/Customer/CustomerBooking");
app.use("/api/customer/booking", CustomerBookingRoute);

const CustomerIndexRoute = require("./Routes/Customer/CustomerIndex");
app.use("/api/customer/index", CustomerIndexRoute);

const CustomerCarRoute = require("./Routes/Customer/CustomerCar");
app.use("/api/customer/car", CustomerCarRoute);

//admin
const AdminCarSizeRoute = require("./Routes/Admin/AdminCarSize");
app.use("/api/admin/carsize", AdminCarSizeRoute);

const AdminRegisterRoute = require("./Routes/Admin/AdminRegister");
app.use("/api/admin/register", AdminRegisterRoute);

const AdminLoginRoute = require("./Routes/Admin/AdminLogin");
app.use("/api/admin/login", AdminLoginRoute);

const AdminBookingRoute = require("./Routes/Admin/AdminBooking");
app.use("/api/admin/booking", AdminBookingRoute);

const AdminUserRoute = require("./Routes/Admin/AdminUser");
app.use("/api/admin/user", AdminUserRoute);

const AdminServiceRoute = require("./Routes/Admin/AdminService");
app.use("/api/admin/service", AdminServiceRoute);

// Start the server
app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});
