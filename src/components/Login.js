import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    
    const loginhandle = async () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let response = await fetch(`http://localhost:8080/api/user/login`, {
          method: "POST",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password })
        });
        let res = await response.json();
        if (res.success) {
          localStorage.setItem('id', res.message._id);
          localStorage.setItem('role', res.message.role);
          if(res.message.role == 'admin'){
            navigate('/home');
          }else{
            navigate('/profile');
          }
        } else {
          alert('Invalid Login Details!');
        }
    }

    const hideshow = ()=>{
      let element = document.getElementById('togglePassword');
      element.classList.toggle("fa-eye-slash");
      let passwd = document.getElementById('password');
      if(passwd.getAttribute("type") == 'password'){
        passwd.setAttribute("type", "text");
      }else{
        passwd.setAttribute("type", "password");

      }
    }

    return (
        <div className='card'>
            <h3>Login Page</h3>
      
            <div className='form-group'>
                <label>Enter Email Id</label>
                <input className='form-control' type="email" id="email" placeholder="Enter Eamil" />
            </div>

            <div className='form-group'>
                <label>Enter Password</label>
                <input className='form-control' type="password" id="password" placeholder="Enter password" />
                <i class="fa fa-eye field-icon" id="togglePassword" onClick={hideshow}></i>
            </div>

            <div className='form-group'>
                <button onClick={loginhandle} className='btn btn-block btn-primary'>Login</button>
            </div>
            <p>Not Register? <Link to='/registration'>Click here</Link></p>

        </div>
    )
}

export default Login