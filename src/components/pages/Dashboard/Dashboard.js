import React, {useEffect, useState} from 'react';
import {withAuthenticator} from 'aws-amplify-react';
import { AmplifyTheme } from "aws-amplify-react";
// import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Fab from "@material-ui/core/Fab";
import {
    BrowserRouter as Router,
    useRouteMatch,
    useLocation,
    // useHistory
  } from "react-router-dom";


import {Button} from '../../Button';

import Typography from '@material-ui/core/Typography';
import '../../HomeSection.css'
// card stuff
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { SemipolarLoading } from 'react-loadingg';

import {Auth} from 'aws-amplify';
import {ServiceList_lang} from './ServiceList';
import {Month} from './Month';

// import { Hub } from "aws-amplify";

const axios = require('axios');

const authTheme = {
    ...AmplifyTheme,
    sectionHeader:{
      ...AmplifyTheme.sectionHeader,
      color:'#000',
      backgroundColor: '#fff',
      fontSize: '18px',
      border: '0px solid #C4C4C4',
    //   fontFamily: `"PT Sans", sans-serif`,
      fontFamily: `"Amazon Ember", Arial`,
    },
    formSection: {
      ...AmplifyTheme.formSection,
      color: '#000',
      backgroundColor: '#fff',
      color: '#fff',
      fontSize: '16px',
      border: '0px solid #C4C4C4',
    },
    input: {
        ...AmplifyTheme.input,
        color: '#595959',
        fontSize: '16px',
        border: '0px solid #C4C4C4',
    },
    sectionFooter: {
      ...AmplifyTheme.sectionFooter,
      color: '#000',
      backgroundColor: '#fff',
      fontSize: '18px',
      border: '0px solid #C4C4C4',
    },
    button: {
        ...AmplifyTheme.button,
        width: '80%',
        height: '50px',
        marginTop: '10px',
        borderRadius: '2px',
        background: '#276afb',//"linear-gradient(90deg,rgb(39, 176, 255) 0%,rgb(0, 232, 236) 100%)",
        outline: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '18px',
        width: '100%'
    }
  }

const useStyles = makeStyles((them) => ({
    CardStyle: {
        width: 400,
        height: 325
    },
    media2: {
        height: 140,
    },
    GridStyle: {
        flexGrow: 1,
    },
    control: {
        padding: them.spacing(2),
    }
}));

// card stuff ending
function Dashboard(props) { 
    const supported_language = ['EN', 'FR'];
    let monthNames = false;
    let ServiceList = false;
    if (supported_language.includes(props.lang)){
        monthNames = Month[props.lang]
        ServiceList = ServiceList_lang[props.lang]
    }
    console.log("Dashboard props: ", props)
    const classes = useStyles();
    const [spacing, setSpacing] = useState(4);
    const [authenticated, setAuthenticated] = useState(false);
    const [ServiceList_copy, setServiceList] = useState();
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    let { path, url } = useRouteMatch(); 
    console.log("Curent path : ", path," and url: ", url, "current Path : ", currentPath);
    useEffect(()=>{
        // call username api data to verify which services are active for
        // given user

        
        Auth.currentAuthenticatedUser().then((user) => {
            const token = user.signInUserSession.idToken.jwtToken;
            console.log(token)
            let config = {
                headers: {'Content-Type': 'application/json',
                'Authorization': token
                },
            }
            axios.get('', config)
            .then((response) => {
                let newArray = ServiceList;
                console.log("API sourceLIst: ",response);

                if (response.data.body.Success.Email_subscription_type){
                    if (response.data.body.Success.Email_subscription_type === 'false'){
                        newArray[0].haveService = false; // In servicesList, first item [0] is the email service
                    }
                    else{
                        newArray[0].haveService = true; // In servicesList, first item [0] is the email service
                    }

                    newArray[0].planName = response.data.body.Success.Email_subscription_type
                    
                    if (response.data.body.Success.Email_subscription_end){
                        console.log("Subcription ends on: ", response.data.body.Success.Email_subscription_end);
                        const date = new Date(response.data.body.Success.Email_subscription_end * 1000);
                        const datevalues = [
                            date.getFullYear(),
                            date.getMonth()+1,
                            date.getDate(),
                            date.getHours(),
                            date.getMinutes(),
                            date.getSeconds(),
                         ];
                        console.log("Finale date values: ", datevalues);
                        console.log("String date: ",monthNames[datevalues[1]], " ",datevalues[2]," ",datevalues[0]," at ",datevalues[3],":",datevalues[4])
                        newArray[0].hasServiceText =  String(monthNames[datevalues[1]]+" "+String(datevalues[2])+" "+String(datevalues[0])) 
                        // +" at "+String(datevalues[3])+":"+datevalues[4]); // In servicesList, first item [0] is the email service
                        // march 10th 2022
                    }
                }
                console.log("SMS : ", response.data.body.Success.SMS_subscription_type)
                if (response.data.body.Success.Email_subscription_type){
                    if (response.data.body.Success.SMS_subscription_type === 'false'){
                        newArray[1].haveService = false; // In servicesList, first item [0] is the email service
                    }
                    else{
                        newArray[1].haveService = true
                    }

                    newArray[1].planName = response.data.body.Success.SMS_subscription_type;
                }

                console.log(newArray);
                setServiceList(newArray);

            })
            .catch((error) => {
                console.log("API error",error);
            })
        })
    },[]);

    const handleClick = (hprop) => {
        console.log("Click! => ",hprop);
        props.changePath(hprop);

    }

    return (
        <>
        <div className="container">
        <Grid container className={classes.GridStyle} spacing={6}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {typeof ServiceList_copy === 'undefined'? (
                        <SemipolarLoading 
                        color='#fcba03'/>
                    ):(
                    ServiceList_copy.map((item, index) => (
                        <Grid key={index} item> <br />
                            <Card className={classes.CardStyle} >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media2}
                                        image={item.imagePath}
                                        title={item.imageTitle}
                                        style={{display:'flex', width: '60%', alignItems:'center', justifyContent:'center'}}
                                        />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.title}
                                        </Typography>
                            
                                        {item.haveService ? (
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.nextPaymentOn} {item.hasServiceText}
                                            </Typography>
                                        ):(
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.noServiceText}
                                            </Typography>
                                            
                                        )}
                                    </CardContent>
                                    <CardActionArea>
                                        <CardActions>
                                        { (item.haveService) ? (
                                            <div className='row'>
                                                <div className="col">
                                                {/* <NavLink to={`${url}${item.detailPath}`}> */}
                                                <Button buttonSize='btn--small' buttonColor='primary' onClick={()=>handleClick(`${url}${item.detailPath}`)}>{item.buttonViewDetails} 
                                                </Button>
                                                {/* </NavLink> */}
                                                
                                            </div>
                                            {item.id === 3 ? '':(
                                                <div className="col" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                                <Fab style={{
                                                    color:'#639941',backgroundColor: 'rgba(153,216,114,255)'
                                                }}
                                                    variant="extended"
                                                    size="medium"
                                                    aria-label="add"
                                                    className={classes.margin}
                                                    >active : {item.planName} plan
                                                </Fab>
                                            </div>
                                            )}
                                            </div>
                                        ):
                                            // <NavLink to={`${url}${item.buttonLearnMorePath}`}>
                                                <Button buttonSize='btn--small' buttonColor='blue'
                                                onClick={()=>handleClick(`${item.buttonLearnMorePath}`)}
                                                >
                                            {item.buttonLearnMore}
                                            </Button>
                                            // </NavLink>
                                        }
                                        </CardActions>
                                    </CardActionArea>
                                </CardActionArea>
                            </Card> <br />
                        </Grid>
                    )))
                    }
                </Grid>
            </Grid>
        </Grid>
        </div>
        </>

    )
}
export default withAuthenticator(Dashboard, { theme: authTheme });
