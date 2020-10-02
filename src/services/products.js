import axios from 'axios';

const ProductsService = {
    baseUrl: `https://awesome-store-server.herokuapp.com`,
    successHandler: response => response.data,
    errorHandler:  error => {
        console.log( error.message );
        throw error;
    },
    get( url ) {
        return axios.get( `${this.baseUrl}/${url}` )
            .then( this.successHandler )
            .catch( this.errorHandler );
    },
    getAll() {
        return this.get( `products` );
    },
    getProductById( id ) {
        return this.get( `products/${id}` );
    },
    getAllReviewsForProduct( id ) {
        return this.get( `products/${id}/reviews` );
    },
    addReview( review ) {
        return axios.post(
            `https://awesome-store-server.herokuapp.com/reviews`,
            review,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then( response => response.data );
    }
}

export default ProductsService;