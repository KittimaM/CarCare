import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerFirstPage from "./Layouts/Customer/CustomerFirstPage";
import CustomerRegister from "./Layouts/Customer/CustomerRegister";
import CustomerLogin from "./Layouts/Customer/CustomerLogin";
import AdminRegister from "./Layouts/Admin/AdminRegister";
import AdminLogin from "./Layouts/Admin/AdminLogin";
import AdminIndex from "./Layouts/Admin/AdminIndex";
import Index from "./Layouts/Index";
import CustomerBooking from "./Layouts/Customer/CustomerBooking";
import AdminUser from "./Layouts/Admin/AdminUser";
import CustomerIndex from "./Layouts/Customer/CustomerIndex";
import AdminCarSize from "./Layouts/Admin/AdminCarSize";
import CustomerCar from "./Layouts/Customer/CustomerCar";
import AdminService from "./Layouts/Admin/AdminService";
import AdminBooking from "./Layouts/Admin/AdminBooking";
import AdminRole from "./Layouts/Admin/AdminRole";
import AdminAccount from "./Layouts/Admin/AdminAccount";
import AdminSchedule from "./Layouts/Admin/AdminSchedule";
import AdminPayment from "./Layouts/Admin/AdminPayment";
import AdminWorkTable from "./Layouts/Admin/AdminWorkTable";
import AdminPaymentType from "./Layouts/Admin/AdminPaymentType";
import AdminOnLeave from "./Layouts/Admin/AdminOnLeave";
import AdminOnLeavePersonal from "./Layouts/Admin/AdminOnLeavePersonal";

function App() {
  console.log(new Date());
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* customer */}
        <Route path="/customer/index" element={<CustomerIndex />} />
        <Route path="/customer/booking" element={<CustomerBooking />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/car" element={<CustomerCar />} />
        <Route path="/customer" element={<CustomerFirstPage />} />

        {/* admin */}
        <Route
          path="/admin/onleave/personal"
          element={<AdminOnLeavePersonal />}
        />
        <Route path="/admin/onleave" element={<AdminOnLeave />} />
        <Route path="/admin/paymenttype" element={<AdminPaymentType />} />
        <Route path="/admin/worktable" element={<AdminWorkTable />} />
        <Route path="/admin/payment" element={<AdminPayment />} />
        <Route path="/admin/schedule" element={<AdminSchedule />} />
        <Route path="/admin/account" element={<AdminAccount />} />
        <Route path="/admin/role" element={<AdminRole />} />
        <Route path="/admin/booking" element={<AdminBooking />} />
        <Route path="/admin/service" element={<AdminService />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/carSize" element={<AdminCarSize />} />
        <Route path="/admin/service" element={<AdminService />} />
        <Route path="/admin" element={<AdminIndex />} />
      </Routes>
    </Router>
  );
}

export default App;
