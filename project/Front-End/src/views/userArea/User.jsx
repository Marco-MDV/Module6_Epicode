import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

export default function User({presenceToken}) {
    const {toke} = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const profileInfo = async () => {
        try {
            const data = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${toke}`
                }
            })
            if (data.ok) {
                const jsonData = await data.json()
                setUserData(jsonData)
                localStorage.setItem('toke',toke)
                const token = localStorage.getItem('toke')
                presenceToken(token)
            }else{
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { profileInfo()}, [])

    return (
        <Container fluid="sm">
            <h1 className='mt-5'>Welcome Back: {userData.username}</h1>
            <Row>
                <Col sm={12} md={6}>
                    <figure className='m-0 pt-5 w-25'>
                        <img src={userData.img} alt='avatar' className='rounded-circle w-100 h-100' />
                    </figure>
                </Col>
                <Col sm={12} md={6}>
                    <div className='d-flex flex-column justify-content-center align-items-center h-100 pt-5'>
                        <div className='p-3 border border-secondary rounded'>
                            <p>Info:</p>
                            <ul className=''>
                                <li>Name: {userData.username}</li>
                                <li>Email: {userData.email}</li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
