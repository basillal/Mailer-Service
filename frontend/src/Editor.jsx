import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

export const Editor = ({contentData,updateTemplate}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(contentData  ? contentData : '');



  return (
    <>
    <div style={{width:'1500px',position:'relative',left:'300px'}}>
       <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      <div className='Update'>
      <button  onClick={() => updateTemplate(content)}>Update</button>
      </div>
      
    </div>
     
    </>
  );
};
