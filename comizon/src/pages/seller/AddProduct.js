import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../firebase'
import SellerProductDataService from '../../services/productSellerServices'
import {
    Button,
    Container,
    Form,
    Alert
} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { uploadBytes, ref } from 'firebase/storage'
import Header from '../../components/Header';


function AddProduct(props) {
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const uid = currentUser.uid

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [sellerId, setSellerId] = useState(uid);

    // Image file
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })
    const images = files.map((file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: "200px" }} alt="preview" />
                {file.path} ({file.size} bytes)
            </div>
        </div>
    ))

    const handleImageFileUpload = async (store_image_uri) => {
        const storageRef = ref(storage, store_image_uri)
        try {
            await uploadBytes(storageRef, files[0]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        } catch (e) {
            console.log("Error: " + e)
        }
    }

    const handleCancel = () => {
        
    }


    // console.log(currentUser)
    const uploadNewProduct = async () => {
        const store_img_uri = 'product_folder/' + uuidv4() + '.jpg'

        const data = {
            title: title,
            description: description,
            price: price,
            image_id: store_img_uri,
            seller_id: uid
        }
        console.log(data)
        try {
            // Upload image
            await handleImageFileUpload(store_img_uri)

            // upload product data
            await SellerProductDataService.addProduct(data)

            // update search_index table
            console.log('SUCCESS!')

            navigate('/seller')
        } catch (e) {
            console.log('Error: ' + e)
        }
    }
    return (
        <>
            <Header />
            <Container>
                <h3 className='mt-2'>New Product</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <div>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drop product image here</p>
                    </div>
                    <div>{images}</div>
                </div>
                <br />

                <Form>
                    <Form.Group id="sellerid">
                        <Form.Label>Merchant Id</Form.Label>
                        <Form.Control type="text"
                            value={sellerId} value={uid} required disabled />
                    </Form.Group>
                    <Form.Group id="title">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group id="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={description} required onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group id="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={price} required onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Button variant="secondary" className='mt-4' onClick={handleCancel}>Cancel</Button>
                    <Button onClick={uploadNewProduct} className='mt-4 ms-2'>Save</Button>
                </Form>
            </Container>
        </>
    );
}

export default AddProduct;
