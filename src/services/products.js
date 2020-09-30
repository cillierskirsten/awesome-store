import axios from 'axios';

export default {
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
    }
};