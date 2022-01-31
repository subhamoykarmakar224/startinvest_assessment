import React from 'react';
import { Button, Container } from "react-bootstrap";
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import BuyerAllProducts from '../../components/BuyerAllProducts';

function BuyerHome(props) {
    const navigate = useNavigate()
    const { logout, currentUser } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (e) {
            console.log('Error: ' + e)
        }
    }
    return (
        <Container>
            <p>
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </p>
            Buyer Dashboard: User Role :: { currentUser.email }
            <BuyerAllProducts />
        </Container>
    );
}

export default BuyerHome;
