import React from 'react'
import { Card, Col, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../blog/blog-item/BlogItem"

export default function MyCard({ posts }) {
    return (
        <>
            {
                posts && posts.map((post, i) => {
                    return (
                        <Col
                            key={`item-${i}`}
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
                                    </Card.Footer>
                                </Card>
                            </Link>
                        </Col>
                    )
                })
            }
        </>
    )
}
