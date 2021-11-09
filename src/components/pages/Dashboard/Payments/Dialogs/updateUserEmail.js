import React, {useEffect, useState, useRef} from 'react';
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

function UpdateUserEmail(props) {
    const [dialogStatus, setDialogStatus] = useState(props.status);
    const [inProgressItem, setInProgressItem] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState('');

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
        Auth.currentAuthenticatedUser().then((user) => { 
            const token = user.signInUserSession.idToken.jwtToken;
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
            let params = {
                'updatedEmail': updatedEmail,
            }
            axios.post('https://1oj15qwsf6.execute-api.ca-central-1.amazonaws.com/dev/global-information', params, config)
            .then((response) => {
                console.log("UpdateUserEmail API response", response)
            })
            .catch((error) => {
                console.error("UpdateUserEmail API error : ",error)
                addToast(error, { appearance: 'error', autoDismiss: true });
            })
            
        })
    
    }

    return(
        <Dialog
            open={dialogStatus}
            onClose={handleDialogClose}
            aria-labelledby="form-dialog-title" 
            maxWidth="sm" 
            fullWidth={true} 
            TransitionComponent={Transition}
        >
            <DialogTitle id="form-dialog-title">Update your email address</DialogTitle>
            <DialogContent>
                <Form.Group widths = 'equals'>
                    <Form.Input
                        iconPosition='right'
                        icon={<Icon name='at' />}
                        fluid
                        label={}
                        placeholder='john.dow@email.com'
                        color='red'
                        onChange={e => setUpdatedEmail(e.target.value)}
                    />
                </Form.Group>
            </DialogContent>
            <DialogActions>
                {/* add cancel and update button */}
            </DialogActions>
        </Dialog>
    )
}

export default UpdateUserEmail