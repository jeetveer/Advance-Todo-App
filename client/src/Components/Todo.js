import React, { useEffect, useState } from 'react'
import AddTask from './AddTask'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Todo() {
    const [userNotes, setUserNotes] = useState([]);
    const [users, setUsers] = useState([]);


    //get all notes
    const allUserNotes = async () => {

        let token = localStorage.getItem("userToken");

        axios.get("http://localhost:8000/dashboard/notes", {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            setUserNotes(response.data);
        }).catch((error) => {
            console.log("User NOT verified");
        })

    };


    //get all users
    const allUser = async () => {
        let token = localStorage.getItem("userToken");

        axios.get("http://localhost:8000/alluser", {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            setUsers(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }


    //delete note

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:8000/delete/${id}`)
            .then((res) => {
                alert("successfully deleted");
                window.location.reload();
            }).catch((error) => {
                console.log("error in deleting note");
            })
    }




    useEffect(() => {
        allUserNotes();
        allUser();
        // eslint-disable-next-line
    }, []);

    return (
        <>

            <div className="container-fluid m-5 d-flex overflow-hidden">
            
                <AddTask/>

                {

                    userNotes.map((note, index) => {
                        return (
                            <div className="card m-2" key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">{note.taskname}</h5>
                                    <p className="card-text">{note.description}</p>
                                    <p className="card-text"><small className="text-muted">{note.time}</small></p>
                                    <Link to={"/edit/" + note._id} className="btn btn-primary mx-1">View</Link>
                                    <Link className="btn btn-danger mx-1" onClick={() => deleteNote(note._id)} >Delete</Link>
                                    <Link to={"/update/" + note._id} className="btn btn-danger mx-1">Update</Link>
                                    <button className="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#searchModel" data-bs-whatever="@mdo">Assign Task</button>
                                </div>
                                <div className="modal fade" id="searchModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <form>
                                                    <div className="d-flex">
                                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                                    </div>

                                                    {
                                                        // eslint-disable-next-line
                                                        users.map((users) => {
                                                            if (users._id !== note.user) {
                                                                return (
                                                                    <div className="list-group my-3">
                                                                        <div className="list-group-item">
                                                                            <div className="cunpmstom-control custom-checkbox">
                                                                                <input type="checkbox" className="custom-control-input" id="user1" />
                                                                                <label className="custom-control-label px-3" htmlFor="user1">{users.name}</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }

                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" >Send Task</button>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}


export default Todo