import React, { useContext, useEffect } from 'react'
import Todo from './Todo'
import axios from 'axios';
// import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { loginContext } from './ContextProvider/Context';


function Dashboard() {
  const { setLoginData } = useContext(loginContext);

  const navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("userToken");
    // let token = Cookies.get("userToken");

    axios.get("http://localhost:8000/dashboard", {
      headers: {
        Authorization: token
      }
    }).then((response) => {
      setLoginData(response.data.validUserOne);
    }).catch((error) => {
      console.log("User NOT verified");
      navigate("*");
    })
  };

  useEffect(() => {
    DashboardValid();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Todo />
    </div>
  );
}



export default Dashboard