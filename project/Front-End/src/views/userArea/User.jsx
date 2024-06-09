import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import userStyle from './userStyle.css'

export default function User({ presenceToken }) {
    const token = localStorage.getItem('toke')
    const { toke } = useParams()
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
                localStorage.setItem('toke', toke)
                const token = localStorage.getItem('toke')
                presenceToken(token)
            } else {
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }


    const changeCover = (e) => {
        const file = e.target.files[0]
        const data = new FormData()
        data.append('avatar', file)
        changeAvatar(data)
    }

    const changeAvatar = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT_CUSTOM}/me/avatar`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data
            })
            if (response.ok) {
                const dataJson = await response.json()
                setUserData(prevState => ({
                    ...prevState,
                    img: dataJson.img
                }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { profileInfo() }, [])

    return (
        <Container fluid="sm">
            <h1 className='mt-5'>Welcome Back: {userData.username}</h1>
            <Row>
                <Col sm={12} md={6}>
                    <div className='position-relative containerAvatar'>
                        <figure className='m-0'>
                            <img src={userData.img} alt='avatar' className='rounded-circle w-100 h-100 ' />
                        </figure>
                        <button className='position-absolute top-50 start-50 translate-middle btn p-0 custom-file-input-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="custom-file-input-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                            <input type="file" className='custom-file-input' onChange={changeCover} />
                        </button>
                    </div>
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
