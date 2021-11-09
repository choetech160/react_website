import React, { useState, useRef } from 'react'
import HomeSection from '../../HomeSection'
import { Data } from './Data'
import styled from 'styled-components'
import Modal from '../../Modal/Modal'
import { Button } from '../../Button'

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
let modalState='';
function VirtualCard(props) {
    const supported_language = ['EN', 'FR'];
    let homeObjOne = false;
    if (supported_language.includes(props.lang)){
        homeObjOne = Data[props.lang]['homeObjOne'];
    }
    

    const ContainerRef = useRef()
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev)
    }
    const closeContainer = e => {
        console.log("Clicked ", ContainerRef.current," -- ",e.target)
        console.log(modalState)
        if(ContainerRef.current === e.target){
            setShowModal(false)
        }
    }
    return (
        <>
            <HomeSection {...homeObjOne} />

            {/* add payment information [modal] */}
            <Container ref={ContainerRef} onClick={closeContainer}>
                {showModal ? null: 
                    <Button buttonSize='btn--wide' buttonColor='primary' onClick={openModal}>
                        Add a credit card
                    </Button>
                }
                <Modal title={'Create virtual card now!'} showModal={showModal} setShowModal={setShowModal} state={modalState} />
                {/* list all current virtual credit card attached to CC */}
            </Container>
            {/* manage virtual cards */}
        </>
    )
}

export default VirtualCard
