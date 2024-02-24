import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../store';

axios.defaults.withCredentials = true;

function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    
    const sendLogoutReq = async () => {
        const res = await axios.post("http://localhost:5000/api/logout",null, {
            withCredentials: true
        });
        if (res.status == 200) {
            return res
        }
        return new Error("Unable to Logout. Please try again")
    }

    const handleLogout = () => {
        sendLogoutReq().then(()=>dispatch(authActions.logout()));
    };
    const [value, setValue] = useState();
  return (
    <div>
        
        <div onChange={(e,val)=> setValue(val)}>
            {!isLoggedIn && <> <Link to="/login"  >Login</Link>
            <Link to="/Signup"  >Signup</Link></>}

            {isLoggedIn && <Link onClick={handleLogout} to="/"  >logOut</Link>}


        </div>
    </div>
  )
}

export default Header