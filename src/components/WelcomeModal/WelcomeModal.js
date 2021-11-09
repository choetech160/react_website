import React, { useState, useEffect } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import {Button} from '../Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function WelcomeModal(props) {
    const [modalState, setModalState] = useState(props.status);

    useEffect(() => {
        setModalState(props.status)
    }, [props.status])

    const handleDialogClose = () => {
        setModalState(false);
    }
    const handleDialogCancel = () => {
        setModalState(false);
        props.change(false);
        window.location.replace('https://www.eff.org/');
    }
    const handleDialogAccept = () => {
        setModalState(false);
        props.change(false);
        localStorage["cp-alreadyvisited"] = true;

    }

    return(
        <Dialog
            open={modalState}
            onClose={handleDialogClose}
            // PaperComponent={PaperComponent}
            ara-labelledby="draggable-dialog-title"
            TransitionComponent={Transition}
        >
            <DialogTitle>
                Hi there! First time visiting?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you done with businesses loosing your personnal information? i.e. emails, credit card informations, phone numbers and even you home address?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleDialogCancel}>
                    No
                </Button>
                <Button buttonColor='green' onClick={handleDialogAccept}>
                    YES! give me a solution!
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default WelcomeModal;