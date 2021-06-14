import React from 'react'
import ReactLoading from 'react-loading'

export default function Loading({loading}) {
    return (
        <>{loading? 
        <div className="loading">
            <div className="loading-container">
            <ReactLoading type={'spin'} color={'#fff'} height={'50px'} />

            </div>

        </div>
            : ""}</>
    )
}
