
import React from 'react';

type Props = {
    object: Record<string, any>;
};

const ObjectDisplayer: React.FC<Props> = ({ object }) => {
    return (
        <div className="card">
            <div className="card-body">
                {Object.entries(object).map(([key, value]) => (
                    <div className="row" key={key}>
                        <div className="col-4">
                            <span className="font-weight-bold">{key}:</span>
                        </div>
                        <div className="col-8">
                            <span>{value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ObjectDisplayer;

