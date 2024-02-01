import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginContext } from './ContextProvider/Context';
import Cookies from 'js-cookie';

function Navbar() {

    const { logindata, setLoginData } = useContext(loginContext);
    const navigate = useNavigate();


    const userLogout = () => {
        Cookies.remove('userToken');
        localStorage.removeItem("userToken");
        alert("You are Logged Out");
        navigate("/userlogin");
        setLoginData("");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">ToDo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (logindata.email) ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">Dashbord</Link>
                                    </li>: <div></div>
                            }
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">{logindata.email}</Link>
                            </li>
                        </ul>
                       
                        {
                            (logindata.email) ? (
                                <div className="mx-2">
                                    <Link className="btn btn-primary my-2" to="userLogin" onClick={userLogout}>Logout</Link>
                                </div>
                            ) : (
                                <div >
                                    <Link className='btn btn-primary mx-2' to="/register">Register</Link>
                                    <Link className='btn btn-primary' to="userLogin">Login</Link>
                                </div>
                            )
                        }
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar