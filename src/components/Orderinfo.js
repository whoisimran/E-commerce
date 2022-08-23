import React from 'react'
import { useLocation } from 'react-router-dom'

const Orderinfo = () => {
    const location = useLocation();
    let id = location.state.id;
   
  return (
    <div>Orderinfo {id}</div>
  )
}

export default Orderinfo