import React from 'react';
import PageNav from '../components/PageNav';

const PageNotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404</h1>
            <p>Page Not Found</p>
            <PageNav />
        </div>
    );
};

export default PageNotFound;