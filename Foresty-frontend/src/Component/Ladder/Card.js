import React from 'react'

export default function Card(props) {
    return (
        <div className='flex justify-center my-8'>
            <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl dark:bg-blue-900">
                <img className="rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg pl-5" src={props.image} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}({props.rank})</h5>
                    <p className="font-normal text-white">Current Rating:{props.currRating}</p>
                    <p className="font-normal text-white">Max Rating:{props.maxRating}</p>
                </div>
            </div>
        </div>
    )
}
