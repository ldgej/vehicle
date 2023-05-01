import React from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const SingleSuperStar=({person})=> {
     const { fields }=person;
     const name = fields?.name;
     const imageUrl = fields?.pic?.fields?.file?.url;
     const descArray = fields?.description;
  return (
    <div className="card">
        <div className="title">{name}</div>
        <Image 
          src={`https:${imageUrl}`}
          width={250}
          height={320}
        />
        <div>{documentToReactComponents(descArray)}</div>
    </div>   
    )
}
