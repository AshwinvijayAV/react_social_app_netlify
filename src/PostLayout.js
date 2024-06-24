import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const PostLayout = () => {
  return (
   <>
        <Link to="/peoplepostpage/1">Post1</Link>
            <br></br>
            <Link to="/peoplepostpage/2">Post2</Link>
            <br></br>
            <Link to="/peoplepostpage/3">Post3</Link>
            <br></br>
            <Link to="/peoplepostpage/newpostpage">Newpost</Link>
            <Outlet />
    
   </>
  )
}

export default PostLayout
