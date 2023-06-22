import Navbar from "./NavbarFirstpage/Navbar";
import GlobalStyle from "./NavbarFirstpage/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
     <BrowserRouter>
          <GlobalStyle />
          <Routes>
            
            <Route path="/" element={<Navbar/>} />
            <Route path="/about" element={<Navbar/>} />
            <Route path="/services" element={<Navbar/>} />
            <Route path="/login" element={<Navbar/>} />

          </Routes>

      </BrowserRouter>
      
    </>
  );
}

export default App;
