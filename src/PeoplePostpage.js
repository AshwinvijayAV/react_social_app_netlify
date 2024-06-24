
import   React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext';


const PeoplePostpage = () => {
  const {posts,handledelete} = useContext(DataContext)
      const { id } = useParams();
      const post = posts.find(post=>(post.id).toString() === id);
         
    
  return (
     <main className='PostPage'>
      <article>
        {post &&
           <>
             <h2>{post.title}</h2>
             <p className='postDate'>{post.datetime}</p>
             <p className='postBody'>{post.body}</p>
             <Link to={`/edit/${post.id}`}><button className='editButton' >Edit post</button></Link>
             <button className="deleteButton" onClick={()=>handledelete(post.id)}>Delete post</button>

           
           </>

        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>  well,that's dissapointing </p>
            <p>
                 <Link to='/'>Visit our homepage</Link>

            </p>
          
          </>

        }
      </article>

     </main>
  )
}

export default PeoplePostpage

