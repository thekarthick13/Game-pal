import React from 'react'
import gif from '../assets/8bit.gif'
import logo from '../assets/logo.png'



export default function Navbar(){
     return(
        <div className='nav'>
           <div className='nav-sub-1'><img className="logo" src={logo}/></div> 
            <div className='nav-sub-2'><img className="gif" src= {gif}/></div>
            <div className='nav-sub-3'><input className='search--bar'type="text" placeholder='Search'/></div>
        </div>
     )


}