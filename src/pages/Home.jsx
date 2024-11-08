import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingimg from '../assets/landing.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectAPI } from '../services/allAPI'

const Home = () => {
  const [allHomeProjects, setAllHomeProjects] = useState([])
  const navigate = useNavigate()
  const handleProjects = () => {
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    }
    else {
      alert("Please Login to get full access to out Projects!!!")
    }
  }

  useEffect(() => {
    getAllHomeProjects()
  }, [])

  const getAllHomeProjects = async () => {
    try {
      const result = await getHomeProjectAPI()
      if (result.status == 200) {
        setAllHomeProjects(result.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  console.log(allHomeProjects);

  return (
    <>
      <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: '80px' }}><i className='fa-brands fa-docker'></i>Project Fair</h1>
              <p style={{ textAlign: 'justify' }}> One stop destination for all software Developement projects.where user can add and manage their projects ,as well acess all projects avaliable in our website...what are you waiting for</p>
              {
                sessionStorage.getItem("token") ?
                  <Link to={'/dashboard'} className='btn btn-warning' > MANAGE YOUR PROJECTS</Link>
                  :
                  <Link to={'/Login'} className='btn btn-warning' > STARTS TO EXPLORE</Link>
              }
            </div>
            <div className="col-lg-6">
              <img className='img-fluid' src={landingimg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 text-center">
        <h1 className="mb-5">Explore Our Projects</h1>
        <marquee >
          <div className="d-flex">
            {
              allHomeProjects?.map(project => (
                <div key={project?._id} className="me-5">
                  <ProjectCard displayData={project} />
                </div>
              ))
            }
          </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-5'> CLICK HERE  TO SEE MORE PROJECTS</button>

      </div>
      <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
        <h1>Our TestiMonials</h1>
        <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} src="https://st2.depositphotos.com/2703645/7303/v/450/depositphotos_73039841-stock-illustration-male-avatar-icon.jpg" alt="" className='rounded-circle img-fluid' />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
              </Card.Text>
              <p style={{ textAlign: 'justify' }}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, recusandae doloribus non blanditiis sunt repudiandae voluptas veniam adipisci fuga vitae corporis sapiente,</p>

            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} src="https://st2.depositphotos.com/2703645/11476/v/450/depositphotos_114763832-stock-illustration-man-avatar-character.jpg" alt="" className='rounded-circle img-fluid' />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
              </Card.Text>
              <p style={{ textAlign: 'justify' }}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, recusandae doloribus non blanditiis sunt repudiandae voluptas veniam adipisci fuga vitae corporis sapiente,</p>

            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqoXvrYi1kQcJMCD0SOIDlGLzIjQaCYlRP-3wvhWmrIyA_16Lb9z0edYBYt9IamyxgRrU&usqp=CAU" alt="" className='rounded-circle img-fluid' />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
              </Card.Text>
              <p style={{ textAlign: 'justify' }}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, recusandae doloribus non blanditiis sunt repudiandae voluptas veniam adipisci fuga vitae corporis sapiente,</p>

            </Card.Body>
          </Card>

        </div>
      </div>
    </>
  )
}

export default Home