import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../blog/blog-item/BlogItem"

export default function MyCard({ post }) {
    const [showComments, setShowComments] = useState(false)
    const changeStausComment = () => {
        setShowComments(!showComments)
    }

    const [reload, setReload] = useState(false)
    console.log(reload);
    const heandlerReload = () =>{setReload(!reload)}
    const [comments, setComments] = useState([])
    useEffect(()=>{
        requestComments()
    },[])
    const [inputComment, setInputComment] = useState('')
    const handlerInput = (e) => {
        setInputComment(e.target.value)
    }
    const [showNewComment , setShowNewComment] = useState(false)
    const handlerChagneStatus = ()=>{
        setShowNewComment(!showNewComment)
    }
    const [newCommentText, setNewCommentText] = useState('')
    console.log(newCommentText);
    const writeText = (e)=>{setNewCommentText(e.target.value)}

    const requestComments = async () => {
        try {
            const resposnse = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/blogPosts/${post._id}/comments`)
            if (resposnse.ok) {
                const dataJson = await resposnse.json()
                setComments(dataJson)
            }
        } catch (error) {
            console.log(error);
        }
    }

    

    const sendComment = async () => {
        try {
            const resposnse = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/blogPosts/${post._id}`, {
                method: "POST",
                body: JSON.stringify({ comment: inputComment }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (resposnse.ok) {
                const dataJson = await resposnse.json()
                setComments(dataJson.comments);
                console.log('created comment', dataJson);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const deleteComment = async (commentId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/blogPosts/${post._id}/comments/${commentId}`, {
                method: "DELETE"
            })
            const dataJson = await response.json()
            console.log(dataJson);
        } catch (error) {
            console.log(error);
        }
    }


    

    const newComment = async (commentId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/blogPosts/${post._id}/comments/${commentId}`,{
                method: "PATCH",
                body: JSON.stringify({ newComment: newCommentText }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok) {
                console.log("it's okay");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Col
            md={4}
            style={{
                marginBottom: 50,
            }}
        >
            <Link className="blog-link">
                <Card className="blog-card">
                    <Card.Img variant="top" src={post.cover.imgPath} className="blog-cover" />
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <Image className="blog-author" src='https://picsum.photos/200' roundedCircle />
                            </Col>
                            <Col>
                                <div>di</div>
                                <h6>{post.author}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h5 className='m-0'>Comments area</h5>
                                    <button className='btn btn-dark' onClick={changeStausComment}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ 'width': '2rem' }} class="size-6 text-sm">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                    </button>
                                </div>
                            </Col>
                            {showComments && (
                                <>
                                    <Col xs={12}>
                                        <p className='m-0'>add comment:</p>
                                        <div className='d-flex justify-content-center align-items-streach px-5'>
                                            <input type="text" placeholder='comment' onChange={handlerInput} />
                                            <button type='submit' className='btn btn-dark' onClick={()=>{sendComment(); heandlerReload();}}>send</button>
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        {
                                            comments.map((comment) => {
                                                return (
                                                    <div className='w-100 p-2 my-2 bg-white rounded d-flex align-items-center justify-content-between ' key={comment._id}>
                                                        <div>
                                                            <p className='m-0 text-truncate'>
                                                                {comment.comment}
                                                            </p>
                                                            {showNewComment &&(<div className='d-flex flex-row'><input type="text" placeholder='New Comment' className='' onChange={writeText} /><button className='btn btn-dark' type='submit' onClick={()=>newComment(comment._id)}>Send</button></div>)}
                                                        </div>
                                                        <div className='d-flex flex-column gap-2'>
                                                            <button  className='btn btn-dark' onClick={handlerChagneStatus}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" style={{ 'width': '1.5rem' }}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg>
                                                            </button>
                                                            <button className='btn btn-dark' onClick={()=>deleteComment(comment._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" style={{ 'width': '1.5rem' }}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Card.Footer>
                </Card>
            </Link>
        </Col>
    )
}
