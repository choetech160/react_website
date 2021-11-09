import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));



function FAQSection(data) {
    const classes = useStyles();
    console.log("FAQ SECTION : ", data.data)
    // console.log(data['rows'])
    return (
        <>
            <div className={true ? 'home__hero-section' : 'home__hero-section darkBg'}
            >
                <div className="container">
                <div className="top-line">{data.data.title}</div>
                <h1 className={false ? 'heading' : 'heading dark'}>{data.data.title}</h1>
                    {data.data.rows.map((item, index) => (
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

export default FAQSection
