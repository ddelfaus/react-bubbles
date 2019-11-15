import React, { useState, useEffect } from 'react';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

    const [credentials, setCredentials] = useState({email: "", password:""})


const handleChange = e => {
  // setLogin({...credentials, [e.target.name]: e.target.value})
}

// const login = e => {
// e.preventDefault();
// axiosWithAuth() 
// .post('/login', credentials)
// .then(res => {
//     localStorage.setItem('token', res.data.payload);
//     props.history.push('/friends')
// })
// .catch(err=> console.log(err));

// }

return (
    <div>
     <h1> React Bubbles Login</h1>
        <form >
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
