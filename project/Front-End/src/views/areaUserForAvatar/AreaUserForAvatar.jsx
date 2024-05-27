import React, { useState } from 'react'
import { Container, Form, Row } from 'react-bootstrap'

export default function AreaUserForAvatar() {
    const [avatar, setAvatar] = useState(null)
    const [formData, setFormData] = useState({})
    const avatarFile = (e) => {
        setAvatar(e.target.files[0])
    }
    
    const insertValue = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const startProcess = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('avatar', avatar)
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/avatars?email=${formData.email}&&password=${formData.password}`)
            const dataJson = await response.json()
            if (response.ok) {
                console.log(dataJson);
                await requestChangeAvatarPicture(dataJson, data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const requestChangeAvatarPicture = async (dataJson, data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/authors/${dataJson[0]._id}/avatar`, {
                method: "PATCH",
                body: data
            })
            const jsonData = await response.json()
            console.log(jsonData);
            if (response.status === 201) {
                console.log('creato');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container fluid='sm'>
            <Row>
                <h1 className="blog-main-title mb-3">Area user for avatar</h1>
                <Form onSubmit={startProcess}>
                    <Form.Group controlId="formBasicAvatar">
                        <Form.Label>New Avatar</Form.Label>
                        <Form.Control type="file" name='avatar' onChange={avatarFile} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' onChange={insertValue} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" name='password' onChange={insertValue} />
                    </Form.Group>
                    <div className='w-100 d-flex justify-content-center '>
                        <button className=' btn btn-dark '>
                            Submit
                        </button>
                    </div>
                </Form>
            </Row>
        </Container>
    )
}
