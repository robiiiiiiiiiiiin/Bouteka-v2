import './Resume.scss'

import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import useStateWithLS from 'components/useStateWithLS';

import Basket from 'models/Basket';
import ChosenBasketAttr from 'models/ChosenBasketAttr';
import Accessory from 'models/Accessory';
import Variation from 'models/Variation';

type ResumeProps = {
    goNextStep: () => void;
    chosenBasket: Basket;
    chosenBasketAttributes: Array<ChosenBasketAttr>;
    chosenAccessories: Array<Accessory>;
    getCurrentVariation: () => void;
}

const Resume = React.forwardRef<HTMLDivElement, ResumeProps>(({ goNextStep, chosenBasket, chosenBasketAttributes, chosenAccessories, getCurrentVariation }, ref) => {
    const { t } = useTranslation();

    const formatPrice = (price: string): string => {
        return parseFloat(price).toLocaleString('fr-CH', { minimumFractionDigits: 2 })
    }

    const confirm = () => {
        getCurrentVariation()
        goNextStep()
    }

    const basketPrice = parseFloat(chosenBasket.price)
    const attributesPrice = chosenBasketAttributes.reduce((currentPrice, option2) => {
        return currentPrice + parseFloat(option2.price)
    }, 0)
    const accessoriesPrice = chosenAccessories.reduce((currentPrice, option2) => {
        return currentPrice + parseFloat(option2.price)
    }, 0)

    const totalPrice = basketPrice + attributesPrice + accessoriesPrice

    return (
        <div ref={ref} className="cashier-step resume">
            <div className="step-content">
                <p className="fixed-text"> {t('cashier.resume.thereIsTheContent') } </p>
                <div className="resume-wrapper">

                    {/* basket */}
                    <div className="resume basket">
                        <div className="header">
                            <span className="name">{chosenBasket.name}</span>
                            <span className="price">chf {formatPrice(chosenBasket.price)}</span>
                        </div>
                        <div className="content">
                            <p className="text" dangerouslySetInnerHTML={{ __html: chosenBasket.parsed_short_description }}></p>
                        </div>
                    </div>

                    {/* attributes */}
                    {   chosenBasketAttributes.map((attribute) => (
                            <div key={`attr_${attribute.id}`} className="resume attribute">
                                <div className="header">
                                    <span className="name">{attribute.name}</span>
                                    <span className="price">chf {formatPrice(attribute.price)}</span>
                                </div>
                            </div>
                        ))
                    }

                    {/* accessories */}
                    {   chosenAccessories.map((accessory) => (
                            <div key={`acce_${accessory.id}`} className="resume accessory">
                                <div className="header">
                                    <span className="name">{accessory.name}</span>
                                    <span className="price">chf {formatPrice(accessory.price)}</span>
                                </div>
                            </div>
                        ))
                    }
                    
                    {/* total price */}
                    <div className="resume total">
                        <div className="header">
                            <span className="name">{t('cashier.resume.total')}: </span>
                            <span className="price">chf {formatPrice(totalPrice.toString())}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="step-buttons">
                <button className="button primary" onClick={() => confirm()}>{t('cashier.resume.confirm')}</button>
                <Link className="button secondary" to="/options">{t('cashier.resume.back')}</Link>
            </div>
        </div>
    )
})

export default Resume;