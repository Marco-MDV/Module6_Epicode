import React, { useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

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
                localStorage.setItem('token', dataJson.token);
                navigate('/UserAsrea')
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Container fluid="sm">
            <Row>
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
                    <div className='pt-5 text-center'>
                        <Button className='btn btn-dark' type='submit'>
                            Login
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    )
}
