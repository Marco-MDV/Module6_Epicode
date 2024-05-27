import React, { useState } from 'react'
import { Container, Form, Row } from 'react-bootstrap'

export default function ChangeCoverPosts() {
    const [newAvatar, setNewAvatar] = useState(null)
    const avatarFile = (e)=>{
        setNewAvatar(e.target.files[0])
    }
    const [formData, setFormData] = useState({})
    const formValue = (e)=>{
        const {name, value}= e.target
        setFormData(({
            ...formData,
            [name]:value
        }))
    }     
    const startProcess = async (e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/blogPosts?author=${formData.author}&&title=${formData.title}`)
            const dataJson = await response.json()
            if (response.ok) {
                console.log(dataJson);
                /* await requestChangeCoverPicture(dataJson, data) */
                modPost(dataJson)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const modPost = async (dataJson)=>{
        const data = new FormData()
        data.append('avatar', newAvatar)
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/authors/${dataJson.blogPosts[0]._id}/cover`,{
                method: "PATCH",
                body: data
            })
            const responseData = await response.json()
            console.log(responseData);
            if (response.status === 201) {
                console.log('modificato');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container fluid='sm'>
            <Row>
                <Form className='mt-5' onSubmit={startProcess}>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control size="lg" placeholder="Author" name='author' onChange={formValue}/>
                    </Form.Group>
                    <Form.Group controlId="blog-form" className="mt-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control size="lg" placeholder="Title" name='title' onChange={formValue}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Cover</Form.Label>
                        <Form.Control size="lg" type="file" name='cover' onChange={avatarFile}/>
                    </Form.Group>
                    <div className='w-100 d-flex justify-content-center mt-3'>
                        <button className=' btn btn-dark '>
                            Submit
                        </button>
                    </div>
                </Form>
            </Row>
        </Container>
    )
}
