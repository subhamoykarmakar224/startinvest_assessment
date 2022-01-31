import React, { useEffect, useState } from 'react';
import { Card, Container } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import AddComment from '../../components/AddComment';
import BuyerProductDataService from "../../services/productBuyerServices";
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'

const ProductDetails = () => {
    const { productid } = useParams()
    const [product, setProduct] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const getProductData = async () => {
        const data = await BuyerProductDataService.getAllProducts()
        const tmp_products = data.docs.map(d => ({
            id: d.id, ...d.data()
        }))
        let tmp_img_url = '#'
        let tmpProd = {}
        let tmpTitle = '', tmpDesc = '', tmpPrice = ''


        await tmp_products.forEach((p) => {
            if (p.id === productid) {
                tmpTitle = p.title
                tmpDesc = p.description
                tmpPrice = p.price
                tmp_img_url = p.image_id
                tmpProd = p
            }
        })

        setTitle(tmpTitle)
        setDesc(tmpDesc)
        setPrice(tmpPrice)

        let promise = getDownloadURL(ref(storage, tmpProd.image_id))
        
        Promise.resolve(promise).then((url) => {
            console.log(url)
            tmp_img_url = url
        }).then(() => {
            setImage(tmp_img_url)
            // setImageURLS(imageURLS)
            // setProducts(tmp_products)
        })
    }

    useEffect(() => {
        // Get Product Data
        getProductData()
        // getImageIP()
    })

    return (
        <Container className='mt-3'>
            Product id: {productid}
            {title} - {price}
            {/* Product Details */}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">${price}</Card.Subtitle>
                    <Card.Text>{desc}</Card.Text>
                </Card.Body>
            </Card>


            {/* Comments */}
            <AddComment productId={productid} />

        </Container>
    );
}

export default ProductDetails;
