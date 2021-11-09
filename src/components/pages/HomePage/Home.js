import React from 'react'
import HomeSection from '../../HomeSection'
import Pricing from '../Pricing'
import { langData } from './Data'
import { PricingData_lang } from './PricingData'
function Home(props) {

    const supported_language = ['EN', 'FR'];
    let homeObjOne = false;
    let homeObjTwo = false;
    let homeObjThree = false;
    let homeObjFour = false;
    let PricingData = false
    console.log("PRICING: ", PricingData_lang)
    if (supported_language.includes(props.lang)){
        homeObjOne = langData[props.lang]['homeObjOne'];
        homeObjTwo = langData[props.lang]['homeObjTwo'];
        homeObjThree = langData[props.lang]['homeObjThree'];
        homeObjFour = langData[props.lang]['homeObjFour'];
        PricingData = PricingData_lang[props.lang];
    }



    return (
        <>
            <HomeSection {...homeObjOne} />
            <HomeSection {...homeObjThree} />
            <HomeSection {...homeObjTwo} />
            <Pricing {...PricingData} />
            <HomeSection {...homeObjFour} />
        </>
    )
}

export default Home
