import React, { useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'

export default function Registration() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState(null)

  const registration = async (e)=>{
    e.preventDefault()
    console.log(e);
    const formData = new FormData()
    formData.append('username', e.target[0].value)
    formData.append('avatar', avatar)
    formData.append('email', e.target[2].value)
    formData.append('password', e.target[3].value)

    /* console.log(formData); */
    /* ${process.env.ENDPOINT_CUSTOM} */
    try {
      /* console.log(avatar); */
      const data = await fetch(`http://localhost:3001/registration`,{
        method: "POST",
        body: formData
        
      })
      const dataJson = await data.json()
      console.log(dataJson);
      if (data.status === 201) {
        console.log('creato');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container fluid="sm">
      <Row>
        <Form className='mt-5 d-flex flex-column gap-4' onSubmit={(e)=>registration(e)}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder='User name' name='userName' onInput={(e)=>{setUserName(e.target.value)}}/>
          </Form.Group>
          <Form.Group controlId="formBasicAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" name='avatar' onInput={(e)=>{setAvatar(e.target.files[0])}}/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='enterEmail' onInput={(e)=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' onInput={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          <div className='w-100 d-flex justify-content-center '>
            <Button type='submit' variant='primary'>
              Submit
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  )
}
