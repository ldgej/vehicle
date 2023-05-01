import React from 'react'
import Link from 'next/link';


export const SingleBrand=({car,onDelete})=> {
     const { fields,sys }=car;
     const { id }=sys;
     const { title, country }=fields;
    
  return (
    <div className="flex-1 border-2 m-4 p-2 border-purple-500 bg-purple-600 bg-opacity-25">
        <div className="title p-1"><span className='p-2'>Title:</span>{title}</div>
        <div className='p-1'><span className='p-2'>Country:</span>{country}</div>
        <Link href={`/carbrand/${title}`}><button className='border border-solid bg-blue-500 text-white m-1 p-1 rounded'>Details</button></Link>
        <button className='border border-solid bg-red-500 text-white m-1 p-1 rounded' onClick={()=>{onDelete(id)}}>Delete</button>
    </div>   
    )
}
