import React from 'react'
import noImage from '../../assets/no-img.png'

export default function CartItem({item, value}) {
    const { _id, title, img, price, total, count } = item
    const { incrementAndDecrement, removeItem } = value
    
    return (
        <div className="row my-3 text-capitalize text-center mb-5">
            <div className="col-10 mx-auto col-lg-2">
                <img 
                    src={img ? `http://localhost:8080/files/${img}` : noImage} 
                    alt="product"
                    style={{width: "5rem", height: "5rem"}} 
                    className="img-fluid"
                />
            </div>

            <div className="col-10 mx-auto col-lg-2 text-white">
                <span className="d-lg-none text-white">product: </span>
                {title}
            </div>

            <div className="col-10 mx-auto col-lg-2 text-white">
                <span className="d-lg-none text-white">price: </span>
                ${price}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                        <span 
                            className="btn btn-white mx-1 text-white"
                            onClick={() => {
                                count === 1 ? removeItem(_id) :
                                    incrementAndDecrement(_id, 'decrement')
                            }}
                        >
                            -
                        </span>
                        <span className="btn btn-white mx-1 text-white">{count}</span>
                        <span 
                            className="btn btn-white mx-1 text-white"
                            onClick={() => incrementAndDecrement(_id, 'increment')}
                        >
                            +
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <div 
                    className="cart-icon cursor"
                    onClick={() => removeItem(_id)}
                >
                    <i className="fas fa-trash text-warning"></i>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <strong className="text-white">item total: ${total}</strong>
            </div>

        </div>
    )
}
