import React from 'react'
import { Container, Row } from 'react-bootstrap'
import MyCard from '../../components/myCard/MyCard'
import Loader from '../../components/loader/Loader'
import ErrorComponent from '../../components/errorComponent/ErrorComponent'

export default function SearchPosts({posts, loading, error}) {
  return (
    <Container fluid="sm">
        <h1 className="blog-main-title mb-3">Searched posts</h1>
        <Row>
            {loading && (<Loader/>)}
            {!loading && (<MyCard posts={posts} />)}
            {error && (<ErrorComponent/>)}
        </Row>
    </Container>
  )
}
