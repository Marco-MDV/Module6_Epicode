import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function User() {
    const [userData, setUserData] = useState({})
    const profileInfo = async () => {
        try {
            const data = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (data.ok) {
                const jsonData = await data.json()
                setUserData(jsonData)
                console.log(jsonData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { profileInfo() }, [])

    return (
        <Container fluid="sm">
            <h1 className='mt-5'>Welcome Back: {userData.username}</h1>
            <Row>
                <Col sm={12} md={6}>
                    <figure className='m-0 pt-5'>
                        <img src={userData.img} alt='avatar' className='rounded-circle' />
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
