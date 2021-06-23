import './Cashier.scss';

import React, { createRef, useRef, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { History } from 'history';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { CSSTransition, TransitionGroup, } from 'react-transition-group';

import useStateWithLS from 'components/useStateWithLS';

import Cabas from 'components/cashierSteps/Cabas';
import Resume from 'components/cashierSteps/Resume';

import character_back from 'assets/img/character_back.svg'
import character_cashier from 'assets/img/character_cashier.svg'
import shop_desk from 'assets/img/shop_desk.svg'
import arrow_left from 'assets/img/arrow_left.svg'

import ChosenBasketAttr from 'models/ChosenBasketAttr';
import Variation from 'models/Variation';
import Accessory from 'models/Accessory';
import Basket from 'models/Basket';

type CashierProps = {
    chosenBasket: Basket;
    history: History;
    chosenBasketAttributes: Array<ChosenBasketAttr>;
    currentVariation: Variation | null;
    accessories: Array<Accessory>;
    chosenAccessories: Array<Accessory>;
    setChosenAccessories: Dispatch<SetStateAction<Accessory[]>>
}

const Cashier = React.forwardRef<HTMLDivElement, CashierProps>((props, ref) => {
    const { t } = useTranslation();

    const stepOrder = ["Cabas", "Resume", "Authentication", "UserDetails", "Shipping", "Redirection"]
    const [currentStep, setCurrentStep] = useStateWithLS('currentStep', 1)

    const hasPastas = !!props.chosenBasketAttributes.find(option => option.name === "400g pâtes blé dur en vrac")
    const cabas = props.accessories.find(accessory => accessory.slug === "le-cabas")

    const goStep = (direction: string) => {
        if (direction === "previous") {
            if (currentStep > 1) {
                setCurrentStep(currentStep - 1)
            } else {
                props.history.push('/options')
            }
        }
        else if (direction === "next" && currentStep < stepOrder.length) {
            setCurrentStep(currentStep + 1)
        }
    }
    const goPreviousStep = () => goStep("previous")
    const goNextStep = () => goStep("next")

    const addAccessoryToCart = (accessory: Accessory) => {
        // If the accessory is already in the chosenAccessories array, don't add it twice
        if (props.chosenAccessories.filter(item => item.id === accessory.id).length) return
        props.setChosenAccessories([...props.chosenAccessories, accessory])
    }
    const removeAccessoryFromCart = (accessory: Accessory) => {
        const newAccessories = props.chosenAccessories.filter(item => item.id !== accessory.id)
        props.setChosenAccessories(newAccessories)
    }

    /* Transition */
    const cabasRef = useRef<HTMLDivElement>(null)
    const resumeRef = useRef<HTMLDivElement>(null)
    const nodeRefs = [cabasRef, resumeRef]

    /* const nodeRefs = stepOrder.map(() => createRef<HTMLDivElement>()) */

    const displayCurrentStep = () => {
        switch (stepOrder[currentStep - 1]) {
            case "Cabas": {
                // Propose to buy the cabas only if it has been found in accessories list
                if (cabas) return <Cabas ref={nodeRefs[0]} hasPastas={hasPastas} goNextStep={goNextStep} cabas={cabas} addAccessoryToCart={addAccessoryToCart} removeAccessoryFromCart={removeAccessoryFromCart} />
                else {
                    goNextStep()
                    return
                }
            }
            case "Resume": return <Resume ref={nodeRefs[1]} chosenBasket={props.chosenBasket} chosenBasketAttributes={props.chosenBasketAttributes} chosenAccessories={props.chosenAccessories} />

            default: return <div></div>
        }
    }

    return (
        <div ref={ref} className="page cashier">
            <main className="wrapper">
                <div className="characters">
                    <div className={`character-wrapper cashier`}>
                        <img className="character" src={character_cashier} alt="" />
                    </div>
                    <div className='desk-wrapper'>
                        <img className="desk" src={shop_desk} alt="" />
                    </div>
                    <div className='character-wrapper user'>
                        <img className="character" src={character_back} alt="" />
                    </div>
                </div>
                <TransitionGroup>
                    <CSSTransition key={currentStep} nodeRef={nodeRefs[currentStep - 1]} timeout={600} classNames="fade" >
                        {displayCurrentStep()}
                    </CSSTransition>
                </TransitionGroup>
                <button className="button secondary goback" onClick={() => goPreviousStep()}>
                    <img className="arrow-icon" src={arrow_left} alt="" />
                </button>
            </main>
        </div>
            )
})

            export default Cashier;