import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import MyCard from "../../components/myCard/MyCard";
import Pagination from "../../components/pagination/Pagination";
import Loader from "../../components/loader/Loader";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import ElemtsNotFound from "../../components/elemtsNotFound/ElemtsNotFound";

const Home = props => {
  
  const [showPosts, setShowPosts] = useState(false)
  const [loader, setLoader] = useState(true)
  const [error , setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const getAllPosts = async () =>{
    try {
      const response = await fetch(`http://localhost:3001/blogPosts?page=${pageNumber}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data)
        setShowPosts(true)
        setLoader(false)
      }else{
        setLoader(false)
        setShowPosts(false)
        setError(true)
      }
    } catch (error) {
      setLoader(false)
      setShowPosts(false)
      setError(true)
    }
  }

  useEffect(()=>{
    getAllPosts()
  },[pageNumber])

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Row>
        {/* <BlogList 
          loader={loader}
          error={error}
        /> */}
        {loader && (<Loader/>)}
        {showPosts && (<MyCard posts={posts.blogPosts}/>)}
        {error && (<ErrorComponent/>)}
        <Pagination setPageNumber={setPageNumber} pageNumber={pageNumber} totPages={posts?.totPages}/>
      </Row>
    </Container>
  );
};

export default Home;
