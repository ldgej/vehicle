import React, { useState } from 'react'
import { createClient } from 'contentful';
import { updateEntry } from '../../Services'

import Router from 'next/router';

export const getStaticPaths = async () => {

const content_type_Id='2AbsLDfB1wkd0zxHFqOHo7'

const client = createClient({
  space: 'uhskaveuyuo5', 
  accessToken: '3IeiYhvbwzl4ZgEnNtCpdpAm-4ntPk49-YfnrZjNygY'
})

const res = await client.getEntries({ content_type: content_type_Id })

    const paths = res.items.map(item => {
      return {
        params: { id: item.fields.title }
      }
    })
          return {
           paths,
              fallback: false, 
        }
 }


export async function getStaticProps({params}) {
    
const content_type_Id='2AbsLDfB1wkd0zxHFqOHo7'


const client2 = createClient({
  space: 'uhskaveuyuo5', 
  accessToken: '3IeiYhvbwzl4ZgEnNtCpdpAm-4ntPk49-YfnrZjNygY'
})
const res = await client2.getEntries({ content_type: content_type_Id })
const entries=res.items
  return {
    props: {
      carbrand:entries.filter(item=>item.fields.title===params.id),
      id:params.id,
    }
  }
}


export default function superstar({carbrand}) {
    const { fields,sys }=carbrand[0];
    const entry_Id=sys.id;
    const {desc,rating,title,country}=fields;
    const [entryData,setEntryData]=useState({title,country,desc,rating}) 
    const refreshpage=()=>{
      Router.push({
          pathname: '/carbrand'
        });
  } 
    
    const handleOnChange=(e,type)=>{
      const value=e.target.value;
       setEntryData({...entryData,[type]:value})
    }
    const handleOnSubmit=async()=>{
      const submittedField={};
      Object.keys(entryData).forEach((key)=>{
          submittedField[key]={'en-US': entryData[key]}
      })
      console.log(submittedField);
      await updateEntry(entry_Id,submittedField,refreshpage)
  }
    const gobackToMainPage=()=>{
      refreshpage();
    }
    
  return (
    <div>
      <div className="card border-2 m-4 p-2 border-purple-500 bg-purple-600 bg-opacity-25">
        <div ><span className='p-4'>Title:</span>{entryData.title}</div>
        <div ><span className='p-1'>Country:</span><input className='m-2' value={entryData.country} type='text' onChange={(e)=>handleOnChange(e,'country')}/></div>
        <div><span className='p-1'>Desc:</span><input type='text' className='m-2' value={entryData.desc} onChange={(e)=>handleOnChange(e,'desc')}/></div>
        <div><span className='p-1'>Rating:</span> <input type='text' className='m-2' value={entryData.rating} onChange={(e)=>handleOnChange(e,'rating')}/></div>
        <button className='border border-solid bg-blue-500 text-white m-1 p-1 rounded' onClick={handleOnSubmit} >Submit </button>
        <button className='border border-solid bg-blue-500 text-white m-1 p-1 rounded' onClick={gobackToMainPage} >Back to Main Page </button>
    </div>
    </div>
        
    )   
  }
