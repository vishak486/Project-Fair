import React, { useContext, useState } from 'react'
import authImg from '../assets/authimg.png'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthContext } from '../contexts/AuthContextAPI'



const Auth = ({ insideRegister }) => {
  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const [isLogined,setIsLogined]=useState(false)
  const navigate=useNavigate()
  const [inputData,setInputData]=useState({
    username:'',
    email:'',
    password:''
  })
  // console.log(inputData);
  const handleRegister=async(e)=>{
    e.preventDefault()
    console.log("inside handleRegister");
    if(inputData.username && inputData.email && inputData.password)
    {
      // alert("Make APi Call")
      try{
          const result= await registerAPI(inputData)
          console.log(result);
          if(result.status==200)
            {
                alert(`Welcome ${result.data?.username},Please Login to explore our website!!`)
                navigate('/login')
                setInputData({username:"",email:"",password:""})
            }
            else
            {
                if(result.response.status==406)
                {
                  alert(result.response.data)
                  setInputData({username:"",email:"",password:""})
                }
            }
          
      }
      catch(err)
      {
        console.log(err);
      }
    }
    else
    {
      alert("Please fill the Form!!!")
    }
    
  }

  const handleLogin=async(e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password)
    {
        try{
            const result= await loginAPI(inputData)
            if(result.status==200)
            {
              sessionStorage.setItem("user",JSON.stringify(result.data.user))
              sessionStorage.setItem("token",result.data.token)
              setIsAuthorised(true)
              setIsLogined(true)
              setTimeout(()=>{
                setInputData({username:"",email:"",password:""})
              navigate('/')
              setIsLogined(false)
              },2000)
            }
            else
            {
                if(result.response.status==404)
                {
                  alert(result.response.data)
                }
            }
        }
        catch(err)
        {
          console.log(err);
        }
    }
    else
    {
      alert("Please fill the Form!!!")
    }
  }
  
  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='img-fluid' src={authImg} alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className='mt-2'><i className="fa-brands fa-docker"></i>Project Fair</h1>
              <h5>Sign {insideRegister ? "Up" : "In"} to Your Account</h5>
              <form >
                {
                  insideRegister &&
                  <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3" >
                  <Form.Control value={inputData.username} onChange={e=>setInputData({...inputData,username:e.target.value})} type="text" placeholder="Username" />
                </FloatingLabel>
                }
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                  <Form.Control value={inputData.email} type="email" onChange={e=>setInputData({...inputData,email:e.target.value})} placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" value={inputData.password} onChange={e=>setInputData({...inputData,password:e.target.value})} placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister ?
                  <div className='mt-3'>
                      <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                      <p>Already A User? Please Click to here to <Link to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className='mt-3'>
                      <button onClick={handleLogin} className='btn btn-primary mb-2'>Login
                      { isLogined && <Spinner className='ms-1' animation="border" variant="light" />}
                      </button>
                      <p>New User? Please Click to here to <Link to={'/register'}>Register</Link></p>
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth