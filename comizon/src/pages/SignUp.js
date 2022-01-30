import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import UserSellerDataService from "../services/userSellerServices";
import UserBuyerDataService from "../services/userBuyerServices";

function SignUpPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const roleRef = useRef();
    const { signup } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    // Add to users collection after successful registration
    const addNewUserDB = () => {
        const role = roleRef.current.value
        const email = emailRef.current.value

        if (role === '1') {
            // Add to user buyer database
            const buyer = {
                email, role
            }
            UserBuyerDataService.addUser(buyer)
        } else if (role === '2') {
            // Add to user seller database
            const seller = {
                email, role
            }
            UserSellerDataService.addUser(seller)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match.')
        }

        try {
            setError('')
            setLoading(true)
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                roleRef.current.value
            )

            // Add to users collection after successful registration
            addNewUserDB()

            navigate("/")
        } catch (e) {
            setError('Error: ' + e)
        }
        setLoading(false)


    }
    return (
        <>
            <Container className='d-flex align-items-center justify-content-center'
                style={{ minHeight: "100vh" }}
            >
                <div className='w-100' style={{ maxWidth: '400px' }}>
                    <Card>
                        <Card.Body>
                            <div className='mb-4'>
                                <Header />
                            </div>
                            <h2 className='text-center mb-4'>Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Form.Group id="role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select aria-label="Role" ref={roleRef}>
                                        <option value="1">User</option>
                                        <option value="2">Seller</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button disabled={loading} type='submit' className='w-100 mt-4'>Sign Up</Button>
                            </Form>
                            <div className='w-100 text-center mt-3'>
                                <Link to='/forgot-password'>
                                    Forgot Password?
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default SignUpPage;
