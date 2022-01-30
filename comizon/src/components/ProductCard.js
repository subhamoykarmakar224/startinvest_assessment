import React, { useState, useEffect } from 'react';
import { Card, Image } from "react-bootstrap";
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'

function ProductCard({ id, product }) {

    const [url, setUrl] = useState('#');

    const getDownloadUrlForImage = async () => {
        const storageRef = ref(storage, product.image_id)
        storageRef.getDownloadUrlForImage().then((imgurl) => {
            console.log('HERE')
            setUrl(imgurl)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getDownloadUrlForImage()
    }, [])

    return (
        <Card className='mt-4'>
            <Card.Img variant="top" src={url || "https://via.placeholder.com/150"} alt='image' />
            <Card.Body>
                {/* <Image src={url} /> */}
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    {product.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">${product.price}</Card.Footer>
        </Card>
    );
}

export default ProductCard;
