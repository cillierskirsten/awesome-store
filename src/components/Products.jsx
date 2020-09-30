import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Actions from '../actions';
import productsService from '../services/products';
import { ProductCardLinkStyle } from './Products.css.js';

class Products extends Component {
    state = {
        status: '',
        products: null
    };

    render() {
        const { status, products, error } = this.state;
        let el;

        switch( status ) {
            case Actions.FETCHING_PRODUCTS:
                el = (
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <strong>Products are being fetched. Hang on!</strong>
                    </div>
                );
                break;
            case Actions.FETCHED_PRODUCTS:
                el = (
                    <div className="d-flex" style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                        products && products.map( 
                            product => (
                                <Link className="card d-flex my-3" style={ProductCardLinkStyle} to={`/products/${product.id}`} key={product.id}>
                                    <img className="card-img-top" src={product.imageUrl} style={{ width: '9rem', margin: '0 auto' }} alt={product.description} />
                                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className="card-title font-weight-bold">{product.name}</div>
                                        <div className="card-text">{product.description}</div>
                                    </div>
                                </Link>
                            )
                        )
                    }
                    </div>
                );
                break;
            case Actions.ERROR_FETCHING_PRODUCTS:
                el = (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <p>There was an error fetching products</p>
                        <p>
                            <strong>
                                {error.message}
                            </strong>
                        </p>
                    </div>
                );
                break;
            default:
                el = null;
        }

        return (
            <div>
                <h2>Product Catalog</h2>
                <hr />
                {el}
            </div>
        );
    }

    // cdm
    componentDidMount() {
        this.setState(
            {
                status: Actions.FETCHING_PRODUCTS
            },
            () => {
                productsService.getAll()
                    .then(products => this.setState(
                        {
                            products,
                            status: Actions.FETCHED_PRODUCTS
                        }
                    ))
                    .catch(error => this.setState(
                        {
                            error,
                            status: Actions.ERROR_FETCHING_PRODUCTS
                        }
                    ));
            }
        );
    }
}

export default Products;