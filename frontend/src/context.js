import React, { useState, useEffect } from 'react'
import api from './services/api'
const ProductContext = React.createContext()

function ProductProvider(props) {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [cart, setCart] = useState([])
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [cartDelivery, setCartDelivery] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const state = { products, selectedProduct, cart, cartSubTotal, cartDelivery, cartTotal }

    useEffect(() => {
        loadProducts()
    }, [])

    useEffect(() => {
        updateTotal()
    })

    const loadProducts = async () => {
        const products = await api.get('/products')
        await setProducts(products.data)
    }

    const updateTotal = () => {
        const tempCart = [...cart]
        let subtotal = 0
        let delivery = 0
        let total

        tempCart.map(product => {
            if (product.price) {
                product.total = product.price * product.count
                subtotal += product.total
                delivery += product.count * 5.50
            } else {
                delivery += product.count * 5.50
            }
            return product
        })
        total = subtotal + delivery
        setCartSubTotal(subtotal)
        setCartDelivery(delivery)
        setCartTotal(total)
    }

    const getProduct = id => {
        const tempProducts = [...products]
        const product = tempProducts.find(product => product._id === id)
        setSelectedProduct(product)
    }

    const handleAddToCart = () => {
        const tempProducts = [...products]
        const productsUpdated = tempProducts.map(product => {
            if (product._id === selectedProduct._id) {
                product.inCart = true
                product.count = 1
                product.total = product.price
            }
            return product
        })
        const productAdded = productsUpdated.filter(product => product.inCart)

        setProducts(productsUpdated)
        setCart(productAdded)
    }

    const removeItem = id => {
        const tempProducts = [...products]
        const tempCart = [...cart]
        const productsUpdated = tempProducts.map(product => {
            if (product._id === id) {
                product.inCart = false
                product.count = 0
                product.total = 0
            }
            return product
        })

        const newCart = tempCart.filter(product => product._id !== id)
        setProducts(productsUpdated)
        setCart(newCart)
    }

    const clearCart = () => {
        const tempProducts = [...products]
        const productsUpdated = tempProducts.map(product => {
            if (product.inCart === true) {
                product.inCart = false
                product.count = 0
                product.total = 0
            }
            return product
        })

        setProducts(productsUpdated)
        setCart([])
    }

    const incrementAndDecrement = (id, action) => {
        const tempCart = [...cart]
        const newCart = tempCart.map(product => {
            if (product._id === id) {
                if (action === 'increment') {
                    product.count++
                } else {
                    product.count--
                }
            }
            return product
        })
        setCart(newCart)
    }

    return (
        <ProductContext.Provider
            value={{
                ...state,
                getProduct: getProduct,
                loadProducts: loadProducts,
                handleAddToCart: handleAddToCart,
                incrementAndDecrement: incrementAndDecrement,
                clearCart: clearCart,
                removeItem: removeItem
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }