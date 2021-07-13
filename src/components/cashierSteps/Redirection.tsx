//import './Redirection.scss'

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from 'components/LoadingSpinner';

import ShippingMethod from 'models/ShippingMethod';
import Basket from 'models/Basket';
import Variation from 'models/Variation';
import Accessory from 'models/Accessory';
import Customer from 'models/Customer';
import Order from 'models/Order';

type ShippingProps = {
    chosenShippingMethod: ShippingMethod;
    chosenBasket: Basket;
    currentVariation: Variation;
    chosenAccessories: Array<Accessory>;
    currentCustomer: Customer | null;
    createdOrder: Order | null;
    createOrder: () => Promise<void>;
}

const Redirection = React.forwardRef<HTMLDivElement, ShippingProps>((props, ref) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(props.createdOrder == null)
    console.log("loading", loading)

    useEffect(() => {
        if(!props.createdOrder) {
            props.createOrder().then(() => {
                setLoading(false)
            })
        }
    }, [])

    return (
        <div ref={ref} className="cashier-step shipping">
            <div className="step-content">
                <p className="fixed-text"> {t('cashier.redirection.dialog') } </p>
            </div>
            <div className="step-buttons">
                <a  href={(loading || !props.createdOrder) ? "" : `https://dev.bouteka.ch/checkout/order-pay/${props.createdOrder.id}/?pay_for_order=true&key=${props.createdOrder.order_key}`} className="button primary" >
                    {loading ? t('form.loading') : t('cashier.redirection.goToPayPlatform')} {loading && <LoadingSpinner />}
                </a>
            </div>
        </div>
    )
})

export default Redirection;