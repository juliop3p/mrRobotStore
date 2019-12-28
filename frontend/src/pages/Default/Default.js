import React from 'react'
import { Link } from 'react-router-dom'

export default function Default() {
    return (
        <div className="container mt-5 ">
            <div className="row ">
                <div className="col-10 mx-auto text-center">
                    <h1 className="h1 text-title"> 404 page not found</h1>
                    <Link 
                        to="/" 
                        className="btn btn-outline-danger col-10 col-md-6 text-uppercase"
                    >
                        go to home page
                    </Link>
                </div>
            </div>
        </div>
    )
}
