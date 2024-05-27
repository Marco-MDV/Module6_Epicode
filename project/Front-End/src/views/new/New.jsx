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
  });

  const [author, setAuthor] = useState("")
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [cover, setCover] = useState(null)
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

    const data = new FormData()
    data.append('author', author)
    data.append('title', title)
    data.append('category', category)
    data.append('time', time)
    data.append('unit', unit)
    data.append('content', content)
    data.append('cover', cover)



    setAppruvedPost(false)
    try {
      const response = await fetch('http://localhost:3001/blogPosts', {
        method: "POST",
        body: data
      });
      const dataJson = await response.json()
      if (response.status === 201) {
        setAppruvedPost(true)
        setTextPost('Post created')
        setThemeBgTost(' bg-success ')
        setThemeTextTost(' text-light-emphasis ')
        sendMail()
        console.log(dataJson);
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


  const sendMail = async ()=>{
    try {
        const mailData = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/email`,{
          method: "POST",
          body: JSON.stringify({
            email: email,
            subject: 'created post',
            text: 'congratulation you have creat a new post'
          })
        })
        const dataJson = await mailData.json()
        /* console.log(dataJson); */
        if (mailData.status === 200) {
          console.log(dataJson);
        } else {
          console.log(dataJson);
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={creatNewPost}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control size="lg" placeholder="Author"  onChange={(e)=>setAuthor(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>email</Form.Label>
          <Form.Control size="lg" name="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control size="lg" type="file" name="cover" onChange={(e)=>setCover(e.target.files[0])}/>
        </Form.Group>
        
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
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
