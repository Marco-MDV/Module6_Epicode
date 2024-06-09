import React, { useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPosts from "./views/searchPosts/SearchPosts";
import ErrorPage from "./views/errorPage/ErrorPage";
import Registration from "./views/registration/Registration"
import ChangeCoverPosts from "./views/changeCoverPosts/ChangeCoverPosts";
import Login from "./views/login/Login";
import User from './views/userArea/User'
import CheckToken from "./use/checkToken/CheckToken";

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showNotFound, setShowNotFound] = useState(false)
  const [showList, setShowList] = useState(false)
  
  const presenceToken = (token)=>{
    if (token) {
      setShowList(true)
    }else{
      setShowList(false)
    }
  }


  const seach = async (input) => {
    setLoading(true)
    setError(false)
    setShowNotFound(false)
    if (input !== ' ' || '') {
      try {
        const response = await fetch(`${process.env.BACK_HOST}/blogPosts/search`, {
          method: "POST",
          body: JSON.stringify({ input: input }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (response.ok) {
          const responsePosts = await response.json();
          if (responsePosts.blogPosts.length > 0) {
            setPosts(responsePosts.blogPosts)
          } else {
            setShowNotFound(true)
          }
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false)
        setError(true)
      }
    }else{
      setLoading(false)
      setError(false)
      setShowNotFound(true)
    }
  }



  return (
    <Router>
      <NavBar seach={seach} showList={showList} presenceToken={presenceToken}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/search" element={<SearchPosts posts={posts} loading={loading} error={error} showNotFound={showNotFound} />} />
        <Route path="/login" element={<Login />} />
        <Route path='/UserAsrea/:toke' element={<User presenceToken={presenceToken} />} />
        <Route element={<CheckToken />}>
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/new" element={<NewBlogPost />} />
          <Route path="/changeCoverPosts" element={<ChangeCoverPosts />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
