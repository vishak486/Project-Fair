import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Pnf from './pages/Pnf'
import Footer from './components/Footer'
import View from './components/View'
import { tokenAuthContext } from './contexts/AuthContextAPI'

function App() {
  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    {
      setIsAuthorised(true)
    }
    else
    {
      setIsAuthorised(false)
    }
  },[isAuthorised])
  console.log(isAuthorised);
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      {
        isAuthorised &&
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
        </>

      }
      {/* <Route path="/dashboard" element={isAuthorised ? <Dashboard />: <Navigate to={'/login'}/>} /> */}
      <Route path="/projects" element={isAuthorised ? <Projects /> : <Navigate to={'/login'}/>} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth insideRegister={true} />} />
      <Route path="/view" element={<View />} />
      <Route path="/*" element={<Pnf />} />

    </Routes>
    <Footer/>
    </>
  )
}

export default App
