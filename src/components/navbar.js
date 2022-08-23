import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from "react-use-cart";

// import Filter from './Filter';
const Navbar = (props) => {
let role = localStorage.getItem('role');
const navigate= useNavigate();

const logout = ()=>{
    localStorage.clear()
    navigate('/');
}

const {
    totalUniqueItems
} = useCart();
// console.log('props navbar', props.role)
    return (
        <>
            <nav className="navbar   fixed-top navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand"><img src="https://www.tailorbrands.com/wp-content/uploads/2022/02/icons-20-300x300.png" width="70" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    
                        {role == 'admin' ? (
                            <ul className="navbar-nav">
                             <li className="nav-item">
                             <Link className="nav-link" to="/home">Home</Link>
                         </li>
 
                         <li className="nav-item">
                             <Link className="nav-link" to="/product">Add Product</Link>
                         </li>
 
                         <li className="nav-item">
                             <Link className="nav-link" to="/userlist">Users</Link>
                         </li>
                         <li className="nav-item">
                             <Link className="nav-link" to="/order_list">Order List</Link>
                         </li>
                       
                         <li className="nav-item">
                         <button onClick={logout} className="btn btn-dark">Logout</button>
                         </li>
                         </ul>
                        
                        ) : (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/men">Men</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/women">Women</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/kids">Kids</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/order">Your Order </Link>
                                </li>
                            
                                <li className="nav-item">
                                <button onClick={logout} className="btn btn-dark">Logout</button>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart"><i class="fa fa-shopping-cart" style={{fontSize:"25px"}}> ({totalUniqueItems})</i></Link>
                                </li>
                            </ul>
                     )}
                        
                       
                    
                    
                          
                        
                   

                </div>
            </nav>
        </>
    )
}

export default Navbar