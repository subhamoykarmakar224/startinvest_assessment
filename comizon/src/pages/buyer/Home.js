import React from 'react';
import { Button } from "react-bootstrap";
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

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
        <div>
            <p>
                <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </p>
            Buyer Dashboard: User Role :: { currentUser.email }
        </div>
    );
}

export default BuyerHome;
