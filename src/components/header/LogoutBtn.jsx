import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logOut } from '../../store/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logOut().then(()=>{
            dispatch(logOut)
        }).catch()
    }
  return (
    <button onClick={logoutHandler}>Log out</button>
  )
}

export default LogoutBtn