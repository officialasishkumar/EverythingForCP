import React from 'react'
import loading from './load.gif'

export default function Loading() {
  return (
    <div className='flex justify-center'>
        <img width={"200px"} src={loading} alt="loading" />
    </div>
  )
}
