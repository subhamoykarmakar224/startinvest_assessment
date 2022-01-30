import React from 'react';
import { Button } from "react-bootstrap";
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import SellerAllProducts from '../../components/SellerAllProducts';

function SellerHome(props) {
    const navigate = useNavigate ()
    const { logout, currentUser } = useAuth()
    const uid = currentUser.uid
    // console.log(currentUser)
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch(e) {
            console.log('Error: ' + e)
        }
    }
    return (
        <>
        <div>
            <Button variant='link' onClick={handleLogout}>Log Out</Button>
            Seller Dashboard: Welcome! { currentUser.email }
        </div>
        <SellerAllProducts />
        </>
    );
}

export default SellerHome;
