import React from 'react'
import HomeSection from '../../HomeSection'
import { Data } from './Data'

function Services(props) {
    let EmailAliases = Data['EN'];
    let DataAnalytics = Data['EN'];
    let CreditCard = Data['EN'];

    const supported_language = ['EN', 'FR'];
    if (supported_language.includes(props.lang)){
        EmailAliases  = Data[props.lang]['EmailAliases']
        DataAnalytics = Data[props.lang]['DataAnalytics']
        CreditCard = Data[props.lang]['CreditCard']
    }

    console.log("Services : ",EmailAliases )
    return (
        <>
            <HomeSection {...EmailAliases} />
            <HomeSection {...DataAnalytics} />
            <HomeSection {...CreditCard} />
        </>
    )
}

export default Services
