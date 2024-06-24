import { createContext,useState,useEffect } from "react";
import Post from "../Post";
import PostLayout from "../PostLayout";

import { format } from "date-fns";

import api from "../api/posts"
import EditPost from "../EditPost";
import useWindowSize from "../hooks/useWindow";
import useAxiousFetch from "../hooks/useAxiousFetch";
import { useNavigate } from "react-router-dom";

const DataContext= createContext({})

export const DataProvider = ({children}) =>{

    const [posts,setPosts]=useState([])
    const [search,setSearch]=useState('');
    const [searchResults,setSearchResults ]= useState([]);
    const [postTitle,setPostTitle]= useState('');
    const [postBody,setPostBody]= useState('');
    const [editTitle,setEditTitle]= useState('');
    const [editBody,setEditBody]= useState('');
    const navigate=useNavigate()
    const { width } = useWindowSize()
    const {data,fetchError,isLoading}= useAxiousFetch('http://localhost:3800/posts')
    
    useEffect(()=>{
      setPosts(data)

    },[data])

   


    useEffect(()=>{
       const filteredResults = posts.filter((post)=> 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
       || ((post.title).toLowerCase()).includes(search.toLowerCase())
      )

      setSearchResults(filteredResults.reverse());
    },[posts,search])
    

    const handleSubmit= async(e)=>{
       e.preventDefault();
       const id= posts.length ? posts[posts.length-1].id+1 :1
       const datetime= format(new Date(),'MMMM dd, yyyypp') 
       const newPost= {id,title: postTitle,datetime,body: postBody};
       try{
        const response = await api.post('/posts',newPost)
       const allPosts=[...posts,response.data]
       setPosts(allPosts);
       setPostTitle('')
       setPostBody('')
       navigate('/')
       }
       catch(error)
       {
             console.log(`Error:${error.messsage}`)
       }
       
    
    }
    const handledelete= async(id)=>{

      try{
      await api.delete(`posts/${id}`)
       const postsList = posts.filter(post => post.id !== id);
       setPosts(postsList)
       navigate('/')
    } 
    catch(error)
    {
          console.log(`Error:${error.messsage}`)
    }                                          
  }

  const handleEdit = async (id)=>{
       
       const datetime= format(new Date(),'MMMM dd, yyyypp')
       const updatedPost={ id, title:editTitle,datetime,body:editBody} ;
       try{

            const response = await api.put(`/posts/${id}`,updatedPost)
            setPosts(posts.map(post => post.id===id ? {...response.data} :post));
            setEditTitle('')
            setEditBody('')
            navigate('/')

       }
       catch (err){

        console.log(`Error:${err.messsage}`)

       } 
  }
       return (
      <DataContext.Provider value={{
          width,search,setSearch,fetchError,isLoading,handleSubmit,postTitle,
          setPostTitle,postBody,setPostBody,
          posts,handleEdit,editBody,
          setEditBody,editTitle,setEditTitle,handledelete,searchResults
      }} >
          {children}
      </DataContext.Provider>

       )

}

export default DataContext