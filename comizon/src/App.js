import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import PrivateRoute from './components/PrivateRoute.js';
import BuyerHome from "./pages/buyer/Home";
import SellerHome from './pages/seller/Home'
import DemoFirestore from './pages/demoFirestore';
import AddProduct from './pages/seller/AddProduct';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Route : Authentication */}
            {/* <Route path='/' element={<BuyerHome />} /> */}
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/demo' element={<DemoFirestore />} />

            {/* Private Route: Buyer */}
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<BuyerHome />} />
            </Route>

            {/* Private Route: Seller */}
            <Route path='/seller' element={<PrivateRoute />}>
              <Route path='/seller' element={<SellerHome />} />
              <Route path='/seller/newproduct' element={<AddProduct />} />
            </Route>
          </Routes>
        </AuthProvider>

      </Router>
    </>
  )
}

export default App;


// font-family: 'Pacifico', cursive;