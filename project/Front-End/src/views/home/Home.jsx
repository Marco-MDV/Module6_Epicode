import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import MyCard from "../../components/myCard/MyCard";
import Pagination from "../../components/pagination/Pagination";

const Home = props => {
  
  const [loader, setLoader] = useState(true)
  const [error , setError] = useState(false)
  const [seePosts, setSeePosts] = useState(true)
  const [posts, setPosts] = useState({})
  /* console.log(posts.blogPosts); */
  const getAllPosts = async () =>{
    try {
      const response = await fetch("http://localhost:3001/blogPosts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data)
        setLoader(false)
        setSeePosts(false)
      }else{
        setLoader(true)
        setError(true)
      }
    } catch (error) {
      console.error(error);
      /* setError(true) */
    }
  }

  useEffect(()=>{
    getAllPosts()
  },[])

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Row>
        <BlogList 
          loader={loader}
          /* error={error} */
        />
        {!seePosts && (<MyCard posts={posts.blogPosts}/>)}
        <Pagination/>
      </Row>
    </Container>
  );
};

export default Home;
