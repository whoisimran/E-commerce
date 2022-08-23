import React from 'react'
import { Outlet } from 'react-router-dom'

const Withoutnav = () => {
  return (
    <>
    <Outlet />
    </>
  )
}

export default Withoutnav