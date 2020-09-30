import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Reviews from './Reviews';
import AddReview from './AddReview';

import productsService from '../services/products';

import * as Actions from '../actions';

class ProductDetails extends Component {
    state = {
        status: '',
        product: null
    };

    render() {
        const { status, product, error } = this.state;
        let el;

        switch( status ) {
            case Actions.FETCHING_PRODUCT_DETAILS:
                el = (
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <strong>Product details are being fetched. Hang on!</strong>
                    </div>
                );
                break;
            case Actions.FETCHED_PRODUCT_DETAILS:
                el = (
                    <div>
                        <h2>{product.name}</h2>
                        <hr />
                        <div className="row">
                            <div className="col-4">
                                <img src={product.imageUrl} className="img-fluid" />
                            </div>
                            <div className="col-8">
                                <div className="lead">
                                    {product.name}
                                    <div><small className="text-muted">{product.code}</small></div>
                                </div>
                                <p className="my-4">{product.description}</p>
                                <p><strong>Released on</strong>: ${product.releaseDate}</p>
                                <p><strong>Price</strong>: ${product.price}</p>
                                <p><strong>Rating</strong>: {product.starRating} / 5</p>
                            </div>
                        </div>
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
                        <p>There was an error fetching product details</p>
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
                {el}
                <div className="h5">
                    <Link to={`${this.props.match.url}/reviews`}>Reviews</Link>
                    {' | '}
                    <Link to={`${this.props.match.url}/addreview`}>Post a review</Link>
                </div>
                <Switch>
                    <Route path={`${this.props.match.path}/reviews`} component={Reviews} />
                    <Route path={`${this.props.match.path}/addreview`} component={AddReview} />
                    <Redirect from={this.props.match.path} to={`${this.props.match.path}/reviews`} />
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        this.id = this.props.match.params.id;

        this.setState(
            {
                status: Actions.FETCHING_PRODUCT_DETAILS
            },
            () => {
                productsService.getProductById( this.id )
                    .then(product => this.setState(
                        {
                            product,
                            status: Actions.FETCHED_PRODUCT_DETAILS
                        }
                    ))
                    .catch(error => this.setState(
                        {
                            error,
                            status: Actions.ERROR_FETCHING_PRODUCT_DETAILS
                        }
                    ));
            }
        );
    }
}

export default ProductDetails;