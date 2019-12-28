import React from 'react'
import { ProductConsumer } from '../../context'
import CartColumns from './CartColumns'
import CartList from './CartList'
import CartTotals from './CartTotals'
import EmptyCart from './EmptyCart'


export default function Cart() {
    return (
        <div>
            <ProductConsumer>
                {value => {
                    return (
                        value.cart.length > 0 ?
                        (
                            <>
                                <CartColumns />
                                <CartList item={value.cart} value={value} />
                                <CartTotals value={value} />
                            </>
                        ) : 
                        ( <EmptyCart /> )
                    )
                }}
            </ProductConsumer>
        </div>
    )

}
