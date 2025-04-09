import { useState } from 'react'
import './App.css'
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/form')
  }

  return (
    <div>
      <h1>User Details Model</h1>
      <button onClick={handleClick}>Open Form</button>
    </div>
  )
}

export default App
