import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PagenotFound from "./pages/PagenotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {

  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="product" element={<Product/>} />
                <Route path="pricing" element={<Pricing/>} />
                <Route path="*" element={<PagenotFound/>} />
                <Route path="/app" 
                element={<ProtectedRoute>
                          <AppLayout/>
                         </ProtectedRoute>}>
                  <Route index element={<Navigate to="cities" replace />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City/>} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form/>} />
                </Route>
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;

