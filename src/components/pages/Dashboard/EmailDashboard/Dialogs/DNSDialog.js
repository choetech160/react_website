import React, {useEffect, useState} from 'react';
import '../../../../HomeSection.css';

// Table formating end
import { useToasts } from 'react-toast-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';

import {Auth} from 'aws-amplify';
import { Button } from '../../../../Button';
import { Form, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const axios = require('axios');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DNSDialog(props) {
    const [dialogStatus, setDialogStatus] = useState(props.status);
    const [dnsFieldValue, setDnsFieldValue] = useState(false);
    const [dnsFieldAssociatedUsername, setDnsFieldAssociatedUsername] = useState(false);
    const [inProgressItem, setInProgressItem] = useState(false);
    const { addToast } = useToasts();
    useEffect(() => {
        setDialogStatus(props.status)
      },[props.status])

    const handleDialogClose = () => {
        setDialogStatus(false);
        props.change(false);
        setInProgressItem(false);
    }
    const handleDialogAccept = (e) => {
        e.stopPropagation();
        console.log('ACCEPT')
        const newArray = props.usersField;
        const field = 'dns';
        let onceFlag = false;
        setInProgressItem(true)
        Object.entries(props.usersField.dns).map(([innerKey, innerValue])=> {
            console.log(innerValue);
            console.log(onceFlag);
            if(!onceFlag && innerValue.value === 'none'){
                console.log("We are in!")
                newArray[field][innerKey]['value'] = dnsFieldValue;
                newArray[field][innerKey]['associated_username'] = dnsFieldAssociatedUsername;
                onceFlag = true;
                
                console.log("New Array value : ", newArray)
                Auth.currentAuthenticatedUser().then((user) => {
                    let config = {
                        headers: {'Content-Type': 'application/json',
                                'Authorization': user.signInUserSession.idToken.jwtToken
                        }
                    }

                    let params = {
                        'field': field,
                        'action': 'Add',
                        'item': {'value':dnsFieldValue, 'associated_username':dnsFieldAssociatedUsername}
                    }

                    axios.put('https://1oj15qwsf6.execute-api.ca-central-1.amazonaws.com/dev/email-alias/username-dns', params, config)
                    .then((response) => {
                        console.log("API response [handleUsersFieldAction]: ",response);
                        console.log(response.data.body.Success);
                        if (response.data.body.Success != undefined){
                            addToast(response.data.body.Success, { appearance: 'success', autoDismiss: true });
                            console.log("Updating hook ", newArray)
                            // props.changeArray(newArray);
                            setInProgressItem(false);
                            setDialogStatus(false);
                            props.change(false);
                        }
                        else if (response.data.body.Error != undefined){
                            addToast(response.data.body.Error, {appearance:'error', autoDismiss:true});
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
    const [error, setError] = useState({value: false, itemID: false});
    const formatEmailInput = (input) => {
        for(var i=0; i<props.usersField.username.length; i++) {
            if (props.usersField.username[i].value === input){
                setError(error => ({...error, value: false, itemID:false}));
                break;
            }
            else if (input == ""){
                setError(error => ({...error, value: false, itemID:false}));
            }
            else{
                setError(error => ({...error, value: 'Username input here must match one of your current usernames!'}));
            }
            setDnsFieldAssociatedUsername(input)
        }
    }

    return (
        <Dialog 
            open={dialogStatus} 
            onClose={handleDialogClose} 
            aria-labelledby="form-dialog-title" 
            maxWidth="sm" 
            fullWidth={true} 
            TransitionComponent={Transition}
        >
        <DialogTitle id="form-dialog-title">Additional DNS</DialogTitle>
        <DialogContent> 
        <Form.Group widths='equal'>
            <Form.Input
                iconPosition='right'
                icon={<Icon name='at' />}
                fluid
                label={props.add_custom_dns_label}
                placeholder='Add your own DNS'
                color='red'
                onChange={e => setDnsFieldValue(e.target.value)}
            />
            {/* {error.value ? (
            <Form.Input
                iconPosition='right'
                fluid
                label={props.link_username_label}
                placeholder={props.link_username_placeholder}
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
                placeholder='optional'
                // id={item.id}
                color='red'
                onChange={e => formatEmailInput(e.target.value)}
            />
            )} */}
        </Form.Group>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
            Cancel
            </Button>
            {error.value ? (
            <Button buttonColor='green' buttonStatus='disabled'>
                Add new domain name
            </Button>
            ):(
            inProgressItem ? (
                <Button buttonColor='green'>
                    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<CircularProgress size={20} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                </Button>
                ):(
                <Button onClick={(e) => handleDialogAccept(e)} buttonColor='green'>
                    Add new domain name
                </Button>
                )
            )}
        </DialogActions>
        </Dialog>
    )
}

export default DNSDialog