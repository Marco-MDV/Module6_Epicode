import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import { convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import Toast from "../../components/toast/Toast";
const NewBlogPost = props => {
  const [text, setText] = useState("");
  const handleChange = useCallback(value => {
    setText(draftToHtml(value));
    //console.log(text)
    // console.log(convertToRaw(value.getCurrentContent()))
  });

  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [cover, setCover] = useState("")
  const [category, setCategory] = useState("Categoria 1")
  const [time, setTime] = useState(0)
  const [unit, setUnit] = useState("s")
  const [content, setContent] = useState("")
  const [appruvedPost, setAppruvedPost] = useState(false)
  const [textPost, setTextPost] = useState("")
  const [themeTextTost, setThemeTextTost] = useState("")
  const [themeBgTost, setThemeBgTost] = useState("")


  const creatNewPost = async (e) => {
    e.preventDefault();
    setAppruvedPost(false)
    try {
      const response = await fetch('http://localhost:3001/blogPosts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category,
          title,
          cover,
          readTime:{
            value: +time,
            unit:unit
          },
          author,
          content          
        })
      });
  
      if (response.status === 201) {
        /* console.log('creato'); */
        setAppruvedPost(true)
        setTextPost('Post created')
        setThemeBgTost(' bg-success ')
        setThemeTextTost(' text-light-emphasis ')
      } else {
        setAppruvedPost(true)
        setTextPost('Not possible update your post!')
        setThemeBgTost(' bg-danger ')
        setThemeTextTost(' text-light-emphasis ')
      }
    } catch (error) {
      setTextPost('Not possible update your post!')
      setThemeBgTost(' bg-danger ')
      setThemeTextTost(' text-light-emphasis ')
    }
  };


  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={creatNewPost}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control size="lg" placeholder="Author" onChange={(e)=>setAuthor(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control size="lg" placeholder="Cover" onChange={(e)=>setCover(e.target.value)}/>
        </Form.Group>
        
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" onChange={(e)=>setCategory(e.target.value)}>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <div className="d-flex w-100 gap-1">
            <div className="w-50">
              <Form.Label>Read time</Form.Label>
              <Form.Control size="lg" placeholder="readTime" type="number" onChange={(e)=>{setTime(e.target.value)}}/>
            </div>
            <div className="w-50">
              <Form.Label>Unit of measure</Form.Label>
              <Form.Control size="lg" as="select" onChange={(e)=>setUnit(e.target.value)}>
                <option>s</option>
                <option>m</option>
                <option>h</option>
              </Form.Control>
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3" >
          <Form.Label>Contenuto Blog</Form.Label>
          <Editor value={text} onChange={(e)=>(handleChange(e.blocks[0].text), setContent(e.blocks[0].text))}  className="new-blog-content"/>
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
      {appruvedPost && (<Toast theme={themeBgTost} textTheme={themeTextTost} text={textPost} show={setAppruvedPost}/>)}
    </Container>
  );
};

export default NewBlogPost;
