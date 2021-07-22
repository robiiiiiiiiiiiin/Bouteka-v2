import './Cashier.scss';

import React, { createRef, Dispatch, SetStateAction, useRef } from 'react';
import { History } from 'history';

import { CSSTransition, TransitionGroup, } from 'react-transition-group';

import useStateWithLS from 'components/useStateWithLS';

import Cabas from 'components/cashierSteps/Cabas';
import Resume from 'components/cashierSteps/Resume';
import Authentication from 'components/cashierSteps/Authentication';
import UserDetails from 'components/cashierSteps/UserDetails';
import Shipping from 'components/cashierSteps/Shipping';
import Redirection from 'components/cashierSteps/Redirection';

import character_back from 'assets/img/character_back.svg'
import character_cashier from 'assets/img/character_cashier.svg'
import shop_desk from 'assets/img/shop_desk.svg'
import arrow_left from 'assets/img/arrow_left.svg'

import ChosenBasketAttr from 'models/ChosenBasketAttr';
import Variation from 'models/Variation';
import Accessory from 'models/Accessory';
import Basket from 'models/Basket';
import Customer from 'models/Customer';
import ShippingMethod from 'models/ShippingMethod';
import Order from 'models/Order';

type CashierProps = {
    chosenBasket: Basket;
    history: History;
    chosenBasketAttributes: Array<ChosenBasketAttr>;
    currentVariation: Variation | null;
    getCurrentVariation: () => void;
    accessories: Array<Accessory>;
    chosenAccessories: Array<Accessory>;
    setChosenAccessories: Dispatch<SetStateAction<Accessory[]>>;
    shippingMethods: Array<ShippingMethod>;
    chosenShippingMethod: ShippingMethod;
    setChosenShippingMethod: Dispatch<SetStateAction<ShippingMethod | null>>;
    createdOrder: Order | null;
    createOrder: () => Promise<void>;
    currentCustomer: Customer | null;
    setCurrentCustomer: Dispatch<SetStateAction<Customer | null>>;
}

const Cashier = React.forwardRef<HTMLDivElement, CashierProps>((props, ref) => {
    const stepOrder = ["Cabas", "Resume", "Authentication", "UserDetails", "Shipping", "Redirection"]
    const [currentStep, setCurrentStep] = useStateWithLS('currentStep', 1)

    const hasPastas = !!props.chosenBasketAttributes.find(option => option.name === "400g pâtes blé dur en vrac")
    const cabas = props.accessories.find(accessory => accessory.slug === "le-cabas")

    // used to avoid unwanted behaviour on mobile when the keyboard is displayed
    const baseWindowHeight = useRef(window.innerHeight)

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
    /* const nodeRefs = useRef([])
    stepOrder.map((step, i) => nodeRefs.current[i] ?? createRef()) */
    const nodeRefs: React.Ref<HTMLDivElement>[] = stepOrder.map(() => createRef<HTMLDivElement>())

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
            case "Resume": return <Resume ref={nodeRefs[1]} goNextStep={goNextStep} chosenBasket={props.chosenBasket} chosenBasketAttributes={props.chosenBasketAttributes} chosenAccessories={props.chosenAccessories} getCurrentVariation={props.getCurrentVariation} />
            case "Authentication": return <Authentication ref={nodeRefs[2]} goNextStep={goNextStep} currentCustomer={props.currentCustomer} setCurrentCustomer={props.setCurrentCustomer} />
            case "UserDetails": return <UserDetails ref={nodeRefs[3]} goNextStep={goNextStep} currentCustomer={props.currentCustomer as Customer} setCurrentCustomer={props.setCurrentCustomer} />
            case "Shipping": return <Shipping ref={nodeRefs[4]} goNextStep={goNextStep} shippingMethods={props.shippingMethods} chosenShippingMethod={props.chosenShippingMethod} setChosenShippingMethod={props.setChosenShippingMethod} />
            case "Redirection": return <Redirection ref={nodeRefs[5]} chosenBasket={props.chosenBasket} currentVariation={props.currentVariation as Variation} chosenAccessories={props.chosenAccessories} currentCustomer={props.currentCustomer} chosenShippingMethod={props.chosenShippingMethod} createdOrder={props.createdOrder} createOrder={props.createOrder} />

            default: return <div></div>
        }
    }

    return (
        <div ref={ref} className="page cashier" style={{['--window-height-static' as any]: baseWindowHeight.current+'px'}}>
            <main className="wrapper">
                <div className="characters">
                    <div className={`character-wrapper cashier`}>
                        <img className="character" src={character_cashier} alt="" draggable="false" />
                    </div>
                    <div className='desk-wrapper'>
                        <img className="desk" src={shop_desk} alt="" draggable="false" />
                    </div>
                    <div className='character-wrapper user'>
                        <img className="character" src={character_back} alt="" draggable="false" />
                    </div>
                </div>
                <TransitionGroup>
                    <CSSTransition key={currentStep} nodeRef={nodeRefs[currentStep - 1]} timeout={600} classNames="fade" >
                        {displayCurrentStep()}
                    </CSSTransition>
                </TransitionGroup>
                <button className="button secondary goback" onClick={() => goPreviousStep()}>
                    <img className="arrow-icon" src={arrow_left} alt="" draggable="false" />
                </button>
            </main>
        </div>
            )
})

            export default Cashier;