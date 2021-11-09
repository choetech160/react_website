import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSquareFull } from 'react-icons/fa';
import { FaBars, FaTimes, FaCaretDown } from 'react-icons/fa';
import { Button } from '../Button';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
import Dropdown from './Dropdown';
// import {AmplifySignOut} from "@aws-amplify/ui-react";
import Logo from '../logo/logo';
import CitrusLogo from '../logo/citrusLogo';

import { Auth } from 'aws-amplify';

import ReactFlagsSelect from 'react-flags-select';

import {lang_dict} from './NavbarData.js';
import { SignOut } from 'aws-amplify-react';

function Navbar(props) {
    console.log("Navbar props:", props)
    const [lang, setLang] = useState('EN');
    const [countryCode, setCountryCode] = useState('CA');
    console.log(lang," in Navbar")
    let home_link =  false;
    let dashboard_link =  false;
    let services_link =  false;
    let about_us_link =  false;
    let sign_in_link = false;
    let sign_out_link = false;
    const supported_language = ['EN', 'FR'];
    if (supported_language.includes(lang)){
        props.change(lang);
        home_link = lang_dict[lang]['home_link'];
        dashboard_link = lang_dict[lang]['dashboard_link'];
        services_link = lang_dict[lang]['services_link'];
        about_us_link = lang_dict[lang]['about_us_link'];
        sign_in_link = lang_dict[lang]['sign_in_link'];
        sign_out_link = lang_dict[lang]['sign_out_link'];
    }


    const [click, setClick]  = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const [play, setPlay] = useState(false);
    console.warn('user value',props.user)
    const [dropdown, setDropdown] = useState(false);

    const onMouseEnter = () => {
        if(window.innerWidth <= 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    }
    const onMouseLeave = () => {
        if(window.innerWidth <= 960) {
            setDropdown(false)
        } else {
            setDropdown(false);
        }
    }
    const closeMobileMenu = () => {
        setClick(false);
        setPlay(!play)
        
    }
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
            
        } else {
            setButton(true);
        }
    }
    useEffect(() => {
        showButton();
    }, []);
    window.addEventListener('resize', showButton)
    const customSignOut = () => {
        window.location.href = 'https://www.citrusprivacy.com'
        Auth.signOut()

    }

    const setLanguage = (code) => {
        if (code === 'CA'){
            setLang('EN');
        }
        else{
            setLang(code)
        }
        setCountryCode(code)
        
      };
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div style={{color: '#949494', backgroundColor:'#1c2237', display:'flex',justifyContent:'flex-end', alignItems:'center', height:'18px'}}>
                <>
                <ReactFlagsSelect
                    optionsSize={12}
                    countries={["CA", "FR", "DE"]}
                    customLabels={{"CA": "English","FR": "Français","DE": "Deutsch"}}
                    placeholder="Select language"
                    selected={countryCode}
                    onSelect={code=>setLanguage(code)}
                />
 
                {/* <RadioGroup row aria-label="position" name="position" defaultValue="start">
                <FormControlLabel
                    value="top"
                    control={
                        <Radio 
                            color="primary" 
                            size='small' 
                            value="EN" 
                            onChange={e=> setLang(e.target.value)}
                        />
                    }
                    label={<ReactCountryFlag countryCode="CA" />}
                    labelPlacement="start"
                    />
                <FormControlLabel
                    value="top"
                    control={
                        <Radio 
                            color="primary" 
                            size='small' 
                            value="FR" 
                            onChange={e=> setLang(e.target.value)}
                        />
                    }
                    label={<ReactCountryFlag countryCode="FR" />}
                    labelPlacement="start"
                    />
                <FormControlLabel
                    value="top"
                    control={
                        <Radio 
                            color="primary" 
                            size='small' 
                            value="DE" 
                            onChange={e=> setLang(e.target.value)}
                        />
                    }
                    label={<ReactCountryFlag countryCode="DE" />}
                    labelPlacement="start"
                    />
                </RadioGroup> */}
                </>                    
            </div>
           <div className="navbar">
                <div className="navbar-container container">
                    <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                        {/* <FaSquareFull className='navbar-icon'/> */}
                        <CitrusLogo />&nbsp;
                        <Logo play={play}/>
                    </Link>

                    <div className="menu-icon" onClick={handleClick}>
                        {click ? <FaTimes/> : <FaBars/>}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                {home_link}
                            </Link>
                        </li>
                        <li className="nav-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            <Link to='/Services' className="nav-links" onClick={closeMobileMenu}>
                                {services_link} <FaCaretDown className="fas fa-caret-down"/>
                            </Link>
                            {
                                dropdown && <Dropdown lang={lang} />
                            }
                        </li>
                        <li className="nav-item">
                            <Link to='/Dashboard' className="nav-links" onClick={closeMobileMenu}>
                                {dashboard_link}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/AboutUs' className="nav-links" onClick={closeMobileMenu}>
                                {about_us_link}
                            </Link>
                        </li>
                        <li className="nav-btn">
                            {props.user !== 'undefined' ? (  // signed in
                                // <Link to='/sign-up' className="btn-link">
                                
                                // </Link>
                                <Button onClick={() => customSignOut()} buttonStyle='btn--outline' buttonColor='orange'>{sign_out_link}</Button>

                                
                            ):(  // not signed in
                                button ? (
                                    <Link to='/Dashboard' className="btn-link">
                                        <Button buttonStyle='btn--outline'>{sign_in_link}</Button>
                                    </Link>
                                ):(
                                    <Link to='/Dashboard' className="btn-link" onClick={closeMobileMenu}>
                                        <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>
                                            {sign_in_link}
                                        </Button>
                                    </Link>
                                )
                            )}
                        </li>
                    </ul>
                </div>
           </div>
           </IconContext.Provider>
        
        
        </>
    )
}

export default Navbar
