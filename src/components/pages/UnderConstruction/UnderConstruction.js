import React from 'react'
import '../../HomeSection.css';
import {data} from './Data';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function UnderConstruction(props) {
    const supported_language = ['EN', 'FR'];
    let data_lang = data['EN'];
    if (supported_language.includes(props.lang)){
        data_lang = data[props.lang]
    }
    return (
    <div className={'home__hero-section darkBg'}
    >
        <div className="container" style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Grid container spacing={2}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
                <h1 className={true ? 'heading' : 'heading dark'}>{data_lang.title}</h1>
            </Grid>
            <Grid item xs={12} style={{textAlign: 'center'}}>
                <div className="top-line">{data_lang.subtitle}</div>
            </Grid>
            <Grid item xs={12} style={{textAlign: 'center'}}>
                <img src='images/website-construction-isometric-landing-page.png' />
            </Grid>


        </Grid>
        </div>
    </div>      
    )
}

export default UnderConstruction
