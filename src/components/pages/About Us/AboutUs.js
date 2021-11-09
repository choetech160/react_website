import React from 'react'
import HomeSection from '../../HomeSection'
import ContactUs from './ContactUs'
import { Data } from './Data'

function AboutUs(props) {
    let AboutUsObj1 = Data['EN']['AboutUsObj1'];
    let AboutUsObj2 = Data['EN']['AboutUsObj2'];
    let AboutTheTeam = Data['EN']['AboutTheTeam'];

    const supported_language = ['EN', 'FR'];
    console.log("About us")
    console.log(props.lang)

    if (supported_language.includes(props.lang)){
        AboutUsObj1 = Data[props.lang]['AboutUsObj1'];
        AboutUsObj2 = Data[props.lang]['AboutUsObj2'];
        AboutTheTeam = Data[props.lang]['AboutTheTeam'];
    }

    return (
        <>
            <HomeSection {...AboutUsObj1} />
            {/* <HomeSection {...AboutUsObj2} /> */}
            <HomeSection {...AboutTheTeam} />
            <ContactUs lang={props.lang}/>
        </>
    )
}

export default AboutUs
