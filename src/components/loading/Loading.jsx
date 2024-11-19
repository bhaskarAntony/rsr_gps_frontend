import React, { useEffect } from 'react'
import './style.css'

function Loading() {
 
  return (
    <div className='loading'>
        <img src="https://cdn.dribbble.com/users/487964/screenshots/1464859/loading.gif" alt="loading.." />
        <h1 className="fs-4 mt-3">Loading...</h1>
    </div>
  )
}

export default Loading