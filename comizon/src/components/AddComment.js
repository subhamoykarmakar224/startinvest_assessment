import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, ListGroup, Badge } from "react-bootstrap";
import BuyerCommentProductService from "../services/productCommentServices";
import { useAuth } from '../context/authContext'
import { auth } from '../firebase'

const AddComment = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [editCommentId, setEditCommentId] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const commentRef = useRef()
    const [hideNewComment, setHideNewComment] = useState(false);
    const { currentUser } = useAuth()

    const submitNewComment = async () => {
        const commentData = {
            productId: productId,
            buyerId: currentUser.uid,
            email: auth.currentUser.email,
            comment: commentRef.current.value,
            timestamp: new Date()
        }

        if (isEdit) {
            await BuyerCommentProductService.updateComment(editCommentId ,commentData)
            setIsEdit(false)
            setEditCommentId('')
        } else {
            await BuyerCommentProductService.addComment(commentData)
        }
        setHideNewComment(true)
        getAllComments()
    }

    const addNewComment = () => {
        setHideNewComment(false)
        commentRef.current.value = ''
    }

    const deleteComment = async (e) => {
        const commentId = e.target.id
        await BuyerCommentProductService.deleteComment(commentId)
        getAllComments()
    }

    const editComment = async (e) => {
        const commentId = e.target.id
        setIsEdit(true)
        setHideNewComment(false)
        // setComments()
        comments.forEach((c) => {
            if (commentId === c.id) {
                commentRef.current.value = c.comment
                setEditCommentId(commentId)
            }
        })
    }

    const cancelSubmitComment = () => {
        setHideNewComment(true)
        commentRef.current.value = ''
    }

    const getAllComments = async () => {
        setComments([])
        const data = await BuyerCommentProductService.getAllComments(productId)
        if (data === null) {
            setComments([])
        }
        const tmpData = data.docs.map(d => ({
            id: d.id, ...d.data()
        }))
        setComments(tmpData)
    }

    useEffect(() => {
        setHideNewComment(true)
        getAllComments()
    }, []);


    return (
        <div>
            <Button variant='success' className='mt-4' onClick={addNewComment}>+Add Comment</Button>
            <Form hidden={hideNewComment} className='mt-3'>
                <Form.Group id="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="textarea" ref={commentRef} required />
                    <Button variant='primary' className='mt-4' onClick={submitNewComment}>Save</Button>
                    <Button variant='danger' className='mt-4 ms-2' onClick={cancelSubmitComment}>Cancel</Button>
                </Form.Group>
            </Form>
            {/* Display Comments */}
            {/* {JSON.stringify(comments)} */}
            <ListGroup as="ol" numbered className='mt-5'>
                {comments && comments.map((c) => (
                    <ListGroup.Item key={c.id}
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                {c.email}
                                (
                                {(new Date(c.timestamp.seconds * 1000)).toLocaleDateString()},
                                {(new Date(c.timestamp.seconds * 1000)).toLocaleTimeString()}
                                )
                            </div>
                            {c.comment}
                            <br />

                        </div>
                        <Badge variant="primary" pill>
                            {
                                c.email === auth.currentUser.email ?
                                    <div>
                                        <Button variant='primary' id={c.id} onClick={editComment}>Edit</Button>
                                        <Button variant='primary' className='ms-2' id={c.id} onClick={deleteComment}>Delete</Button>
                                    </div>
                                    :
                                    <></>
                            }
                        </Badge>
                    </ListGroup.Item>

                ))}
            </ListGroup>

        </div>
    );
}

export default AddComment;
