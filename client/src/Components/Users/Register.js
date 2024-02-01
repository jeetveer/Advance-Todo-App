import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Register() {

    const navigate = useNavigate();
    const [regis, setRegis] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setRegis({ ...regis, [e.target.name]: e.target.value });
        // console.log(regis);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = regis;

        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                try {
                    const regisResponse = await axios.post('http://localhost:8000/register', regis);
                    alert("Register Succesfully");
                    // Set the token in local storage
                    localStorage.setItem('userToken', regisResponse.data);

                    // Set the token in cookies
                    // document.cookie = `userToken=${response.data}`;
                    Cookies.set('userToken', regisResponse.data);
                    // Redirect to the Dashboard
                    navigate("/dashboard");
                    console.log(regisResponse.data);
                } catch (error) {
                    console.error(error);
                    console.error("front ent me Regis wale axios me error");
                }
            } else {
                alert("Passwords do not match");
            }
        } else {
            alert("Fill all Field")
        }

    }

    return (
        <>
            <form action='post' className='container border border-primary col-4 my-3 py-3 px-5' onSubmit={handleSubmit} >
                <h1 className="text-center mb-3">User Registsration</h1>
                <div className="my-2">
                    <label htmlFor="name">Name</label>
                    <input className='form-control' type="text" name='name' onChange={handleChange} required />
                </div>
                <div className="my-2">
                    <label htmlFor="email">Email</label>
                    <input className='form-control' type="email" name='email' onChange={handleChange} required />
                </div>
                <div className="my-2">
                    <label htmlFor="password">Password</label>
                    <input className='form-control' type="password" name='password' onChange={handleChange} required />
                </div>
                <div className="my-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input className='form-control' type="password" name='confirmPassword' onChange={handleChange} required />
                </div>
                <div className="text-center my-4">
                    <button className="btn btn-primary text-center" type='submit'>Register</button>
                </div>
            </form>
        </>
    )
}

export default Register