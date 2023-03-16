import React from 'react';
import Button from './Button';


const ButtonList = () => {

    const list = ["All","Gaming","Songs","Cricket","News","Cooking"]
    return (
        <div className='flex'>
           { list.map((item) => 
              
              (<Button key={item} name={item} />)
              
            ) }
            </div>
        
    );
}
 
export default ButtonList;