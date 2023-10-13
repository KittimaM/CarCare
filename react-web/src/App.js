import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Layouts/Login";
import SelectCar from "./Layouts/SelectCar";
import CustomerIndex from "./Layouts/Customer/CustomerIndex";
import CustomerRegister from "./Layouts/Customer/CustomerRegister";
import CustomerLogin from "./Layouts/Customer/CustomerLogin";
import AdminRegister from "./Layouts/Admin/AdminRegister";
import AdminLogin from "./Layouts/Admin/AdminLogin";
import AdminIndex from "./Layouts/Admin/AdminIndex";

function App() {
  return (
    <Router>
      <Routes>
        {/* customer */}
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer" element={<CustomerIndex/>}/>

        {/* admin */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminIndex />} />
        
      </Routes>
    </Router>
  );
}

export default App;
