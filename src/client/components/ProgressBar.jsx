import React from 'react';

const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-bar">
            <div 
                className="progress" 
                style={{ width: `${percentage}%` }}
            >
                {Math.round(percentage)}%
            </div>
        </div>
    );
};

export default ProgressBar;
