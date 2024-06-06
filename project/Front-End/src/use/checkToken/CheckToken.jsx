import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../../views/home/Home';

export default function CheckToken({ children }) {
    const token = localStorage.getItem('toke')
    return token ? <Outlet/> : <Home/>
}
