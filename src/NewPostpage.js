import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPostpage = ( 
    //handlesubmit is a function which we passed here it occurs event while clickin  
) => {
  const { handleSubmit,postTitle,setPostTitle,postBody,setPostBody}=useContext(DataContext)
  return (
       <main className="New Post">
        <h2>Newpost</h2>
        <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title</label>
        <input 
           id='postTitle'
           type='text'
           required
           value={postTitle}
           onChange={(e)=> setPostTitle(e.target.value)}
        
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
         id="postBody" 
         type="text"
         required
         value={postBody}
         onChange={(e)=>setPostBody(e.target.value)}
          

         />
         <button type='submit'>Submit</button>
        </form>
       </main>
  )
}

export default NewPostpage
