
import React from 'react';

type Props = {
    object: Record<string, any>;
};

const ObjectDisplayer: React.FC<Props> = ({ object }) => {

    const displayImageIfNeeded = (
        string: string) => {
        // if the string seems to be an image url, display it as an image
        if (string.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            return <img src={string} alt="img" style={{ width: "100%" }} />
        }
        else return (<div className="col-8">
            <span>{string}</span>
        </div>)
    }

    return (
        <div className="card">
            <div className="card-body">
                {Object.entries(object).map(([key, value]) => (
                    <div className="row" key={key}>
                        <div className="col-4">
                            <span className="font-weight-bold">{key}:</span>
                        </div>
                        {
                            typeof value === "object" ?
                                <div className="col-8">
                                    <ObjectDisplayer object={value} />
                                </div>
                                :
                                typeof value === "string" ?
                                    displayImageIfNeeded(value)
                                    :
                                    <div className="col-8">
                                        <span>{value}</span>
                                    </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ObjectDisplayer;

