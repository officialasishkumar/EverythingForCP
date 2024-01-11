import React from "react";

export default function Card(props) {
  return (
    <div className='flex justify-center mb-44 mt-44'>
            <div className="flex flex-col flex-wrap items-center rounded-lg shadow md:flex-row bg-[#D77F7F]">
                <div className="flex-col p-4">
                    <div className='flex justify-center'>
                        <img className='h-96' width={"270px"} src={props.photo} alt="" />
                    </div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Name : {props.name}</h5>
                    <p className="font-normal text-2xl text-white">CF ID : <a href={`https://codeforces.com/profile/${props.CF_id}`} target='_blank' rel='noreferrer'>{props.CF_id}</a></p>
                </div>
            </div>
        </div>
  );
}
