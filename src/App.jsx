import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PagenotFound from "./pages/PagenotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";

function App() {

  return (
    
    
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="product" element={<Product/>} />
              <Route path="pricing" element={<Pricing/>} />
              <Route path="*" element={<PagenotFound/>} />
              <Route path="/app" element={<AppLayout/>} />
              <Route path="/login" element={<Login/>} />
          </Routes>
      </BrowserRouter>
    
  );
}

export default App;

