import React from 'react';
import {Navbar,Button} from 'react-bootstrap'
import './css/Navbar.css'

const NavbarComponent=()=>{
   
   return(
   <>
   
  <Navbar bg="dark" variant="dark" className="navbar_style">
    <Navbar.Brand>
     
      <i className="far fa-sticky-note notes_icon"></i> NoteApp
    </Navbar.Brand>
  </Navbar>
  
    </>
   )
}

export default NavbarComponent;