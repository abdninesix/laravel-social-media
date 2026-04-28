import React from 'react'
import Posts from './pages/Posts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Application = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Application