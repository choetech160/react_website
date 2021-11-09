import React from 'react'
import Pricing from '../Pricing';
import HomeSection from '../../HomeSection'
import { lang_obj } from './Data';
import {PricingData_lang} from '../HomePage/PricingData';
function EmailRedirector(props) {
    const supported_language = ['EN', 'FR'];
    let EmailObj1 = false;
    let EmailObj2 = false;
    let EmailObj3 = false;
    let EmailObj4 = false;
    let EmailObj5 = false;
    let PricingData = false

    if (supported_language.includes(props.lang)){
        EmailObj1 = lang_obj[props.lang]['EmailObj1'];
        EmailObj2 = lang_obj[props.lang]['EmailObj2'];
        EmailObj3 = lang_obj[props.lang]['EmailObj3'];
        EmailObj4 = lang_obj[props.lang]['EmailObj4'];
        EmailObj5 = lang_obj[props.lang]['EmailObj5'];
        PricingData = PricingData_lang[props.lang];
    }
    console.warn('pricing: ', PricingData)

    return (
        <>
            <HomeSection {...EmailObj1} />
            <HomeSection {...EmailObj2} />
            <Pricing {...PricingData}/>
            <HomeSection {...EmailObj3} />
            <HomeSection {...EmailObj4} />
            <HomeSection {...EmailObj5} />
        </>
    )
}

export default EmailRedirector
