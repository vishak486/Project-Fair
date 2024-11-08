import { useContext, useState } from 'react'
import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import View from './components/View'
import { tokenAuthContext } from './contexts/AuthContextAPI'

function App() {
  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={isAuthorised ? <Dashboard />: <Navigate to={'/login'}/>} />
      <Route path="/projects" element={isAuthorised ? <Projects /> : <Navigate to={'/login'}/>} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth insideRegister={true} />} />
      <Route path="/view" element={<View />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
