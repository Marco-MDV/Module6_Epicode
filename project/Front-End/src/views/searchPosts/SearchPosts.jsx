import React from 'react'
import { Container, Row } from 'react-bootstrap'
import MyCard from '../../components/myCard/MyCard'
import Loader from '../../components/loader/Loader'
import ErrorComponent from '../../components/errorComponent/ErrorComponent'
import ElemtsNotFound from '../../components/elemtsNotFound/ElemtsNotFound'

export default function SearchPosts({posts, loading, error, showNotFound}) {
  return (
    <Container fluid="sm">
        <h1 className="blog-main-title mb-3">Searched posts</h1>
        <Row>
            {loading && (<Loader/>)}
            {!loading && (
              posts.map(post=>{
                return(
                  <MyCard key={post._id} post={post}/>
                )
              })
            )}
            {error && (<ErrorComponent/>)}
            {showNotFound && (<ElemtsNotFound/>)}
        </Row>
    </Container>
  )
}
