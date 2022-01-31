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
    const [imageURLS, setImageURLS] = useState({})
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
    }


    const getImage = () => {

    }

    useEffect(() => {
        console.log('lsjkdfb')
        getAllProducts()
    }, [])

    return (
        <Container>
            <h3>Your Listed Products
                <Link to='/seller/newproduct'>
                    <Button variant="dark" className="ms-4">+ Add Product</Button>
                </Link>
            </h3>

            {/* { JSON.stringify(imageURLS)} */}
            {/* { JSON.stringify(products)} */}

            <CardGroup>
                {products && products.map((d) => {
                    let img_uri_key = d.image_id
                    const storageRef = ref(storage, img_uri_key)
                    getDownloadURL(storageRef).then(
                        (url) => {
                            imageURLS[img_uri_key] = url
                            setImageURLS(imageURLS)
                        }
                    )
                    console.log(imageURLS)
                    return (
                        <div key={d.id}>
                            <Card className='mt-4'>
                                <Card.Img variant="top" src={imageURLS[d.image_id]} alt='image' height={200} />
                                <Card.Body>
                                    {/* <Image src={url} /> */}
                                    <Card.Title>{d.title}</Card.Title>
                                    <Card.Text>
                                        <img src={imageURLS[d.image_id]} height={200} />
                                        {d.description}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">${d.price}</Card.Footer>
                            </Card>
                        </div>
                    )
                })}
            </CardGroup>

        </Container>
    );
}


export default SellerAllProducts;
