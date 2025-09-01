import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
  const navigate=useNavigate();
  const gohome=()=>{
    navigate(-1);
  }
  return (
    <div>
      <h1>404 error</h1>
      <button onClick={gohome}>back to home page</button>
    </div>
  )
}

export default Error404
