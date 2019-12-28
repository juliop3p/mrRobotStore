import React from 'react'
import {ProductConsumer} from '../../context'
import ProductItem from '../../components/ProductItem'

export default function ProductList() {
    return (
        <>
            <div className="p-5">
                <div className="container-fluid">
                    <div className="row">
                        <ProductConsumer>                    
                                {value => {
                                    return value.products && value.products.map(product => {
                                        return (
                                            <ProductItem 
                                                key={product._id} 
                                                value={product}
                                                getProduct={value.getProduct}
                                            >
                                                <div className="card-footer d-flex justify-content-between">
                                                    <p className="text-primary mt-2"><strong>{product.title}</strong></p>                                                       
                                                    <h5 className="text-success mt-2 ">{product.price === null ? 'Free' : '$ '+product.price}</h5>
                                                </div>
                                            </ProductItem>
                                        )
                                    })
                                }}
                        </ProductConsumer>
                    </div>
                </div>
            </div>
        </>
    )
}
