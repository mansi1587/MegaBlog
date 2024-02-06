import React,{useState,useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { AuthLayout, Login } from '../components/index.js'
import authService from '../appwrite/auth'
import Post from "./Post.jsx"

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() =>{
        appwriteService.getPosts().then((posts) =>{
            if(posts){
                setPosts(posts.documents)
            }
        })

    },[])
    
    const userData = authService.getCurrentUser()

    if(posts.length === 0 && !userData){
        return(
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read posts
                            </h1>
                            <AuthLayout authentication={false}>
                                <Login />
                            </AuthLayout>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else if(posts.length === 0 && userData){
      return(  <div className=' w-full py-8'>
        <Container>
        <AuthLayout authentication>
                {" "}
                <Post />
            </AuthLayout>
            </Container>
    </div>)
    }
  return (
    <div className=' w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
        {posts.map((post) =>(
            <div key={post.$id} className='w-1/4'><PostCard {...post}/></div>
        ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
