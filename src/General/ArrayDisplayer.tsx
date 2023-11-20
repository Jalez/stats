import React from 'react';
import ObjectDisplayer from './ObjectDisplayer';

type Props = {
    array?: any[];
    arrayWithObjects?: any[];
};


const ArrayDisplayer: React.FC<Props> = ({ array, arrayWithObjects }) => {
    return (
        <div className="card">
            <div className="card-body">
                {array? array.map((value, index) => (
                    <div className="row" key={index}>
                        <div className="col-4">
                            <span className="font-weight-bold">{index}:</span>
                        </div>
                        <div className="col-8">
                            <span>{value}</span>
                        </div>
                    </div>
                )):
                
                <div className="row">
                    <div className="col-12">
                        <span>No data</span>
                    </div>
                </div>
                }
                {
                    arrayWithObjects? arrayWithObjects.map((value, index) => (
                        <div className="row" key={index}>
                            <div className="col-4">
                                <span className="font-weight-bold">{index}:</span>
                            </div>
                            <div className="col-8">
                                <ObjectDisplayer object={value} />
                            </div>
                        </div>
                    )):
                    
                    <div className="row">
                        <div className="col-12">
                            <span>No data</span>
                        </div>
                    </div>
                } 
            </div>
        </div>
    );
};

export default ArrayDisplayer;

