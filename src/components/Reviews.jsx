import React, { Component } from 'react';
import * as Actions from '../actions';
import productsService from '../services/products';

class Reviews extends Component {
    state = {
        status: '',
        reviews: null
    };

    render() {
        const { status, reviews, error } = this.state;
        let el;

        switch( status ) {
            case Actions.FETCHING_REVIEWS:
                el = (
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <strong>Reviews are being fetched. Hang on!</strong>
                    </div>
                );
                break;
            case Actions.FETCHED_REVIEWS:
                el = (
                    <ul className="list-group">
                    {
                        reviews.map( 
                            review => (
                                <li className="list-group-item" key={review.id}>
                                    <h3 className="h5">{review.title}</h3>
                                    <div>
                                        <strong>Rating: {review.starRating} / 5</strong>
                                    </div>
                                    <div>
                                        <small>By {review.reviewer} on {review.createdDate}</small>
                                    </div>
                                    <div className="my-2">{review.text}</div>
                                </li>
                            )
                        )
                    }
                    </ul>
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
                <h2>Reviews</h2>
                <hr />
                {el}
            </div>
        );
    }

    // cdm
    componentDidMount() {
        this.id = this.props.match.params.id;

        this.setState(
            {
                status: Actions.FETCHING_REVIEWS
            },
            () => {
                productsService.getAllReviewsForProduct( this.id )
                    .then(reviews => this.setState(
                        {
                            reviews,
                            status: Actions.FETCHED_REVIEWS
                        }
                    ))
                    .catch(error => this.setState(
                        {
                            error,
                            status: Actions.ERROR_FETCHING_REVIEWS
                        }
                    ));
            }
        );
    }
}

export default Reviews;