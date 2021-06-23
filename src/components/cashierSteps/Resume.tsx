import './Resume.scss'

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import useStateWithLS from 'components/useStateWithLS';

import Basket from 'models/Basket';
import ChosenBasketAttr from 'models/ChosenBasketAttr';
import Accessory from 'models/Accessory';

type ResumeProps = {
    chosenBasket: Basket;
    chosenBasketAttributes: Array<ChosenBasketAttr>;
    chosenAccessories: Array<Accessory>;
}

const Resume = React.forwardRef<HTMLDivElement, ResumeProps>(({ chosenBasket, chosenBasketAttributes, chosenAccessories }, ref) => {
    const { t } = useTranslation();

    console.log("chosenBasket", chosenBasket)
    console.log("chosenBasketAttributes", chosenBasketAttributes)
    console.log("chosenAccessories", chosenAccessories)

    const formatPrice = (price: string): string => {
        return parseInt(price).toLocaleString('fr-CH', { minimumFractionDigits: 2 })
    }

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
                            <div className="resume attribute">
                                <div className="header">
                                    <span className="name">{attribute.name}</span>
                                    <span className="price">chf {formatPrice(attribute.price)}</span>
                                </div>
                            </div>
                        ))
                    }

                    {/* accessories */}
                    {   chosenAccessories.map((accessory) => (
                            <div className="resume accessory">
                                <div className="header">
                                    <span className="name">{accessory.name}</span>
                                    <span className="price">chf {formatPrice(accessory.price)}</span>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className="step-buttons">
                <button className="button primary" /* onClick={() => addCabas()} */>{t('cashier.resume.confirm')}</button>
                <Link className="button secondary" to="/options">{t('cashier.resume.back')}</Link>
            </div>
        </div>
    )
})

export default Resume;