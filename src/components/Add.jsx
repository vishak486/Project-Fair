import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import imageplace from '../assets/place.png'
import { addProjectAPI } from '../services/allAPI'
import { addProjectResponseContext } from '../contexts/ContextApi'


const Add = () => {
  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const [preview,setPreview]=useState("")
  const [imageFileStatus,setImageFileStatus]=useState(false)
  const [projectDetails,setProjectDetails]=useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImg:""
  })
  console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg")
    {
      // valid image
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }
    else
    {
      // invalid image
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({...projectDetails,projectImg:""})
    }
  },[projectDetails.projectImg])
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview("")
    setImageFileStatus(false)
    setProjectDetails({title:"",languages:"",overview:"",github:"",website:"",projectImg:""})
  }
  const handleShow = () => setShow(true);

  const handleAddProject=async()=>{
    const {title,languages,overview,github,website,projectImg}=projectDetails
    if(title && languages && overview && github && website && projectImg)
    {
        // alert("Proceed to api")
        const reqBody=new FormData()
        reqBody.append("title",title)
        reqBody.append("languages",languages)
        reqBody.append("overview",overview)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("projectImg",projectImg)
        const token=sessionStorage.getItem("token")
        if(token)
        {
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          // make api call
          try{
            const result= await addProjectAPI(reqBody,reqHeader)
            if(result.status==200)
            {
              alert("Project Added SuccessFully")
              setAddProjectResponse(result)
              handleClose()
            }
            else
            {
              alert(result.response.data)
            }
          }
          catch(err)
          {
            console.log(err); 
          }
        }
    }
    else
    {
      alert("Please fill the form completely!!!")
    }
  }
  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'>+ New Project</button>


      <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label >
                  <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} />
                  <img height={'200px'} className='img-fluid' src={preview?preview:imageplace} alt="" />
              </label>
              { !imageFileStatus && <div className="text-warning fw-bolder my-2">*Upload only(jpeg,jpg,png) Above mentioned types!!</div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} placeholder='Project Title' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectDetails.languages}   onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} placeholder='Languages used in Project' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectDetails.overview}  onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}   placeholder='Project Overview' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} placeholder='Project Github Link' type="text" className="form-control" />
              </div>
              <div className="mb-2">
                <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} placeholder='Project Website Link' type="text" className="form-control" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add