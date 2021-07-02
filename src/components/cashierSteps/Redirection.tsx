//import './Redirection.scss'

import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from 'components/LoadingSpinner';

import ShippingMethod from 'models/ShippingMethod';

type ShippingProps = {
    chosenShippingMethod: ShippingMethod;
}

const Redirection = React.forwardRef<HTMLDivElement, ShippingProps>((props, ref) => {
    const { t } = useTranslation();

    

    return (
        <div ref={ref} className="cashier-step shipping">
            <div className="step-content">
                <p className="fixed-text"> {t('cashier.redirection.dialog') } </p>
            </div>
            <div className="step-buttons">
                <button className="button primary" onClick={() => {}} >{t('form.loading')}</button>
            </div>
        </div>
    )
})

export default Redirection;