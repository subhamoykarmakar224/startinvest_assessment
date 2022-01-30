import React from 'react';
import { Button } from "react-bootstrap";
import { useAuth } from '../context/authContext'


function BtnLogout() {
    const { logout } = useAuth()
    
    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            navigate('/login')
        } catch (e) {
            setError(e)
        }
    }

    return <Button variant='link' onClick={handleLogout}>Log Out</Button>;
}

export default BtnLogout;
