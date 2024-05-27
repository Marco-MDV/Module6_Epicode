import React, { useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import Toast from '../../components/toast/Toast'


export default function Registration() {
  const [showMessage, setShowMessage] = useState(false)
  const [theme , setTheme] = useState('')
  const [text , setText] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [formData, setFormData]=useState({})
  const heandlerFile = (e) =>{
    setAvatar(e.target.files[0])
  }

  const change = () =>{
    setShowMessage(!showMessage)
  }

  const conHostChangeInput =(e)=>{
    const {name, value}=e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }


  const registration = async (e)=>{
    e.preventDefault()
    const data = new FormData()
    data.append('avatar', avatar)
    Object.entries(formData).forEach(([key,value])=>{
      data.append(key,value)
    })
    

    try {
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/registration`,{
        method: "POST",
        body: data
      })
      const dataJson = await response.json()
      if (response.status === 201) {
        console.log(dataJson);
        console.log('creato');
        setTheme(' bg-success ')
        setText(' success upload your registration')
        setShowMessage(true)
      }
    } catch (error) {
      console.log(error);
      setTheme(' bg-danger ')
      setText('Not possible upload your registration')
      setShowMessage(true)
    }
  }

  return (
    <Container fluid="sm">
      <Row>
        <Form className='mt-5 d-flex flex-column gap-4' onSubmit={registration}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder='User name' name='username' onChange={conHostChangeInput}/>
          </Form.Group>
          <Form.Group controlId="formBasicAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" name='avatar' onChange={heandlerFile}/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' onChange={conHostChangeInput}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' onChange={conHostChangeInput}/>
          </Form.Group>
          <div className='w-100 d-flex justify-content-center '>
            <Button type='submit' variant='primary'>
              Submit
            </Button>
          </div>
        </Form>
      </Row>
      {showMessage && (<Toast theme={theme} textTheme={' text-light-emphasis '} text={text} show={change}/>)}
    </Container>
  )
}
