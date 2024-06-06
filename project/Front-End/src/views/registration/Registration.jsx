import React, { useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import Toast from '../../components/toast/Toast'


export default function Registration() {
  const [showMessage, setShowMessage] = useState(false)
  const [theme, setTheme] = useState('')
  const [text, setText] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [formData, setFormData] = useState({})
  const heandlerFile = (e) => {
    setAvatar(e.target.files[0])
  }

  const change = () => {
    setShowMessage(!showMessage)
  }

  const conHostChangeInput = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }


  const registration = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('avatar', avatar)
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })


    try {
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/registration`, {
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

  const handleClick = async () => {
    window.location.href= `${process.env.REACT_APP_ENDPOINT_CUSTOM}/auth/googleLogin`
  }

  return (
    <Container fluid="sm">
      <Row>
        <Form className='mt-5 d-flex flex-column gap-4' onSubmit={registration}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder='User name' name='username' onChange={conHostChangeInput} />
          </Form.Group>
          <Form.Group controlId="formBasicAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" name='avatar' onChange={heandlerFile} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' onChange={conHostChangeInput} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' onChange={conHostChangeInput} />
          </Form.Group>
          <div className='w-100 d-flex justify-content-center '>
            <Button type='submit' variant='primary' className='btn btn-dark'>
              Submit
            </Button>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center w-100'>
            <p className='my-3'>
              or
            </p>
            <Button className='d-flex btn btn-light gap-3 border' onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z" /></svg>
              Google Loging
            </Button>
          </div>
        </Form>
      </Row>
      {showMessage && (<Toast theme={theme} textTheme={' text-light-emphasis '} text={text} show={change} />)}
    </Container>
  )
}
