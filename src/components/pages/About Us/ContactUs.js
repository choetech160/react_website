import React, {useState, useRef} from 'react';
import '../../HomeSection.css';
import { Data } from './Data';
import { Button } from '../../Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { useToasts } from 'react-toast-notifications';
import ReCAPTCHA from 'react-google-recaptcha';


//  1 - make sure button is clickable only when recaptcha and all fields are
//  filled
//  2 - Verify that email and name are in the form (required) and that email has
//  the appropriate format
function ContactUs(props) {

    const { addToast } = useToasts();

    const formId = '';
    const recaptchaKey = '';
    const recaptchaRef = useRef();
    const [formFieldStatus, setFormFieldStatus] = useState({name:false, email:false});
    const formSparkUrl = `https://submit-form.com/${formId}`;
    const [formState, setFormState] = useState({
        email: '',
        name: '',
        message: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');
    // https://www.google.com/recaptcha/admin/site/472177043/setup

    let Title = false;
    let Contact_sentence = false;
    let Contact_address = false;
    let Contact_name = false;
    let Contact_email = false;
    let Contact_message = false;
    let SubmittingLabel = false;
    let SubmitLabel = false;
    const supported_language = ['EN', 'FR'];
    if (supported_language.includes(props.lang)){
        Title = Data[props.lang]['Title'];
        Contact_sentence = Data[props.lang]['Contact_sentence'];
        Contact_address = Data[props.lang]['Contact_address'];
        Contact_name = Data[props.lang]['Contact_name'];
        Contact_email = Data[props.lang]['Contact_email'];
        Contact_message = Data[props.lang]['Contact_message'];
        SubmittingLabel = Data[props.lang]['Submitting_message'];
        SubmitLabel = Data[props.lang]['Submit_message'];
    }

    const submitForm = async (event) => {
        event.preventDefault();
        setSubmitting('disabled');
        await postSubmission();
        setSubmitting(false);
    };
    const postSubmission = async() => {
        const payload = {
            ...formState,
            "g-recaptcha-response": recaptchaToken
        };

        axios.post(formSparkUrl, payload)
        .then((result) => {
            console.log(`Form result -> ${result}`)
            // setMessage  actually set toast
            addToast('Thanks, someone will be in touch shortly', { appearance: 'success', autoDismiss: true });
            // reset form and recaptcha
            setFormState({
                email: '',
                name: '',
                message: '',
            })
            recaptchaRef.current.reset();
        })
        .catch((error) => {
            console.warn(`Form submission error: -> ${error}`)
            addToast('mmm, there was a problem. Please try again', {appearance:'error', autoDismiss:true});
        })
    }

    const updateFormControl = (event) => {
        const {id, value} = event.target;
        const formKey = id;
        const updatedFormState = {...formState};
        updatedFormState[formKey] = value;
        setFormState(updatedFormState)

        if (formKey === 'email'){
            console.log(`Checking email field : ${value}`);
            //  check email format, at least @ is there

            // allow button
            const updatedFormFieldStatus = {...formFieldStatus};
            if (value.length < 1){
                updatedFormFieldStatus[formKey] = false;
            }
            else{
                updatedFormFieldStatus[formKey] = true;
            }
            setFormFieldStatus(updatedFormFieldStatus);
        }
        if (formKey === 'name'){
            console.log(`Check name field : ${value} length: ${value.length}`);
            // check that name is present
            // allow button
            const updatedFormFieldStatus = {...formFieldStatus};
            if (value.length < 1){
                updatedFormFieldStatus[formKey] = false;
            }
            else{
                updatedFormFieldStatus[formKey] = true;
            }
            setFormFieldStatus(updatedFormFieldStatus);
        }
    }

    const updateRecaptchaToken = (token) => {
        setRecaptchaToken(token);
    };

    return (
        <div className="container" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{width:'50%'}}>
                <h1>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        // className="h-2 w-2" 
                        style={{height:30, transform:'rotate(45deg)'}}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span>Contact us</span>
                </h1>
                <form onSubmit={submitForm}>
                    <div className='row' style={{marginTop:'10px', marginBottom:'10px'}}>
                        <TextField
                            onChange={updateFormControl}
                            id="name" 
                            label={Contact_name}
                            value={formState.name}
                            type="search" 
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                    <div className='row' style={{marginTop:'10px', marginBottom:'10px'}}>
                        <TextField
                            onChange={updateFormControl}
                            id="email" 
                            label={Contact_email}
                            value={formState.email}
                            type="search" 
                            variant="outlined" 
                            fullWidth
                            required

                        />
                    </div>
                    <div className='row' style={{marginTop:'10px', marginBottom:'10px'}}>
                        <TextField
                            onChange={updateFormControl}
                            id="message"
                            label={Contact_message}
                            value={formState.message}
                            multiline
                            rows={4}
                            // defaultValue="Default Value"
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptchaKey}
                        onChange={updateRecaptchaToken}
                    />

                    <div className='row' style={{marginTop:'10px', marginBottom:'10px'}}>
                        {formFieldStatus['name'] && formFieldStatus['email'] && recaptchaToken !== '' ? (
                        <Button style={{width:'100%'}} buttonColor='green' buttonWidth='large'>
                            {submitting ? {SubmittingLabel} : {SubmitLabel}}
                        </Button>
                        ):(
                        <Button style={{width:'100%'}} buttonWidth='large' buttonStatus='disabledGreen'>
                            {submitting ? {SubmittingLabel} : {SubmitLabel}}
                        </Button>
                        )}
                    </div>
                </form>
            </div>
        </div> 
    )
}

export default ContactUs
