import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

const Withnav = (props) => {
  return (
    <>
    <Navbar role={props.role}/>
    <Outlet />
    </>
  )
}

export default Withnav