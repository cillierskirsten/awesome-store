import {
    FETCHING_PRODUCTS,
    FETCHED_PRODUCTS,
    ERROR_FETCHING_PRODUCTS,
} from './constants';

import productsService from '../services/products';

function fetchingProductsAC() {
    return {
        type: FETCHING_PRODUCTS
    }
}

function fetchedProductsAC( items ) {
    return {
        type: FETCHED_PRODUCTS,
        payload: {
            items
        }
    }
}

function errorFetchingProductsAC( error ) {
    return {
        type: ERROR_FETCHING_PRODUCTS,
        payload: {
            error
        }
    }
}

function fetchProductsThunk() {
    return function fetchProducts( dispatch ) {
        // main action (effect)
        dispatch( fetchingProductsAC() );

        // side effect
        productsService.getAll()
            .then( products => dispatch( fetchedProductsAC( products ) ) )
            .catch( error => dispatch( errorFetchingProductsAC( error ) ) );
    }
}

function fetchProductDetailsThunk( id ) {
    return function fetchProducts( dispatch ) {
        // main action (effect)
        dispatch( fetchingProductsAC() );

        // side effect
        productsService.getProductById( id )
            .then( products => dispatch( fetchedProductsAC( products ) ) )
            .catch( error => dispatch( errorFetchingProductsAC( error ) ) );
    }
}

export {
    // fetchingProductsAC,
    // fetchedProductsAC,
    // errorFetchingProductsAC,
    fetchProductsThunk,
    fetchProductDetailsThunk
};