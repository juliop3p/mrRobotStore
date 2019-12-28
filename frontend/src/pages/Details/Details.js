import React, { useState } from 'react'

import noImage from '../../assets/no-img.png'
import { ProductConsumer } from '../../context'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'

export default function Details(props) {
    const [modal, setModal] = useState(false)

    function closeModal() {
        setModal(false)
    }

    return (
        <>
            <ProductConsumer>
                {value => {
                    const { company, info, price, title, inCart, img } = value.selectedProduct
                    return title ? (
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1 className="text-white">{title}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <img 
                                        src={`${img ? `http://localhost:8080/files/${img}` : noImage }`} 
                                        alt="Product"
                                        className="card-img-top"
                                    />
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2 className="text-white">model: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        made by: <span className="text-uppercase">
                                            {company}
                                        </span>
                                    </h4>
                                    <h4 className="text-success">
                                        <strong>
                                            price: {price === null ? 'Free' : <span>$ {price}</span>}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0 text-white">
                                        some info about product:
                                    </p>
                                    <p className="text-white lead">
                                        {info}
                                    </p>
                                    <div>
                                        <Link
                                            to="/"
                                        >
                                            <button className="btn btn-outline-primary text-uppercase">back to products</button>
                                        </Link>
                                        <button 
                                            className="btn btn-outline-danger ml-3 text-uppercase"
                                            onClick={() => {
                                                setModal(true)
                                                value.handleAddToCart()
                                            }}
                                            disabled={inCart}
                                        >
                                            { inCart ? 'Added' : 'Add to cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ( 
                        <div className="container d-flex flex-column align-items-center p-5">
                            <div className="row">
                                <h1 className="text-white text-center mt-5">Select a product to see the info...</h1>
                            </div>
                            <Link 
                                to="/"
                                className="btn btn-outline-danger col-10 col-md-8 col-lg-6"
                            >
                                back to home
                            </Link>
                        </div>
                    )
                }}
            </ProductConsumer>
            {modal && <Modal closeModal={closeModal} />}
        </>
    )
}
