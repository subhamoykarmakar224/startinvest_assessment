import React, { useEffect, useState } from 'react';
import { Card, Container } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import AddComment from '../../components/AddComment';
import SellerProductDataService from "../../services/productSellerServices";
import { ref, getDownloadURL } from 'firebase/storage'


const ProductDetails = () => {
    const { productid } = useParams()
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const getProductData = async () => {
        const data = await SellerProductDataService.getProduct(productid)
        const tmp_products = data.docs.map(d => ({
            id: d.id, ...d.data()
        }))
        // console.log(tmp_products)

    }

    useEffect(() => {
        // Get Product Data
        getProductData()
    })

    return (
        <Container className='mt-3'>
            Product id: {productid}
            {/* Product Details */}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                    <Card.Text>{desc}</Card.Text>
                </Card.Body>
            </Card>


            {/* Comments */}
            <AddComment productId={productid} />

        </Container>
    );
}

export default ProductDetails;
