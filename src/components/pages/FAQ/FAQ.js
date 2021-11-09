import React from 'react';

import {data} from './data';
import FAQSection from './FAQSection';

  
function FAQ(props) {
    
    const supported_language = ['EN', 'FR'];
    console.log("FAQ : ", props);
    console.log(data);
    let data_lang = data['EN']
    if (supported_language.includes(props.lang)){
        data_lang = data[props.lang]
        // console.log("sup lang: ", supported_language)
    }
  

    return (
        <div>
            <FAQSection data={data_lang} />
        </div>
    )
}

export default FAQ
