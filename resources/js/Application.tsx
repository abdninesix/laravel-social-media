import React from 'react'
import Posts from './pages/Posts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'

const Application = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Application