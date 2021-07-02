import './Shipping.scss'

import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import ShippingMethod from 'models/ShippingMethod';

type ShippingProps = {
    goNextStep: () => void;
    shippingMethods: Array<ShippingMethod>;
    chosenShippingMethod: ShippingMethod;
    setChosenShippingMethod: Dispatch<SetStateAction<ShippingMethod | null>>;
}

const Shipping = React.forwardRef<HTMLDivElement, ShippingProps>((props, ref) => {
    const { t } = useTranslation();

    return (
        <div ref={ref} className="cashier-step shipping">
            <div className="step-content">
                <p className="fixed-text"> {t('cashier.shipping.dialogAskWhere') } </p>
                <ul className="shipping-methods">
                    {
                    props.shippingMethods.map(method =>
                        <li key={method.id} className="method">
                            <label className={`button toggle ${(props.chosenShippingMethod && props.chosenShippingMethod.id === method.id) && 'selected'}`} onClick={() => props.setChosenShippingMethod(method)}>
                                <input type="radio" id={`method${method.id}`} name={`method${method.id}`} value={method.id} />
                                {method.title}
                            </label>
                        </li>  
                    )
                    }
                </ul>
            </div>
            <div className="step-buttons">
                <button className="button primary" onClick={props.goNextStep} disabled={!props.chosenShippingMethod} >{t('form.confirm')}</button>
            </div>
        </div>
    )
})

export default Shipping;