import React, { useState } from 'react'

import api from '../../services/api'

import ProductsAdmin from '../../components/ProductsAdmin'
import Form from '../../components/Form'
import { ProductConsumer } from '../../context'

export default function Admin() {

    const [img, setImg] = useState(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [showProducts, setShowProducts] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const formProps = {img, title, price, company, description, editing}

    const handleChange = (target, value) => {
        if(target === 'img') {
            setImg(value)
        } else if(target === 'title') {
            setTitle(value)
        } else if(target === 'price') {
            setPrice(value)
        } else if(target === 'company') {
            setCompany(value)
        } else {
            setDescription(value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let data = new FormData()

        data.append('img', img)
        data.append('title', title)
        data.append('price', price)
        data.append('company', company)
        data.append('description', description)

        cleanForm(false)

        editing ? await api.put(`/edit/${id}`, data) :
            await api.post('/new-product', data)

        if(editing) {
            setEditing(false) 
            setShowForm(false)
        }
        
        loadProducts()
    }

    const handleClick = which => {
        if(which === 'products') {
            setShowProducts(true)
            setShowForm(false)
        } else {
            setShowForm(true)
            setShowProducts(false)
        }
    }

    const handleEdit = async (product) => {
        setEditing(true)
        setId(product._id)
        setImg(product.img)
        setTitle(product.title)
        setPrice(product.price)
        setCompany(product.company)
        setDescription(product.info)
        setShowForm(true)
    }

    const handleRemove = async (id) => {
        await api.delete(`/remove/${id}`)
        loadProducts()
    }

    const cleanForm = (not = true) => {
        setImg(null)
        setTitle('')
        setPrice('')
        setCompany('')
        setDescription('')
        not && setEditing(false)
    }

    let loadProducts

    return (
        <>
            <ProductConsumer>
                {value => {
                    loadProducts = value.loadProducts
                }}
            </ProductConsumer>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col text-center">
                        <button 
                            className="btn btn-outline-danger col-5 col-md-3 mx-3" 
                            onClick={() => {
                                cleanForm()
                                handleClick('form')
                            }}
                        >
                            New Product
                        </button>

                        <button 
                            className="btn btn-outline-danger col-5 col-md-3" 
                            onClick={() => {
                                cleanForm()
                                handleClick('products')
                            }}
                        >
                            Products
                        </button>
                    </div>
                    
                </div>
            </div>
            
            { 
                showForm &&
                    (
                        <Form 
                            handleSubmit={handleSubmit} 
                            handleChange={handleChange}
                            formProps={formProps}
                        />
                    )
            }

            { 
                showProducts && 
                    (
                        <ProductsAdmin 
                            handleEdit={handleEdit} 
                            handleRemove={handleRemove} 
                        />
                    )
            } 
        </>
    )
}
