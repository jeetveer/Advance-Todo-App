import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function UserLogin() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        // console.log(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = user;

        if (email && password) {
            try {
                const response = await axios.post('http://localhost:8000/userlogin', user);
                alert("Register Successful");

                // Set the token in local storage
                localStorage.setItem('userToken', response.data);

                // Set the token in cookies
                // document.cookie = `userToken=${response.data}`;
                Cookies.set('userToken', response.data);

                // Redirect to the Dashboard
                navigate("/dashboard");

                console.log(response.data);
            } catch (error) {
                alert("invalid Data hai")// Handle errors
            }
        } else {
            alert("Fill all Field")
        }



    }


    return (
        <>
            <form className='container border border-primary col-4 my-3 px-5' >
                <h1 className='text-center mb-3'>User Login</h1>
                <div className="mx-2">
                    <label htmlFor="email">Email</label>
                    <input className='form-control mt-1' type="email" name='email' onChange={handleChange} />
                </div>
                <div className="mx-2">
                    <label htmlFor="password">password</label>
                    <input className='form-control mt-1' type="password" name='password' onChange={handleChange} />
                </div>
                <div className="my-3 text-center">
                    <div className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</div>
                </div>
            </form>
        </>
    )
}

export default UserLogin