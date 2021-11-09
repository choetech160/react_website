import React, {useEffect, useState, useRef} from 'react';
import '../../../../HomeSection.css';

import { useToasts } from 'react-toast-notifications';

// Table formating end
import CircularProgress from '@material-ui/core/CircularProgress';

import { Button } from '../../../../Button';
import { Form, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Auth} from 'aws-amplify';

const axios = require('axios');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function UsernameDialog(props) {
    const [usernameFieldValue, setUsernameFieldValue] = useState(false);
    const [UsernameFieldAssociatedEmail, setUsernameFieldAssociatedEmail] = useState(false);
    const [inProgressItem, setInProgressItem] = useState(false);
    const { addToast } = useToasts();
    const [error, setError] = useState({value: false, itemID: false});
    const [dialogStatus, setDialogStatus] = useState(props.status);
    useEffect(() => {
        setDialogStatus(props.status)
      },[props.status])

    const handleDialogClose = () => {
        setDialogStatus(false);
        props.change(false);
    }

    const handleDialogAccept = (e) => {
        e.preventDefault();
        e.stopPropagation(); // the semantic ui is being called twice. Either because the submit button is inside the form group or some error API side (there are kind of lot on this regards)
        console.log('ACCEPT')
        const newArray = props.usersField;
        const field = 'username';
        let onceFlag = false;
        setInProgressItem(true);
        Object.entries(props.usersField.username).map(([innerKey, innerValue]) => {
            if(!onceFlag && innerValue.value === 'none'){
                onceFlag = true;
                console.log("Adding new username");
                newArray[field][innerKey]['value'] = usernameFieldValue;
                newArray[field][innerKey]['associated_email'] = UsernameFieldAssociatedEmail;
                
                Auth.currentAuthenticatedUser().then((user) => {
                    let config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': user.signInUserSession.idToken.jwtToken
                        }
                    }
                    let params = {
                        'field': field,
                        'action': 'Add',
                        'item': {'value':usernameFieldValue, 'associated_email':UsernameFieldAssociatedEmail}
                    }
                    console.log("transmitting : ", config, params)
                    axios.put('https://1oj15qwsf6.execute-api.ca-central-1.amazonaws.com/dev/email-alias/username-dns', params, config)
                    .then((response) => {
                        console.log("API response [handleUsersFieldAction]: ",response);
                        console.log(response.data.body.Success);
                        if (response.data.body.Success != undefined){
                            addToast(response.data.body.Success, { appearance: 'success', autoDismiss: true });
                            console.log("Updating hook ", newArray)
                            // setUsersField(newArray);
                            setInProgressItem(false);
                            setDialogStatus(false);
                            props.change(false);
                        }
                        else if( response.data.body.Error != undefined){
                            addToast(response.data.body.Error, { appearance: 'error', autoDismiss: true });
                            console.log("Updating hook ", newArray)
                            // setUsersField(newArray);
                            setInProgressItem(false);
                            setDialogStatus(false);
                            props.change(false);
                        }
                        
                    })
                    .catch((error) => {
                        console.log("API error",error);
                        addToast(error, { appearance: 'error', autoDismiss: true });
                    })
                })

            }
        })
    }

    const formatEmailInput = (input) => {
        if (input == ""){
            setError(error => ({...error, value: false, itemID:false}));
        }
        else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input)){
            // this is an error
            console.log("ERROR")

            setError(error => ({...error, value: "Email format is wrong!", itemID:input}));
            console.log(error);
        }
        else{
            setError(error => ({...error, value: false, itemID:false}));
        }
        setUsernameFieldAssociatedEmail(input);

    }

    return (
        <Dialog open={dialogStatus} onClose={handleDialogClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true} TransitionComponent={Transition}>
            <DialogTitle id="form-dialog-title">Additional username</DialogTitle>
            <DialogContent>
                <>
                <Form.Group widths='equal'>
                <Form.Input
                    iconPosition='left'
                    icon={<Icon name='at' />}
                    fluid
                    label={props.add_username_label}
                    labelcolor='white'
                    placeholder='Add username'
                    color='red'
                    onChange={e => setUsernameFieldValue(e.target.value)}
                    
                />
                {/* {error.value ? (
                <Form.Input
                    iconPosition='left'
                    fluid
                    label={props.link_email_addr_label}
                    labelColor='white'
                    placeholder='associated email : optional'
                    color='red'
                    error={{ content: error.value}}
                    onChange={e => formatEmailInput(e.target.value)}
                />
                ):(
                <Form.Input
                    iconPosition='left'
                    fluid
                    label={props.link_email_addr_label}
                    labelColor='white'
                    placeholder='associated email : optional'
                    color='red'
                    onChange={e => formatEmailInput(e.target.value)}
                />
                )} */}
                </Form.Group>           
                </>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
                Cancel
            </Button>
            {error.value ? (
                <Button
                    buttonColor='green' buttonStatus='disabled'>
                    Add new username
                </Button>
            ):(
                inProgressItem ? (
                    <Button 
                        buttonColor='green'>
                        <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CircularProgress size={20} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                    </Button>
                ):(
                    <Button 
                    onClick={(e) => handleDialogAccept(e)}
                    buttonColor='green'>
                        Add new username
                    </Button>
                )

            )}
            
            </DialogActions>
        </Dialog>
    )
}

export default UsernameDialog
