import React from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import Login from './Login'
import { login } from '../store/authSlice'
import {Input} from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const create = async(data) =>{
        setError('')
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const user = await authService.getCurrentUser()
                if(user){
                    dispatch(login(data))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>Signup

    {error && <p>{error}</p>}
    <link rel="stylesheet" to="/login" />
        <form onSubmit={handleSubmit(create)}>

            <Input 
                label = 'full name'
                placeholder = 'enter full name'
                type = 'text'
                {...register('fullname',{
                    required : true
                })}
            />
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
            <button type='submit'>Sign Up</button>
        </form>

    </div>
  )
}

export default Signup