import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../blog/blog-item/BlogItem"
import SingleComment from './singleComment/SingleComment'

export default function MyCard({ post }) {

    const [showComments, setShowComments] = useState(false)
    const changeStausComment = () => {
        setShowComments(!showComments)
    }

    const [comments, setComments] = useState([])
    useEffect(() => {
        requestComments()
    }, [])
    const [inputComment, setInputComment] = useState('')
    const handlerInput = (e) => {
        setInputComment(e.target.value)
    }

    const [newCommentText, setNewCommentText] = useState('')
    const writeText = (e) => { setNewCommentText(e.target.value) }

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
            if (response.ok) {
                setComments(comments.filter(comment => comment._id !== commentId))
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Col
            sm={12}
            md={6}
            lg={4}
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
                                            <input type="text" placeholder='comment' className='form-control' onChange={handlerInput} />
                                            <button type='submit' className='btn btn-dark' onClick={sendComment}>send</button>
                                        </div>
                                    </Col>
                                    <Col xs={12}>
                                        {
                                            comments.map((comment) => {
                                                return (
                                                    <SingleComment
                                                    comment_id={comment._id}
                                                    comment={comment.comment}
                                                    writeText={writeText}
                                                    deleteComment={deleteComment}
                                                    newCommentText={newCommentText}
                                                    postId={post._id}
                                                    comments={comments}
                                                    setComments={setComments}
                                                    key={comment._id}
                                                    />
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
