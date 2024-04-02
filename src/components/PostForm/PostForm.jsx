import React,{useCallback} from 'react'
import { Form } from 'react-router-dom'
import {Input,Select,RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux'
function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValue} = useForm({
        defaultValues : {
            title : post?.title || '',
            slug : post?.slug || '',
            content : post?.content || '',
            status : post?.status || 'active',
        }
    })
    const navigate = useNavigate()
    const userData = useSelector(state=>state.user.userData)
    const submit = async (data)=>{
        if(post){
            const file = data.image[0]? service.uploadFile(data.image[0]) : null
            if(file){
                service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updatePost(post.$id,{...data,
                featuredImage : file? file.$id : undefined
            
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            
        }
    }
  return (
    <div>PostForm</div>
  )
}

export default PostForm