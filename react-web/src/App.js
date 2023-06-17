import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import './App.css';

import SidebarNav from "./Navbar/SidebarNav";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<SidebarNav/>} />
          </Routes>

      </BrowserRouter>
   
    </div>
  );
}

export default App;
