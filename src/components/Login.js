import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

function Login() {
  const dispatch = useDispatch();
    const history = useNavigate();

    const [inputs,setInputs]=useState({
        
        email:"",
        password:""
    });

    const handleChange = (e)=> {
        setInputs(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
        
    };

    const sendRequest = async ()=> {
        const res = await axios.post('http://localhost:5000/api/login', {
            
            email: inputs.email,
            password: inputs.password
        })
        .catch((err)=> console.log(err));
        const data = await res.data;
        return data;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        //send http request
        sendRequest().then(()=> dispatch(authActions.login())).then(()=>history("/user"));
    };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        name="email"
        value={inputs.email} 
        onChange={handleChange}
        placeholder="Email" 
      />
      <input 
        type="password" 
        name="password"
        value={inputs.password} 
        onChange={handleChange}
        placeholder="Password" 
      />
      <button type="submit">Login</button>
    </form>
    </div>
  )
}

export default Login