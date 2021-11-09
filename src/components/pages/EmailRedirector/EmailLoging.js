import React, {useState} from 'react';
import Form from '../../Form/Form';
import '../../Form/Form.css';

import { EmailObjOne } from './Data';

function EmailLoging() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <>
            <HomeSection {...EmailObjOne} />
            
            {/* add domains */}
            <div className="form-container">
                <div className="close-btn">x</div>
                <div className="form-content-left">
                    <img src="img/img-2.svg" alt="spaceship" className="form-img"/>
                </div>
                {!isSubmitted ? (<Form submitForm={submitForm}/>) : null}

            </div>
            {/*  change account type */}

        </>
    )
}

export default EmailLoging
