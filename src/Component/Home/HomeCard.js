import React from 'react'

export default function HomeCard(props) {
    return (
        <div className="bg-white/80 backdrop-blur-sm text-blue-900 rounded-2xl p-4 w-56 gap-5 flex flex-col items-center border border-blue-100 shadow-md shadow-blue-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-300/60">
            <div className="h-40 w-full flex justify-center items-center overflow-hidden rounded-xl">
                <a
                    href={props.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full h-full"
                >
                 <img
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                    src={props.photo}
                    alt={props.name}
                />
                </a>
            </div>

            <a
                href={props.link}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-lg hover:text-blue-700 transition-colors"
            >
                {props.name}
            </a>
        </div>
    )
}
