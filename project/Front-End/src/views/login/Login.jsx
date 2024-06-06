import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { redirect, useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({})
    const setVlues = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/login`, {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (data.ok) {
                const dataJson = await data.json();
                navigate(`/UserAsrea/${dataJson.token}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async () => {
        window.location.href= `${process.env.REACT_APP_ENDPOINT_CUSTOM}/auth/googleLogin`
    }


    return (
        <Container fluid="sm">
            <Row>
                <Col xs={12}>
                    <h2 className="blog-main-title mb-3">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className='pt-3'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={setVlues} />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className='pt-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name='password' onChange={setVlues} />
                        </Form.Group>
                        <div className='pt-5 text-center d-flex justify-content-center align-items-center gap-4 flex-column'>
                            <Button className='btn btn-dark' type='submit'>
                                Login
                            </Button>
                        </div>
                    </Form>
                    <div className='d-flex flex-column justify-content-center align-items-center w-100'>
                        <p className='my-3'>
                            or
                        </p>
                        <Button className='d-flex btn btn-light gap-3 border' onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z" /></svg>
                            Google Loging
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
