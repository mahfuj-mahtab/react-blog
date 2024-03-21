import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login,logOut} from './store/authSlice'
import { Header,Footer } from './components'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logOut())
      }
    }).finally(()=>{
      setLoading(false)
    })
  }, [])
  
  return !loading ? (
    <>
    <Header />
    <main>
      
    </main>
    <Footer />
    </>
  ) : null
}

export default App
