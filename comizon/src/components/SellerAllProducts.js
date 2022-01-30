import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext'
import SellerProductDataService from "../services/productSellerServices";
import { Container, Button, Card, CardGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import ProductCard from './ProductCard';

function SellerAllProducts() {
    const [products, setProducts] = useState([])
    const { currentUser } = useAuth()
    const uid = currentUser.uid

    const getAllProducts = async () => {
        const data = await SellerProductDataService.getAllProducts(uid)
        if (data === null) {
            setProducts([])
        }
        const tmp_products = data.docs.map(d => ({
            id: d.id, ...d.data()
        }))
        setProducts(tmp_products)
        // data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
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
            {/* <CardGroup className='g-4'> */}
                {products && products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            {/* </CardGroup> */}
        </Container>
    );
}

export default SellerAllProducts;
