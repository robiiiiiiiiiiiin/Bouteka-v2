import './Cashier.scss';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useStateWithLS from 'components/useStateWithLS';

import Cabas from 'components/cashierSteps/Cabas';
import Resume from 'components/cashierSteps/Resume';

import character_back from 'assets/img/character_back.svg'
import character_cashier from 'assets/img/character_cashier.svg'
import shop_desk from 'assets/img/shop_desk.svg'
import arrow_left from 'assets/img/arrow_left.svg'

const Cashier = React.forwardRef((props, ref) => {
    const { t } = useTranslation();

    const stepOrder = ["Cabas", "Resume", "Authentication", "UserDetails", "Shipping", "Redirection"]
    const [currentStep, setCurrentStep] = useStateWithLS('currentStep', 1)
    const hasPastas = props.chosenOptions.find(option => option.name === "400g pâtes blé dur en vrac")

    const goStep = (direction) => {
        if (direction === "previous" && currentStep > 1) {
            setCurrentStep(currentStep -1)
        }
        else if (direction === "next" && currentStep < stepOrder.length) {
            setCurrentStep(currentStep +1)
        }
    }
    const goPreviousStep = () => goStep("previous")
    const goNextStep = () => goStep("next")

    const displayCurrentStep = () => {
        switch (stepOrder[currentStep -1]) {
            case "Cabas":   return <Cabas hasPastas={hasPastas} />
            case "Resume":  return <Resume />

            default: return
        }
    }

    console.log("chosenOptions", props.chosenOptions)

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
                { displayCurrentStep() }
                <button className="button secondary goback" onClick={() => goPreviousStep()}>
                    <img className="arrow-icon" src={arrow_left} alt="" />
                </button>
            </main>
        </div>
    )
})

export default Cashier;