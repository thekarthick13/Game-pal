import React from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Sidebar from './components/Sidebar'

export default function(){
  return(
    <div>
     <Navbar/>

     <div className='hero'>
       <Sidebar/>
       
       <Card/>
      
     </div>
  
     
    
     </div>
  )
}