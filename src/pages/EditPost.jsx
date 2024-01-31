import React,{useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config"
import { useParams,useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            })
        }else{
            navigate('/')
        }

    }, [slug, navigate])
  return (
    <div className='py-8'>
        <Container>
            <div >
                <PostForm post={post}/>
            </div>
        </Container>
      
    </div>
  )
}

export default EditPost

