import React from 'react'

export default function Form({ handleSubmit, handleChange, formProps }) {
    return (
        <div className="container mt-4 form-product col-11 col-sm-10 col-lg-8">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center pt-3 text-muted text-capitalize">{formProps.editing ? 'Editing Product...' : 'Register a new product'}</h3>
                <div className="form-group py-2">
                    <input 
                        type="file" 
                        className="form-control mt-3"
                        onChange={event => {
                            console.log(event.target.files[0])
                            handleChange('img', event.target.files[0])}}
                    />

                    <input 
                        type="text"
                        className="form-control mt-3"
                        placeholder="Type the title of the product..."
                        value={formProps.title}
                        onChange={event => handleChange('title', event.target.value)}
                    />

                    <input 
                        type="number" 
                        className="form-control mt-3"
                        placeholder="$"
                        value={formProps.price}
                        onChange={event => handleChange('price', event.target.value)}
                    />

                    <input 
                        type="text"
                        className="form-control mt-3"
                        placeholder="Made by ex.: Samsung"
                        value={formProps.company}
                        onChange={event => handleChange('company', event.target.value)}
                    />

                    <textarea 
                        className="form-control mt-3"
                        placeholder="Description of your product..."
                        value={formProps.description}
                        onChange={event => handleChange('description', event.target.value)}
                    >
                    </textarea>
                </div>
                <button className="btn btn-outline-primary col-12 mb-4">
                    Register
                </button>
            </form>
        </div>
    )
}
