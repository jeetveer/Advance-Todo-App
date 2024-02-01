import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function UpdateNote() {

    const [noteUpdate, setNoteUpdate] = useState();

    const { id } = useParams();

    axios.get(`http://localhost:8000/updatenote/${id}`)
        .then((response) => {
            console.log("Successfully Got data");
            setNoteUpdate(response.data);
        }).catch((error) => {
            console.log(error);
        })

    const handleChange = (e) => {
        // const []
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    




    return (
        <>
            <form className='container border border-dark col-5 p-5' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Task Name</label>
                    <input type="text" className="form-control" id="recipient-name" name="taskname" value={noteUpdate.taskname} onChange={handleChange} />
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
        </>
    )
}

export default UpdateNote