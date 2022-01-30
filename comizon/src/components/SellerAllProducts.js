import React, { useState, useEffect } from 'react';
import SellerProductDataService from "../services/productSellerServices";
import { Container, Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";


function SellerAllProducts() {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        const data = SellerProductDataService.getAllProducts()
        if(data === null) {
            setProducts([])
        }
        setProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Container>
            <h3>Your Listed Products
                <Link to='/seller/newproduct'>
                    <Button variant="dark" className="ms-4">+ Add Product</Button>
                </Link>
            </h3>
            <CardGroup>
                {products.map((prod, index) => {
                    <Card key={prod.id}>
                        <Card.Img variant="top" src="{prod.image_id}" alt="product" />
                        <Card.Body>
                            <Card.Title>{prod.title}</Card.Title>
                            <Card.Text>{prod.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {/* <Card.Link href="#">Edit</Card.Link> */}
                            {/* <Card.Link href="#">Delete</Card.Link> */}
                        </Card.Footer>
                    </Card>
                })}
            </CardGroup>
        </Container>
    );
}

export default SellerAllProducts;
