import React from 'react'
import { Link } from 'react-router-dom'

function Tasks() {
    return (
        <>
            <div className="card mx-1" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Study Time</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to="#" className="btn btn-primary">Card link</Link>
                    <Link to="#" className="btn btn-primary">Another link</Link>
                </div>
            </div>
        </>
    )
}

export default Tasks