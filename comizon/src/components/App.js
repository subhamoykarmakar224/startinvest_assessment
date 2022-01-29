import React from 'react';
import SignUp from './SignUp';
import { Container } from "react-bootstrap";
import { AuthProvider } from '../context/authContext';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';


function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* Private Route */}
              <Route path='/' element={<PrivateRoute />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/update-profile' element={<UpdateProfile />} />
              </Route>
              {/* Public Route */}
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>

  )
}

// https://youtu.be/PKwu15ldZ7k?t=1043

export default App;
