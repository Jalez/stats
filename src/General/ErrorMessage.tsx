import React from 'react';

type ErrorMessageProps = {
    children?: React.ReactNode;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
    return (
        <div className="alert alert-danger my-3" role="alert">
            <h4 className="alert-heading">Error</h4>
            <p>{children}</p>
        </div>
    );
};

export default ErrorMessage;