import React from 'react'
import { Link } from 'react-router-dom'

export default function CartTotals({value}) {
    const { cartSubTotal, cartDelivery, cartTotal } = value

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <Link 
                            to="/"
                        >
                            <button 
                                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                onClick={() => value.clearCart()}
                            >
                                clear cart
                            </button>
                        </Link>
                        <h5>
                            <span className="text-title text-white">
                                subtotal:
                            </span>
                            <strong className="text-white"> ${cartSubTotal}</strong>
                        </h5>
                        <h5>
                            <span className="text-title text-white">
                                delivery:
                            </span>
                            <strong className="text-white"> ${cartDelivery}</strong>
                        </h5>
                        <h5>
                            <span className="text-title text-white">
                                total:
                            </span>
                            <strong className="text-white"> ${cartTotal}</strong>
                        </h5>
                    </div>
                </div>
            </div>
        </>
    )
}
