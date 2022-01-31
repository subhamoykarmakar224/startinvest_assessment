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
            // console.log('URL')
            url.forEach(item => {
                // console.log('=> ')
                let tmpStr = item.substring(
                    item.indexOf('product_folder'),
                    item.indexOf('jpg') + 3
                )
                tmpStr = tmpStr.replace('%2F', '/')
                imageURLS[tmpStr] = item
            })
        }).then(() => {
            // console.log("LOL")
            // console.log(imageURLS)
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

            {/* { JSON.stringify(imageURLS)} */}
            {/* { JSON.stringify(products)} */}

            <CardGroup>
                {products && products.map((p) => (
                    <Card key={p.id}>
                        <Card.Img
                            variant="top"
                            src={imageURLS[p.image_id]}
                            alt='image'
                            height={200} />
                        <Card.Body>
                            <Card.Title>{p.title}</Card.Title>
                            <Card.Text>
                                {p.description}
                            </Card.Text>
                            <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">${p.price}</Card.Footer>
                    </Card>
                ))}

                {/* {products && products.map((d) => {
                    let img_uri_key = d.image_id
                    const storageRef = ref(storage, img_uri_key)
                    getDownloadURL(storageRef).then(
                        (url) => {
                            imageURLS[img_uri_key] = url
                            setImageURLS(imageURLS)
                        }
                    )
                    // console.log(imageURLS)
                    return (
                        <div key={d.id}>
                            <Card className='mt-2 ms-2'>
                                <Card.Img variant="top" src={imageURLS[d.image_id]} alt='image' height={200} />
                                <Card.Body>
                                    
                                    <Card.Title>{d.title}</Card.Title>
                                    <Card.Text>
                                        {d.description}
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                <Card.Footer className="text-muted">${d.price}</Card.Footer>
                            </Card>
                        </div>
                    )
                })} */}
            </CardGroup>

        </Container>
    );
}


export default BuyerAllProducts;
