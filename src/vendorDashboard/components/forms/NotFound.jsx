import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
       <div className="errorSection">
            <Link to="/" style={{fontSize: "35px", color: 'darkblue'}}>Go to Home</Link>
          <h1 className="errorTitle">404</h1>
          <p className="errorMessage">Page Not Found</p>
      </div>
    </>
  )
}

export default NotFound