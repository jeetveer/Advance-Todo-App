import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddTask() {

    const navigate = useNavigate();
    const [addtask, setAddtask] = useState({
        taskname: "",
        reminder: "",
        time: "",
        description: ""
    })

    const handleChange = (e) => {
        setAddtask({ ...addtask, [e.target.name]: e.target.value });
        console.log(addtask);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { taskname, reminder, time, description } = addtask;
        if (taskname && reminder && time && description) {

            try {
                
                let token = localStorage.getItem("userToken");

                const task = await axios.post('http://localhost:8000/notes', addtask, {
                    headers: {
                        Authorization: token
                    }
                });
                alert("Task submitted successfully");
                // for Reload page
                window.location.reload();
                console.log(task.data);
                navigate("/dashboard");

            } catch (error) {
                console.error(error);
                console.error("front ent me Addtask wale axios me error");
            }
        }
        else {
            console.error("Fill Proper data");
        }
    }


    return (
        <>
            <div className="mx-1">
                <div className="card d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#addTaskModel" data-bs-whatever="@mdo" style={{ width: "18rem" }}>
                    <i className="fa-solid fa-plus" style={{ fontSize: "10rem", color: "#647746" }} />
                    <div className="card-body">
                        <h5 className="card-title fw-bold">Add Task</h5>
                    </div>
                </div>

                <div className="modal fade" id="addTaskModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Task Name</label>
                                        <input type="text" className="form-control" id="recipient-name" name="taskname" onChange={handleChange} />
                                    </div>
                                    <div className='mt=3'>
                                        <label htmlFor="Reminder">Reminder: </label>
                                        <input type="date" id="Reminder" name="reminder" onChange={handleChange} />
                                    </div>
                                    <div className='mt=3'>
                                        <label htmlFor="time">Select a time:</label>
                                        <input type="time" id="time" name="time" onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Description</label>
                                        <textarea className="form-control" id="message-text" name="description" onChange={handleChange}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit Task</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTask