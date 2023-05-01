import { createClient as createClientManagement } from 'contentful-management';

export const getEnvironment=async()=>{
    const client = createClientManagement({
        accessToken: 'CFPAT-4ctuJ6cD3f8KkcsaBYzHvdCsbcxaJNWBx8d20-BjpLQ',
    });
    const space = await client.getSpace( 'uhskaveuyuo5');
    const env=await space.getEnvironment('master');
    return env;
}

export const createEntry=async(contentType_id,fields,successfullyCallBack)=>{
    const env = await getEnvironment();
    try{
        const entry = await env.createEntry(contentType_id, {fields});
        await entry.publish();
    successfullyCallBack();
  }catch(error){
    console.log(error)
  }
}

export const updateEntry=async(entry_Id,fields,successfullyCallBack)=>{
    const env = await getEnvironment();
    try{
        const entry = await env.getEntry(entry_Id);
        entry.fields=fields;
        const updatedEntry =await entry.update();
        const publishedEntry = await updatedEntry.publish();

        console.log(`Updated and published entry with ID: ${publishedEntry.sys.id}`);
        successfullyCallBack();
  }catch(error){
    console.error(error)
  }
}

export const deleteEntry=async(entry_id,successfullyCallBack)=>{
    const env = await getEnvironment();
    const entry = await env.getEntry(entry_id);
    try{
        await entry.unpublish();
    await entry.delete();
    successfullyCallBack();
  }catch(error){
    console.error(error)
  }
}