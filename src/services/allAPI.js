// registerAPI called by Auth

import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// registerAPI called by Auth when user click register btn
export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}
// LoginAPI called by auth component when user click login btn
export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// addProjectAPI called by Add component when user click add button add-project
export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}
// getHomeProjectAPI called by Home component when page loaded in browser (useeffect)
export const getHomeProjectAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}
// allProjectAPI called by project component when page loaded in browser {useeffect}
export const allProjectAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

// userProjectAPI- called by View component when page loaded in browser (useEffect)
export const userProjectAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}
// updateProjectAPI -called by Edit component when user click update btn projects/6725f87ce247e8bfa935c7d6/edit
export const updateProjectAPI=async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

// uerProjectRemoveAPI - called by view component when user delete btn clicked
export const userProjectRemoveAPI=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}

// updateUserAPI -called by Profile component when user click update btn edit-user
export const updateUserAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}