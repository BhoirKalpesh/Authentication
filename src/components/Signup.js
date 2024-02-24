import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const history = useNavigate();

    const [inputs,setInputs]=useState({
        name:"",
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
        const res = await axios.post('http://localhost:5000/api/signup', {
            name: inputs.name,
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
        sendRequest().then(()=>history("/login"));
    };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name"
        value={inputs.name} 
        onChange={handleChange}
        placeholder="Name" 
      />
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
      <button type="submit">Signup</button>
    </form>
    </div>
  )
}

export default Signup