import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext'
import BuyerProductDataService from "../services/productBuyerServices";
import { Container, Button, Card, CardGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import ProductCard from './ProductCard';

function BuyerAllProducts() {
    const [products, setProducts] = useState([])
    const [imageURLS, setImageURLS] = useState({})
    const { currentUser } = useAuth()
    const uid = currentUser.uid

    const getAllProducts = async () => {

        const data = await BuyerProductDataService.getAllProducts(uid)
        if (data === null) {
            setProducts([])
        }
        const tmp_products = data.docs.map(d => ({
            id: d.id, ...d.data()
        }))
        let promises = tmp_products.map((p) => {
            let img_uri_key = p.image_id
            imageURLS[img_uri_key] = ''
            const storageRef = ref(storage, img_uri_key)
            return getDownloadURL(storageRef)
        })
        Promise.all(promises).then((url) => {
            url.forEach(item => {
                let tmpStr = item.substring(
                    item.indexOf('product_folder'),
                    item.indexOf('jpg') + 3
                )
                tmpStr = tmpStr.replace('%2F', '/')
                imageURLS[tmpStr] = item
            })
        }).then(() => {
            setImageURLS(imageURLS)
            setProducts(tmp_products)
        })
    }

    const getImage = () => {

    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Container>
            <h3>Products</h3>
            <CardGroup>
                {products && products.map((p) => (
                    <Card key={p.id} className="mt-3 ms-3" style={{ minWidth: 250, maxWidth: 250 }}>
                        <Card.Img
                            variant="top"
                            src={imageURLS[p.image_id]}
                            alt='image'
                            height={200} />
                        <Card.Body>
                            <Card.Title>{p.title} <br />${p.price}</Card.Title>
                            <Card.Text>
                                {p.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Button variant="primary">Add to Cart</Button>
                            <Link to={`/details/${p.id}`}
                                className='btn'>
                                More...
                            </Link>
                        </Card.Footer>
                    </Card>
                ))}
            </CardGroup>

        </Container>
    );
}


export default BuyerAllProducts;
