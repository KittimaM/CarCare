<<<<<<< HEAD
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import './App.css';
=======
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
>>>>>>> 31da258277a1389e9e0ebddb4ee40e9abd27c8d0

import SidebarNav from "./Navbar/SidebarNav";

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<SidebarNav/>} />
          </Routes>

      </BrowserRouter>
   
    </div>
=======
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* customer */}
        <Route path="/customer/index" element={<CustomerIndex />} />
        <Route path="/customer/booking" element={<CustomerBooking />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer" element={<CustomerFirstPage />} />

        {/* admin */}
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminIndex />} />
      </Routes>
    </Router>
>>>>>>> 31da258277a1389e9e0ebddb4ee40e9abd27c8d0
  );
}

export default App;
