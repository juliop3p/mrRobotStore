import React from 'react'
import { Link } from 'react-router-dom'
import noImage from '../assets/no-img.png'

export default function ProductItem(props) {
    return (
        <>
            <div className="col-9 mx-auto col-md-6 col-lg-4 col-xl-3 my-3" key={props.value._id}>
                <div className={`card ${props.children && 'product-effect'}`}>
                    <Link 
                        to="/details"
                        onClick={() => props.getProduct(props.value._id)}
                    >
                        <div className="img-container p-5">
                            
                                <img 
                                    src={`${props.value.img ? `http://localhost:8080/files/${props.value.img}` : noImage }`} 
                                    alt="Product"
                                    className="card-img-top"
                                />
                                {props.value.inCart && (<i className="fas fa-cart-plus mr-2 text-white in-cart"></i>)}
                        </div>
                    </Link>
                    
                    {
                        !props.children ?
                        (
                            <div className="card-footer d-flex">

                                <button 
                                    className="btn btn-outline-warning col"
                                    onClick={() => props.handleEdit(props.value)}
                                >
                                    Edit
                                </button>

                                <button 
                                    className="btn btn-outline-danger ml-2 col"
                                    onClick={() => props.handleRemove(props.value._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ) : 
                        props.children
                    }
                </div>
            </div>
        </>
    )
}
