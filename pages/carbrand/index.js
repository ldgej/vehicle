

import React, { useState } from 'react'
import { createClient as createClient2 } from 'contentful';
import { createEntry,deleteEntry } from '@/Services'
import { SingleBrand }  from '@/components/SingleBrand'
import Router from 'next/router';


const content_type_Id='2AbsLDfB1wkd0zxHFqOHo7'

export async function getStaticProps() {

const client2 = createClient2({
  space: 'uhskaveuyuo5', 
  accessToken: '3IeiYhvbwzl4ZgEnNtCpdpAm-4ntPk49-YfnrZjNygY'
})
const res = await client2.getEntries({ content_type: content_type_Id })
const entries=res.items
  return {
    props: {
      cars:entries
    }
  }
}

export default function Home({cars}) {
    console.log('cars',cars)
    const [isCreating,setIsCreating]=useState(false)
    const [entryData,setEntryData]=useState({title:'',country:'',desc:'',rating:''}) 

    const handleOnCreateOneEntry=()=>{
      setIsCreating(true)
    }

    const handleOnChange=(e,type)=>{
      const value=e.target.value;
       setEntryData({...entryData,[type]:value})
    }
     
    const refreshpage=()=>{
        Router.push({
            pathname: '/carbrand'
          });
    }
    const handleOnDelete=async(id)=>{
        await deleteEntry(id,refreshpage)
    }

    const handleOnSubmit=async()=>{
        if(entryData.title===''){
            return
        }
        else{
        const submittedField={};
        Object.keys(entryData).forEach((key)=>{
            submittedField[key]={'en-US': entryData[key]}
        })
        await createEntry(content_type_Id,submittedField,refreshpage);
        setEntryData({title:'',country:'',desc:'',rating:''})
        setIsCreating(false)
    }
}
  return (
    <div className='flex'>{cars.map(car=>{
      return <SingleBrand
      car={car}
      onDelete={handleOnDelete}
      />
    })}
    <div className=' flex-1 self-center justify-center'><button className='flex-1 border h-11 w-18 border-solid bg-blue-500 text-white m-1 p-1 rounded' onClick={handleOnCreateOneEntry}>Add One Entry</button></div>
    { isCreating&&(
    <div className="border-2 m-4 p-2 border-purple-500 bg-purple-600 bg-opacity-25">
        <div className="title" ><span className='p-4'>Title:</span><input className='m-2' value={entryData.title} type='text' onChange={(e)=>handleOnChange(e,'title')}/></div>
        <div ><span className='p-1'>Country:</span><input className='m-2' value={entryData.country} type='text' onChange={(e)=>handleOnChange(e,'country')}/></div>
        <div><span className='p-1'>Desc:</span> <input type='text' className='m-2' value={entryData.desc} onChange={(e)=>handleOnChange(e,'desc')}/></div>
        <div><span className='p-1'>Rating:</span> <input type='text' className='m-2' value={entryData.rating} onChange={(e)=>handleOnChange(e,'rating')}/></div>
        <button className='border border-solid bg-blue-500 text-white m-1 p-1 rounded' onClick={handleOnSubmit} >Submit </button>
        <button className='border border-solid bg-blue-500 text-white m-1 p-1 rounded' onClick={()=>{setIsCreating(false)}} >Cancel </button>
    </div>
     
    )   }
    </div>
  )
}