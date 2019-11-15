import React, { useState, useEffect } from 'react';
import {axiosWithAuth } from '../Utils/axiosWithAuth'


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

    const [credentials, setCredentials] = useState({email: "", password:""})


const handleChange = e => {
  setCredentials({...credentials, [e.target.name]: e.target.value})
}

const login = e => {
e.preventDefault();
axiosWithAuth() 
.post('/api/login', credentials)
.then(res => {
    localStorage.setItem('token', res.data.payload);
    props.history.push('/bubblePage')
})
.catch(err=> console.log(err));

}

return (
    <div>
     <h1> React Bubble Login</h1>
        <form onSubmit={login}>
            <input 
                type ="text"
                name="username"
                value ={credentials.username}
                onChange ={handleChange}
                placeholder= "Username Here"
            
            />
            <input 
                type ="password"
                name= "password"
                value = {credentials.password}
                onChange= {handleChange}
                placeholder= "password"
            
            />

        <button >Login</button>

        </form>
    </div>

)

}

export default Login;
