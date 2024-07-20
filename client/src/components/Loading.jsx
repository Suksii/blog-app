import React from 'react';

const Loading = () => {
    return (
        <div className="h-[100vh]">
            <div className="loader text-red-700 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 "></div>
        </div>
    );
};

const ButtonLoading = () => {
    return (
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-100 ml-3"></div>
    );
};

export {Loading, ButtonLoading};