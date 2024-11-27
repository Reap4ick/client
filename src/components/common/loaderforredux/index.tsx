import React from 'react';

const ProgressBar: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return isLoading ? (
        <div style={{ width: '100%', background: '#f3f3f3', position: 'relative' }}>
            <div
                style={{
                    width: '50%',
                    height: '4px',
                    background: '#4caf50',
                    animation: 'progress 1s infinite',
                }}
            />
            <style>
                {`
                @keyframes progress {
                    0% { transform: translateX(0); }
                    50% { transform: translateX(50%); }
                    100% { transform: translateX(100%); }
                }
                `}
            </style>
        </div>
    ) : null;
};

export default ProgressBar;
