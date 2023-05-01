import React from 'react'
import { createClient } from 'contentful-management';

export default function create() {
  
  
  const handleOnCreateSpace=async()=>{
    
 

      const client = createClient({
        accessToken: 'CFPAT-4ctuJ6cD3f8KkcsaBYzHvdCsbcxaJNWBx8d20-BjpLQ',
    });
    const space = await client.getSpace('uhskaveuyuo5');
    const env=await space.getEnvironment('master')
    const name='carbrand';
    const description='car brand information';
    const fields = [
        {
          id: 'title',
          name: 'title',
          type: 'Text',
          required: true,
        },
        {
            id: 'country',
            name: 'country',
            type: 'Text',
            required: true,
          },
        {
          id: 'desc',
          name: 'desc',
          type: 'Text',
          required: true,
        },
        {
            id: 'rating',
            name: 'rating',
            type: 'Text',
            required: true,
        }
      ];
    const contentType = await env.createContentType({ 
      name,
      description,
      fields
    });
    await contentType.publish();
    
    const contentTypeId= contentType?.sys?.id
    console.log('Created content type:', contentType,contentTypeId);
    

    const fields2 = {
        title: {
            'en-US': 'honda'
          },
          country: {
            'en-US': 'Japan'
          },
        desc: {
            'en-US': 'A kind of Japanese Brand'
          },
        rating: {
            'en-US': '5 stars'
          },
      };
      
    const entry = await env.createEntry(contentTypeId, { fields:fields2 });
    await entry.publish();
    
    console.log('entry',entry)

  }

  return (
    <button className='button' onClick={handleOnCreateSpace}>Click to create</button>
  )
}
