import React from 'react'
import Posts from './pages/Posts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

const Application = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Application