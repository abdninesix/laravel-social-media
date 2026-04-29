import React from 'react'
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const { login } = useAuth();

  const handleLogin = async () => {
    await login("someone1s@gmail.com", "password123");
  };

  return (
    <div><button onClick={handleLogin}>Login</button></div>
  )
}

export default Login