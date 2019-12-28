import React, {useState} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

//Pages
import ProductList from './pages/ProductList/ProductList'
import Details from './pages/Details/Details'
import Cart from './pages/Cart/Cart'
import Admin from './pages/Admin/Admin'
import Default from './pages/Default/Default'

import Navbar from './components/Navbar'

export default function Routes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const PrivateRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={props => (
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to={{pathname: '/', state: { from: props.location }}} />
            )
            )}
        />
    )

    const handleAuthentication = async (situation) => { 
        setIsAuthenticated(situation)
    }

    return (
        <BrowserRouter>
            <Navbar isAuthenticated={isAuthenticated} handleAuthentication={handleAuthentication} />
            <Switch>
                <Route path="/" exact component={ProductList} />
                <Route path="/details" component={Details} />
                <Route path="/cart" component={Cart} />
                <PrivateRoute path="/admin" component={Admin} />
                <Route component={Default} />
            </Switch>
        </BrowserRouter>
    )
}