import React from 'react'
import ProductItem from './ProductItem'
import { ProductConsumer } from '../context'

export default function ProductsAdmin({handleEdit, handleRemove}) {
    return (
        <div className="p-5">
            <div className="container-fluid">
                <div className="row">
                    <ProductConsumer>                    
                            {value => {
                                return value.products.map(product => {
                                    return (
                                        <ProductItem 
                                            key={product._id} 
                                            value={product} 
                                            handleEdit={handleEdit} 
                                            handleRemove={handleRemove} 
                                            getProduct={value.getProduct}
                                        />
                                    )
                                })
                            }}
                    </ProductConsumer>
                </div>
            </div>
        </div>
    )
}
