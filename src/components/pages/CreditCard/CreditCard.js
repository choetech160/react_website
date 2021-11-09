import React, { useState, useRef, useCallback } from 'react';
import CForm from './CC_Components/form';
import Card from './CC_Components/card';
import './CreditCard.scss';

const initialState = {
    cardNumber: '#### #### #### ####',
    cardHolder: 'FULL NAME',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    isCardFlipped: false
};

const CreditCard = () => {
    const [state, setState] = useState(initialState);
    const [currentFocusedElm, setCurrentFocusedElm] = useState(null);
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
    
    return (
        <div className="wrapper">
            <CForm
                cardMonth={state.cardMonth}
                cardYear={state.cardYear}
                onUpdateState={updateStateValues}
                cardNumberRef={FormFieldsRefObj.cardNumber}
                cardHolderRef={FormFieldsRefObj.cardHolder}
                cardDateRef={FormFieldsRefObj.cardDate}
                onCardInputFocus={onCardFormInputFocus}
                onCardInputBlur={onCardInputBlur}
            >
                <Card
                    cardNumber={state.cardNumber}
                    cardHolder={state.cardHolder}
                    cardMonth={state.cardMonth}
                    cardYear={state.cardYear}
                    cardCvv={state.cardCvv}
                    isCardFlipped={state.isCardFlipped}
                    currentFocusedElm={currentFocusedElm}
                    onCardElementClick={focusFormFieldByKey}
                    cardNumberRef={cardElementsRef.cardNumber}
                    cardHolderRef={cardElementsRef.cardHolder}
                    cardDateRef={cardElementsRef.cardDate}
                >
                </Card>
            </CForm>
        </div>
    )
}

export default CreditCard
