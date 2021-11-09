import React, {useState, useRef, useCallback} from 'react';
// ---------- RADIO BUTTON TO PICK OPTIONS ---------------------------
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { PricingData_lang } from '../../HomePage/PricingData'
// ------------- RADIO BUTTON END -------------------------------------
//  -------------------------------- CREDIT CARD ANIMATION START -----------
// import CForm from '../../CreditCard/CC_Components/form';
// import Card from '../../CreditCard/CC_Components/card';
import '../../CreditCard/CreditCard.scss';
import '../../../HomeSection.css';
import './payment.scss';
import { Button } from '../../../Button';
import { useToasts } from 'react-toast-notifications';
import { Auth } from 'aws-amplify';
import { IconContext } from 'react-icons/lib';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

import {ServiceList_lang} from '../ServiceList';
import Checkbox from '@material-ui/core/Checkbox';
import { loadStripe } from '@stripe/stripe-js';
// ---------------- Subscribe button effect --------------
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
// ---------------- Subscribe button effect --------------

const stripePromise = loadStripe('');
// --------------- AXIOS FOR POST REQUEST TO LAMBDA ------
const axios = require('axios');
// --------------- AXIOS FOR POST REQUEST TO LAMBDA ------


const initialState = {
    cardNumber: '#### #### #### ####',
    cardHolder: 'FULL NAME',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    isCardFlipped: false
};

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
  }));
// const lang = 'EN';

const Payments = (props) => {
    const supported_language = ['EN', 'FR'];
    const [updateEmailButtonLabel, setUpdateEmailButtonLabel] = useState(false);
    let PricingData = PricingData_lang['EN'];
    let ServiceList = ServiceList_lang['EN'];
    console.log("payment lang: ", props.lang)
    
    if (supported_language.includes(props.lang)){
        PricingData = PricingData_lang[props.lang]
        ServiceList = ServiceList_lang[props.lang]
    }

    const classes = useStyles();
    const [subscriptionChoice, setSubscriptionChoice] = useState({
        name: PricingData[0].title,
        priceId: PricingData[0].priceId
    });
    const { addToast } = useToasts();
    console.log("Pricing data format: ",PricingData);

    const [openUpdateUserEmail, setOpenUpdateUserEmail] = useState(false);
    const addChangeHandler = (event) => {
        console.log("CreateChannelChangeHandler : ", event);
        setOpenUpdateUserEmail(event);
    }


    // const [serviceChoice, setServiceChoice] = useState(ServiceList[0].title)
    // // const [formProcess, setFormProcess] = useState(false);
    // const [apiMessage, setApiMessage ] = useState({
    //     message: '',
    //     formProcess: false,
    //     btnMessage: ''
    // });
    //  -------------------------------- CREDIT CARD ANIMATION START -----------
    const [state, setState] = useState(initialState);
    const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

    const [checkBoxState, setCheckBoxState] = useState({
        emailAliasService: false,
        smsService: false,
        VCCService: false,
      });

 
    const updateStateValues = useCallback(
         (keyName, value) => {
             setState({
                 ...state,
                 [keyName]: value || initialState[keyName]
             });
         }, [state]
     );

     let FormFieldsRefObj = {
         cardNumber: useRef(),
         cardHolder: useRef(),
         cardDate: useRef(),
         cardCvv: useRef()
     };

     let focusFormFieldByKey = useCallback((key) => {
        FormFieldsRefObj[key].current.focus();
     });

     let cardElementsRef = {
         cardNumber: useRef(),
         cardHolder: useRef(),
         cardDate: useRef()
     }

     let onCardFormInputFocus = (_event, inputName) => {
         const refByName = cardElementsRef[inputName];
         setCurrentFocusedElm(refByName);
     };

     let onCardInputBlur = useCallback(() => {
         setCurrentFocusedElm(null);
     }, []);

    const handleChange = (event) => {
        console.log("target changed: ",event.target.value)
        let price = null
        for (var key in PricingData) {
            if (PricingData[key].title == event.target.value){
                price = PricingData[key].priceId;
                console.log("Price: ", price);
            }  
        }
        
        setSubscriptionChoice(subscriptionChoice => ({...subscriptionChoice, name: event.target.value, priceId:price}));
    };
    const handleCheckChange = (event) => {
        console.log("checkbox change: ",event);
        setCheckBoxState({ ...checkBoxState, [event.target.name]: event.target.checked });
    }

    const { emailAliasService, smsService } = checkBoxState;
    const error = [emailAliasService, smsService].filter((v) => v).length < 1;

    console.log("Check box status : ", emailAliasService);
    // const handleServiceChoiceChange = (event) => {
    //     console.log("Service choice: ", event.target.value);
    //     setServiceChoice(event.target.value);
    // }
    const [manageBillingMessage, setManageBillingMessage] = useState(<>{'Manage Billing'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>);
    const manageBilling = () => {
        console.log("managing billing");
        setManageBillingMessage(<>{'Manage Billing'}&nbsp;&nbsp;&nbsp;<CircularProgress size={20} className={classes.buttonProgress} /></>)
        // setManageBillingMessage(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CircularProgress size={20} className={classes.buttonProgress} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)
        const stripe = require('stripe')('pk_test_51IqIcIFl7xS7ldB8QJ074Yej2IaZjlWZeqsj7PCDFd7ylyLDw7zV6vCU4TVX43cBJDrjewNwBZLUpzsLNTvmLBbh00J0LW3gaB');
        Auth.currentAuthenticatedUser().then((user) => { // before const user = Auth...
            const token = user.signInUserSession.idToken.jwtToken;
            let config = {
                headers: {'Content-Type': 'application/json',
                'Authorization': token
                },
                // params: {
                //     'action':'delete',
                // }
            }

            axios.get('', config)
            .then((response) => {
                console.log("BillingPortalSession API response: ",response);
                // console.log(response.data.body.Error)
                if(response.data.errorMessage != undefined){
                    console.log('in first thinggy')
                    addToast(response.data.errorMessage, {appearance:'error', autoDismiss: true, autoDismissTimeout:'6000'});
                }
                else if(response.data.body.url != undefined){
                    console.log("API response: ",response.data.body.url);
                    window.location.href = response.data.body.url;
                    return
                }
                else if(response.data.body.Error != undefined){
                    console.log('error status for sure')
                    addToast(response.data.body.Error, {appearance:'error', autoDismiss: true, autoDismissTimeout:'6000'});
                }
                else if(response.data.body.Warning != undefined){
                    console.log('warning state')
                    addToast(response.data.body.Warning, {appearance:'warning', autoDismiss: true, autoDismissTimeout:'6000'});
                }
                else{
                    console.log("API error",error);
                    addToast(error.message, { appearance: 'error' });
                }

            })
        })
    }


    const [SubscribeButtonColor, setSubscribeButtonColor] = useState('primary');
    const [loading, setLoading] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(null)
    // const [success, setSuccess] = useState(false);
    const [SubscribeButtonMessage, setSubscribeButtonMessage] = useState('Subscribe');
    const buyStuff = async() => {
        console.log("buy stuff");
        if(!loading){
            // setSuccess(false);
            setSubscribeButtonMessage(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CircularProgress size={20} className={classes.buttonProgress} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)
            setLoading(true);
            setButtonStatus('disabled')
        }
        const stripe = await stripePromise;
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;


        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            params: {
                'action':'buythings',
                'emailService': {'status':emailAliasService,'priceId':subscriptionChoice.priceId},
                'smsService':{'status':smsService,'priceId': subscriptionChoice.priceId},
            }
        }

        const response = await axios.get('', config);
        console.log("createCheckoutSession API response: ",response);

        setLoading(false);
        // console.log("SessionId: ", response.data.body.sessionId)
        if(response.data.errorMessage != undefined){
            addToast(response.data.errorMessage, { appearance: 'error',autoDismiss: true, autoDismissTimeout:'6000'});
            setButtonStatus('disabledRed');
            // setSubscribeButtonColor('red');
            setSubscribeButtonMessage(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CancelIcon size={20}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>);
        }
        else if(response.data.body.Error != undefined){
            setButtonStatus('disabledRed');
            // setSubscribeButtonColor('red');
            setSubscribeButtonMessage(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CancelIcon size={20}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>);
            // dislpay button red w\ X
            addToast(response.data.body.Error, { appearance: 'error', autoDismiss: true, autoDismissTimeout:'6000'});
        }

        else if (response.data.body.Warning != undefined){
            addToast(response.data.body.Warning, { appearance: 'warning', autoDismiss: true, autoDismissTimeout:'6000'});
            setButtonStatus('disabledRed');
            // setSubscribeButtonColor('red');
            setSubscribeButtonMessage(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CancelIcon size={20}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>);
        }
        else if(response.data.body.sessionId != undefined){ // this is a success  
            setButtonStatus('disabledGreen');
            setSubscribeButtonMessage(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CheckIcon size={20} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)
            
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.body.sessionId,
            });
            if (result.error) {
                console.log('result.error.message')
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer
                // using `result.error.message`
                setButtonStatus('disabledRed');
                // setSubscribeButtonColor('red');
                setSubscribeButtonMessage(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CancelIcon size={20}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>);
                // dislpay button red w\ X
                addToast(result.error.message, { appearance: 'error' });
                // add toast item!
            }
        }
    }
    const updateUserEmail = () => {

    }
    
    return (
        <>
        <div className={true ? 'home__hero-section' : 'home__hero-section darkBg'}
        >
            <div className="container">
                <Button buttonSize='btn--medium' onClick={() => updateUserEmail()}
                buttonColor='red'>{setUpdateEmailButtonLabel(true)}</Button>
            </div>

            <div className="container">
                <Button buttonSize='btn--medium' onClick={() => manageBilling()} buttonColor='red'>{manageBillingMessage}</Button>
            </div>

            <div className="container">
              <h1 style={{color:'black'}}>Select the service you want to subscribe to</h1>
              <FormControl required error={error} component="fieldset" className={classes.formControl}>
              <FormHelperText>You need to select at least 1 item</FormHelperText>
                <div className="row" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>


                    <FormControlLabel style={{color:'black'}}
                    control={<Checkbox checked={emailAliasService} onChange={handleCheckChange} name='emailAliasService' />}
                    label='Email Alias Service'
                    />
                    {emailAliasService ? (
                        <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" value={subscriptionChoice.name} onChange={handleChange}>
                            <IconContext.Provider value={{color: '#fff', size: 64}}>
                                <div className="pricing__section-small" >
                                    <div className="pricing__wrapper-small">
                                        {/* <h1 className="pricing__heading">Pricing</h1> */}
                                        <div className="pricing__container small">
                                            {PricingData.map((item, index) => (
                                                <div className="pricing__container-card-small">
                                                    <div className="pricing__container-cardInfo-small">
                                                        {/* <div className="icon">
                                                            {item.icon}
                                                        </div> */}
                                                        <h3>{item.title}</h3>
                                                        <h4>{item.price}</h4>
                                                        <p>{item.freq}</p>
                                                        <ul className="pricing__container-features-small">
                                                            <li style={{textAlign:'center'}}>{item.li1}</li>
                                                            <li style={{textAlign:'center'}}>{item.li2}</li>
                                                            <li style={{textAlign:'center'}}>{item.li3}</li>
                                                        </ul>
                                                        <FormControlLabel value={item.title} control={<Radio />} label={item.title} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </IconContext.Provider>
                        </RadioGroup>
                    </FormControl>
                    ):(
                        ''
                    )}
                    </div>
                    </FormControl>
                
            </div>

            <div className="container">
                <Button buttonSize='btn--medium' onClick={() => buyStuff()} buttonStatus={buttonStatus} buttonColor={SubscribeButtonColor}>{SubscribeButtonMessage}</Button>
                {/* {loading && <CircularProgress size={24} className={classes.buttonProgress} />} */}
            </div>

        </div>
        {/* <UpdateUserEmail change={addChangeHandler} status={openUpdateUserEmail}/> */}
        </>
    )
}

export default Payments