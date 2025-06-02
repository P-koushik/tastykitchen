import Loginpage from "./components/loginpage/Loginpage.jsx";
import Home from "./components/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfound from "./components/subcomponents/notfound/Notfound.jsx";
import Cart from "./components/Cart/cart.jsx";
import RestaurantDetails from "./components/subcomponents/restaurentdetails/Restauentdetails.jsx";
import ProtectedRoute from "./components/subcomponents/protectedroute/Protectedroute.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/login" element={<Loginpage />} />

        <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>}
        />
        <Route path="/cart" element={<ProtectedRoute>
          <Cart />
        </ProtectedRoute>} />
        <Route path="/restaurant/:id" element={
        <ProtectedRoute>
          <RestaurantDetails />
        </ProtectedRoute>} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;