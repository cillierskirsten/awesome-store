import React from 'react';
import { Switch, Route } from 'react-router-dom';

import About from './About';
import Products from './Products';
import ProductDetails from './ProductDetails';
import PageNotFound from './PageNotFound';

const App = () => {
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/products">Products</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="container my-4">
                <Switch>
                    <Route path="/" component={About} exact={true} />
                    <Route path="/products" component={Products} exact={true} />
                    <Route path="/products/:id" component={ProductDetails} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </div>
    );
};

export default App;