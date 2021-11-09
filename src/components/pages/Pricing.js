import React from 'react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import './Pricing.css';

function Pricing(PricingData) {
    return (
        <IconContext.Provider value={{color: '#fff', size: 64}}>
        <div>
            <div className="pricing__section">
                <div className="pricing__wrapper">
                    <h1 className="pricing__heading">Email aliases prices</h1>
                    <div className="pricing__container">

                    {Object.keys(PricingData).map((key, index) => (
                        <Link to="/Dashboard" className='pricing__container-card'>
                        <div className="pricing__container-cardInfo">
                            <div className="icon">
                                {PricingData[key].icon}
                            </div>
                            <h3>{PricingData[key].title}</h3>
                            <h4>{PricingData[key].price}</h4>
                            <p>{PricingData[key].freq}</p>
                            <ul className="pricing__container-features">
                                <li>{PricingData[key].li1}</li>
                                <li>{PricingData[key].li2}</li>
                                <li>{PricingData[key].li3}</li>
                            </ul>
                            <Button buttonSize='btn-wide' buttonColor='blue'>
                                {PricingData[key].buttontitle}
                            </Button>
                        </div>
                    </Link>
                    ))}
                    </div>
                </div>
            </div>
        </div>
        </IconContext.Provider>
    )
}

export default Pricing
