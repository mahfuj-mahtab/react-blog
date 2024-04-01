import React from 'react'
import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState('')
    const login = async(data)=>{
        setError('')
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>
        {error && <p>{error}</p>}
  
        <link rel="stylesheet" to="/signup" />
        <form onSubmit={handleSubmit(login)}>

            <Input 
                label = 'email'
                placeholder = 'enter email'
                type = 'email'
                {...register('email',{
                    required : true
                })}
            />
            <Input 
                label = 'password'
                placeholder = 'enter password'
                type = 'password'
                {...register('password',{
                    required : true
                })}
            />
            <Button type='submit'>Sign in</Button>
        </form>
    </div>
  )
}

export default Login