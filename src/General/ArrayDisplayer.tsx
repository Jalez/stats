import React from 'react';

type Props = {
    array: any[];
};

const ArrayDisplayer: React.FC<Props> = ({ array }) => {
    return (
        <div className="card">
            <div className="card-body">
                {array.map((value, index) => (
                    <div className="row" key={index}>
                        <div className="col-4">
                            <span className="font-weight-bold">{index}:</span>
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

export default ArrayDisplayer;

