import React, { Component } from 'react';
import ProductsService from '../services/products';

class AddReview extends Component {
    


    constructor( props ) {
        super( props );
        // Step 1: Define state to hold...
        // 1. values of each user input
        this.state = {
            values: {
                reviewer: '',
                title: '',
                starRating: '',
                text: ''
            },
            errors: {
                reviewer: [],
                title: [],
                starRating: [],
                text: []
            },
        // 2. a boolean variable with validity of the form
            isValid: false
        }
    

    }

        // Step 2 : Create reference to input DOM nodes
    reviewerRef = React.createRef();
    titleRef = React.createRef();
    starRatingRef = React.createRef();
    textRef = React.createRef();

    // Step 4: Create a validateForm() that returns the validity of the form
    // const isValid = this.state.values.reviewer !== '' &&
    //         this.state.values.starRating >= 1 && this.state.values.starRating <= 5 &&
    //         this.state.values.title !== '' &&
    //         this.state.values.text !== ''
    validate = () => {

        let reviewerErr = '', titleErr = '', starRatingErr = '', textErr = '', countDown = '';
        const maxCount = 250;
        let isValid = true;

        const { reviewer, title, starRating, text } = this.state.values;

        //name entry
        if (reviewer === '') {
            reviewerErr = reviewerErr + 'Please enter your name before continuing.' ;
            isValid = false;
        } else {
            reviewerErr = '';
        }

        //title entry
        if (title === '') {
            isValid = false;
            titleErr = titleErr + 'Please enter a title before submitting your form.';
        }
        else if (title.length > 50) {
            isValid = false;
            titleErr = titleErr + 'Please ensure your title is 20 or less characters.';
        }
        else {
            titleErr = '';
        }

        //dropdown selection for starRating
        if (starRating === '') {
            isValid = false;
            starRatingErr = starRatingErr + 'Please select a valid rating between 1 & 5';
        } else {
            starRatingErr = '';
        }

        //text area field character restrictions
        if ( text.length < 1 ) {
            isValid = false;
            textErr = textErr + ' Please add a comment before posting your review.';
        }  else if ( text.length >= 250 ) {
            isValid = false;
            textErr = textErr + text.length - 249 + ' characters over. Max of 250 characters allowed.';
        } else {
            textErr = 250 - text.length;
        }

        this.setState(
            curState => {
                return {
                    errors: {
                        ...curState.errors,
                        reviewer: reviewerErr,
                        title: titleErr,
                        starRating: starRatingErr,
                        text: textErr
                    },
                    isValid: isValid
                };
            }
        )
    }

    // Step 5: Create a updateValues() method that sets the values in state to the latest, and calls validateForm() to set validity too
    updateValues = ( event ) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(
            curState => {
                return {
                    values: {
                        ...curState.values,
                        [name]: value,
                        reviewer: this.reviewerRef.current.value,
                        title: this.titleRef.current.value,
                        starRating: this.starRatingRef.current.value,
                        text: this.textRef.current.value
                    }
                };
            },
            this.validate //this checks if entries are valid
        );
    }
    
    // Step 6: Create addReview() that is called on form submission and adds the review. Here, we make an Ajax call to POST /products/:productId/reviews, passing in review details (this.state.values)
    addReview = ( event ) => {
        event.preventDefault();

        const review = { ...this.state.values, productId: this.props.match.params.id };

        ProductsService.addReview( review )
            .then( reviewUpdated => {
                alert( `Your review has been added successfully (id = ${reviewUpdated.id})` );
                this.props.history.push( '/products/' + this.props.match.params.id )
            })
            .catch( error => alert( error.message ) );
    }

    render() {
        // Step 3: Setup refs and tie the form to the state values
        // Also explore defaultValue vs value
        const { reviewer, title, text, starRating } = this.state.values;
        const { reviewer: reviewerErr,
                starRating: starRatingErr,
                title: titleErr,
                text: textErr 
              } = this.state.errors;

        const errorStyle = {
            color: 'crimson'
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Post a review for this product</h1>
                        <hr />
                    </div>
                </div>
                <form className="form-horizontal" role="form" onSubmit={this.addReview}>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label">Your name</label>
                        <input type="text" id="reviewer" name="reviewer" className="form-control" onChange={this.updateValues} value={reviewer} ref={this.reviewerRef}/>
                        {
                            reviewerErr ? 
                            (
                                <div className="text-danger">
                                    {reviewerErr}
                                </div>
                            ) :
                            (
                                <small id="helpId" className="text-muted">Your name goes in here</small>
                            )
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="title" className="control-label">Title</label>
                        <input type="text" id="title" name="title" className="form-control" onChange={this.updateValues} value={title} ref={this.titleRef}/>
                        {
                            titleErr ? 
                            (
                                <div className="text-danger">
                                    {titleErr}
                                </div>
                            ) :
                            (
                                <small id="helpTitle" className="text-muted">Your title for the review goes in here...</small>
                            )
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="starRating" className="control-label">Rating</label>
                        <select id="starRating" name="starRating" className="form-control" onChange={this.updateValues} value={starRating} ref={this.starRatingRef}>
                            <option value="">-- Select a number --</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        {
                            starRatingErr ? 
                            (
                                <div className="text-danger">
                                    {starRatingErr}
                                </div>
                            ) :
                            (
                                <small id="helpStarRating" className="text-muted">Ratings are as follow: 1 - lowest &amp; 5 - highest))</small>
                            )
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="text" className="control-label">Your review goes in here...</label>
                        <textarea id="text" name="text" className="form-control" onChange={this.updateValues} value={text} ref={this.textRef}></textarea>

                        <div className="errors">
                            {
                                textErr ? 
                                (
                                    <div className="text-danger">
                                        {textErr}
                                    </div>
                                ) :
                                (
                                <small id="helpReview" className="text-muted">{textErr}</small>
                                )
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" disabled={!this.state.isValid}>Post review</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddReview;