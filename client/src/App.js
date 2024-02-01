import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import UserLogin from './Components/Users/UserLogin';
import Register from './Components/Users/Register';
// import Todo from './Components/Todo';
import Test from './Test';
import Dashboard from './Components/Dashboard';
import Errorpage from './Components/Errorpage';
import Home from './Components/Home';
import UpdateNote from './Components/UpdateNote';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/dashboard' element={<Dashboard/>} />
        {/* <Route exact path='/todo' element={<Todo/>} /> */}
        <Route exact path='/test' element={<Test/>} />
        <Route exact path='/userlogin' element={<UserLogin/>} />
        <Route exact path='/update/:id' element={<UpdateNote/>} />
        <Route exact path='*' element={<Errorpage/>} />
      </Routes>
    </>
  );
}

export default App;
