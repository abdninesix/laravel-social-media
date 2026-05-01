import React from 'react'
import Posts from './pages/Posts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Profile from './pages/Profile'

const Application = () => {
  return (
    <div className='min-h-screen bg-blue-50'>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default Application