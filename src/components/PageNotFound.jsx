import React from 'react';

const PageNotFound = () => {
    return (
        <div className="jumbotron">
            <h1 className="display-3 text-center">Page Not Found</h1>
            <hr className="my-2" />
            <p className="lead">
                The page you are looking for does not seem to exist. You may want to check out our <a href="/products">wide range of products</a>.
            </p>
        </div>
    );
};

export default PageNotFound;