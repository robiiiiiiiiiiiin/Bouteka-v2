import React from 'react'
import { useTranslation, Trans } from 'react-i18next';

import Accessory from 'models/Accessory';

type CabasProps = {
    hasPastas: boolean;
    goNextStep: () => void;
    cabas: Accessory;
    addAccessoryToCart: (accessory: Accessory) => void;
    removeAccessoryFromCart: (accessory: Accessory) => void;
}

const Cabas = React.forwardRef<HTMLDivElement, CabasProps>(({hasPastas, goNextStep, cabas, addAccessoryToCart, removeAccessoryFromCart}, ref) => {
    const { t } = useTranslation();
    const cabasPrice = parseInt(cabas.price).toLocaleString('fr-CH', { minimumFractionDigits: 2 })

    const addCabas = () => {
        addAccessoryToCart(cabas)
        goNextStep()
    }
    const removeCabas = () => {
        removeAccessoryFromCart(cabas)
        goNextStep()
    }

    return (
        <div ref={ref} className="cashier-step cabas">
            <div className="step-content">
                <p>
                    <Trans i18nKey="cashier.cabas.wannaCabas">
                        Hello do you want <strong>{{ strongcabas: t('cashier.cabas.theCabas') }}</strong> {{ price: cabasPrice }} ?
                    </Trans>
                </p>
                <br/>
                <p>
                    {hasPastas ? t('cashier.cabas.dontForgetWithPastas') : t('cashier.cabas.dontForgetWithoutPastas')}
                </p>
            </div>
            <div className="step-buttons">
                <button className="button primary" onClick={() => addCabas()}>{t('cashier.cabas.addCabas')}</button>
                <button className="button secondary" onClick={() => removeCabas()}>{t('cashier.cabas.noThanks')}</button>
            </div>
        </div>
    )
})

export default Cabas;