import React from 'react'

export default function HomeCard(props) {
    return (
        <div className="bg-blue-200 text-blue-900 rounded-lg p-4 w-48 gap-5 flex flex-col items-center">
            <div className="h-40 w-full flex justify-center items-center">
                <a
                    href={props.link}
                    target="_blank"
                    rel="noreferrer"
                >
                 <img
                    className="w-full h-full rounded-md"
                    src={props.photo}
                    alt="Image"
                />
                </a>
            </div>

            <a
                href={props.link}
                target="_blank"
                rel="noreferrer"
            >
                {props.name}
            </a>
        </div>
    )
}
