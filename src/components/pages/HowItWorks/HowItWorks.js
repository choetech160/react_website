import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {lang_obj} from './Data';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


function HowItWorks(props) {
    const supported_language = ['EN', 'FR']
    let data_lang = lang_obj['EN'];
    if (supported_language.includes(props.lang)){
        data_lang = lang_obj[props.lang];
    }
    const classes = useStyles();
    return (
        <>
            <div className={true ? 'home__hero-section' : 'home__hero-section darkBg'}
            >
                <div className="container">
                {/* <div className="top-line">{data_lang.title}</div> */}
                <h1 className={false ? 'heading' : 'heading dark'}>{data_lang.title}</h1>
                    {data_lang.rows.map((item, index) => (
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography className={classes.heading}>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {item.content}
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HowItWorks
