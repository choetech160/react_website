import React, { forwardRef } from 'react';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline']
const STATUS = ['disabled', 'disabledGreen', 'disabledRed']
const SIZES = ['btn--medium', 'btn--large', 'btn--mobile', 'btn--wide']
const COLORS = ['primary', 'blue', 'red', 'green', 'orange']
const WIDTH = ['large']


    export const Button = React.forwardRef(function Button(props, ref) {
            const checkButtonStyle = STYLES.includes(props.buttonStyle) ? props.buttonStyle : STYLES[0];
            const checkButtonSize = SIZES.includes(props.buttonSize) ? props.buttonSize : SIZES[0];
            const checkButtonColor = COLORS.includes(props.buttonColor) ? props.buttonColor : null;
            const checkButtonStatus = STATUS.includes(props.buttonStatus) ? props.buttonStatus : null;
            const checkButtonWidth = WIDTH.includes(props.buttonWidth) ? props.buttonWidth:null;
        //  Spread the props to the underlying DOM element.
        // return <div {...props} ref={ref}>Bin</div>
        return(
            <div {...props} ref={ref}>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor} ${checkButtonStatus} ${checkButtonWidth}`} 
            onClick={props.onClick} 
            type={props.type}>{props.children}
            
            </button>
            </div>

        )
      });

