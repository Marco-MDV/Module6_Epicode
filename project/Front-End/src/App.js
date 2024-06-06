import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPosts from "./views/searchPosts/SearchPosts";
import ErrorPage from "./views/errorPage/ErrorPage";
import Registration from "./views/registration/Registration"
import AreaUserForAvatar from "./views/areaUserForAvatar/AreaUserForAvatar";
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
  console.log(showList);
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
    try {
      const response = await fetch(`http://localhost:3001/blogPosts?title=${input}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const posts = await response.json();
        if (posts.length > 0) {
          setPosts(posts.blogPosts)
        } else {
          setShowNotFound(true)
        }
        setLoading(false)
      } else {
        console.error(`HTTP error! status: ${response.status}`);
        setLoading(false)
        setError(true)
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false)
      setError(true)
    }
  }



  return (
    <Router>
      <NavBar seach={seach} showList={showList}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/search" element={<SearchPosts posts={posts} loading={loading} error={error} showNotFound={showNotFound} />} />
        <Route path="/login" element={<Login />} />
        <Route path='/UserAsrea/:toke' element={<User presenceToken={presenceToken} />} />
        <Route element={<CheckToken />}>
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/new" element={<NewBlogPost />} />
          <Route path='/changeAvatarAuthor' element={<AreaUserForAvatar />} />
          <Route path="/changeCoverPosts" element={<ChangeCoverPosts />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
