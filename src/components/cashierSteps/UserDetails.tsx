import React, { useState, createRef, FormEvent, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import axios, { AxiosResponse } from 'axios';
import { checkPath } from 'components/helpers'

import Customer from 'models/Customer';
import LoadingSpinner from 'components/LoadingSpinner';

type UserDetailsProps = {
    currentCustomer: Customer;
    setCurrentCustomer: Dispatch<SetStateAction<Customer | null>>;
    goNextStep: () => void;
}

const UserDetails = React.forwardRef<HTMLDivElement, UserDetailsProps>((props, ref) => {
    const { t } = useTranslation();
    const apiUrl = process.env.REACT_APP_API_URL

    // Validation
    const [validateFields, setValidateFields] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newAddressError, setNewAddressError] = useState("")

    const validateExistingAddress = (address: Customer['billing']): Boolean => {
        const everyFieldsFilled = Object.entries(address)
        // Only take required address fields
        .filter(([param, value]) => ["first_name", "last_name", "address_1", "city", "postcode", "phone", "email"].includes(param))
        // Check that they all are filled
        .reduce((filled, [param, value]) => {
            return filled & Number(value.length >= 1)
        }, 1);
        return !!everyFieldsFilled
    }

    // Steps handling
    const [currentStep, setCurrentStep] = useState(validateExistingAddress(props.currentCustomer.billing) ? 1 : 2)
    const steps = ['confirmation', 'newAddress']

    const setCurrentNamedStep = (name: string) => {
        setCurrentStep(steps.indexOf(name) + 1)
    }

    const nodeRefs: React.Ref<HTMLDivElement>[] = steps.map(() => createRef<HTMLDivElement>())

    // Request
    const modifyAddress = async (evt: FormEvent) => {
        evt.preventDefault()
        setLoading(true)
        setNewAddressError("")
        const formData = new FormData(document.forms.namedItem('newAddressForm') as HTMLFormElement);
        // Transform formData into query string
        const params = new URLSearchParams(formData as any).toString()
        
        try {
            const user: AxiosResponse<Customer> = await axios.put(apiUrl + 'customers/'+props.currentCustomer.id, params)
            props.setCurrentCustomer(user.data)
            props.goNextStep()
        } catch (error) {
            setNewAddressError( checkPath(error, 'response.data.message') ? error.response.data.message : "Erreur de communication avec le serveur. Veuillez svp passer votre commande sur bouteka.ch" )
        }

        setLoading(false)
        return
    }

    // Steps display
    const displayCurrentStep = () => {
        switch (steps[currentStep - 1]) {
            case "confirmation": return (
                <div className="understep" ref={nodeRefs[0]}>
                    <div className="step-content">
                        <p> {t('cashier.userDetails.dialogConfirm')} </p>
                        <p>
                            <div>{props.currentCustomer.billing.first_name} {props.currentCustomer.billing.last_name}</div>
                            <div>{props.currentCustomer.billing.address_1}</div>
                            <div>{props.currentCustomer.billing.postcode} {props.currentCustomer.billing.city}</div>
                            <div>{props.currentCustomer.billing.phone}</div>
                        </p>
                    </div>
                    <div className="step-buttons">
                        <button type="submit" className="button primary" onClick={props.goNextStep}>{t('form.confirm')}</button>
                        <button className="button secondary" onClick={() => setCurrentNamedStep('newAddress')}>{t('form.modify')}</button>
                    </div>
                </div>
            )
            case "newAddress": return (
                <div className="understep" ref={nodeRefs[1]}>
                    <div className="step-content">
                        <p>{t('cashier.userDetails.dialogAddAddress')}</p>
                        <form id="newAddressForm" className={validateFields ? 'validate' : ''} onSubmit={modifyAddress} autoComplete="on" >
                            <label htmlFor="name">{t('form.name')}</label>
                            <input type="text" id="name" name="name" required autoComplete="lname" />
                            <label htmlFor="firstname">{t('form.firstname')}</label>
                            <input type="text" id="firstname" name="firstname" required autoComplete="fname" />
                            <label htmlFor="street">{t('form.street')}</label>
                            <input type="text" id="street" name="street" required autoComplete="shipping street-address" />
                            <label htmlFor="postcode">{t('form.postcode')}</label>
                            <input type="number" id="postcode" name="postcode" required autoComplete="shipping postal-code" />
                            <label htmlFor="city">{t('form.city')}</label>
                            <input type="text" id="city" name="city" required autoComplete="shipping locality" />
                            <label htmlFor="phone">{t('form.phone')}</label>
                            <input type="tel" id="phone" name="phone" pattern="(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b" required autoComplete="tel" />
                            <input type="hidden" id="email" name="email" value={props.currentCustomer.email} />
                            <p className="error">{newAddressError}</p>
                        </form>
                    </div>
                    <div className="step-buttons">
                        <button type="submit" form="newAddressForm" className="button primary" disabled={loading} onClick={() => setValidateFields(true)} >{t('form.confirm')} {loading && <LoadingSpinner />}</button>
                        <button className="button secondary" onClick={() => { setCurrentNamedStep('confirmation'); setValidateFields(false) }} disabled={loading} >{t('form.cancel')}</button>
                    </div>
                </div>
            )

            default: return <div></div>
        }
    }

    return (
        <div ref={ref} className="cashier-step user-details">
            <TransitionGroup>
                <CSSTransition key={currentStep} nodeRef={nodeRefs[currentStep - 1]} timeout={600} classNames="fade" >
                    {displayCurrentStep()}
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
})

export default UserDetails;