import React from 'react'
import { ProductConsumer } from '../context'
import noImage from '../assets/no-img.png'
import { Link } from 'react-router-dom'

export default function Modal(props) {
    return (
        <>
            <ProductConsumer>
                {value => {
                    const { img, title, price } = value.selectedProduct
                    return (
                        <div className="container">
                            <div className="row">
                                <div id="modal" className="col-8 col-sm-7 mx-auto col-md-5 col-lg-4 text-center text-capitalize m-5 p-5 rounded">
                                    <h5 className="text-primary mt-3">item added to the cart</h5>
                                    <img 
                                        src={`${img ? `http://localhost:8080/files/${img}` : noImage }`}
                                        className="img-fluid" 
                                        alt="product"
                                    />
                                    <h5 className="text-muted">{title}</h5>
                                    <h5 className="text-success mt-2 ">{price === null ? 'Free' : '$ '+price}</h5>
                                    <div>
                                        <Link 
                                            to="/"
                                            className="btn btn-outline-primary"
                                            onClick={() => props.closeModal()}
                                            >
                                            continuing shopping
                                        </Link>
                                        <Link 
                                            to="/cart"
                                            className="btn btn-outline-danger ml-2"
                                            onClick={() => props.closeModal()}
                                        >
                                            go to cart
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        </>
    )
}
