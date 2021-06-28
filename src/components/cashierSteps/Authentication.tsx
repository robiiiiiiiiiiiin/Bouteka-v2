import React, { createRef, useState, Dispatch, SetStateAction, FormEvent } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import axios, { AxiosResponse } from 'axios';

import { CSSTransition, TransitionGroup, } from 'react-transition-group';

import LoadingSpinner from 'components/LoadingSpinner';

import Customer from 'models/Customer';

type AuthenticationProps = {
    currentCustomer: Customer | null;
    setCurrentCustomer: Dispatch<SetStateAction<Customer | null>>;
    goNextStep: () => void;
}

const Authentication = React.forwardRef<HTMLDivElement, AuthenticationProps>((props, ref) => {
    const { t } = useTranslation();
    const apiUrl = process.env.REACT_APP_API_URL

    // Steps handling
    const [currentStep, setCurrentStep] = useState(props.currentCustomer ? 3 : 1)
    const steps = ['login', 'register', 'confirmation']

    const setCurrentNamedStep = (name: string) => {
        setCurrentStep(steps.indexOf(name) + 1)
    }

    const nodeRefs: React.Ref<HTMLDivElement>[] = steps.map(() => createRef<HTMLDivElement>())

    // Auth requests
    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [registerError, setRegisterError] = useState("")
    const [validateFields, setValidateFields] = useState(false)

    const authRequest = async (setError: Dispatch<SetStateAction<any>>, form: HTMLFormElement, endpoint: string) => {
        setLoading(true)
        setError("")
        const formData = new FormData(form);

        try {
            const user: AxiosResponse<Customer> = await axios({
                url: apiUrl + endpoint,
                method: 'post',
                headers: { "Content-Type": "multipart/form-data" },
                data: formData
            });
            props.setCurrentCustomer(user.data)
            props.goNextStep()
        } catch (error) {
            setError(error.response.data.message)
        }

        setLoading(false)
    }

    const login = async (evt: FormEvent) => {
        evt.preventDefault()
        authRequest(setLoginError, document.forms.namedItem('loginForm') as HTMLFormElement, 'jwt-auth')
    }

    const register = async (evt: FormEvent) => {
        evt.preventDefault()
        authRequest(setRegisterError, document.forms.namedItem('registerForm') as HTMLFormElement, 'customers')
    }

    const displayCurrentStep = () => {
        switch (steps[currentStep - 1]) {
            case "login": return (
                <div className="understep" ref={nodeRefs[0]}>
                    <div className="step-content">
                        <p>{t('cashier.authentication.dialogHaveAccount')}</p>
                        <form id="loginForm" className={validateFields ? 'validate' : ''} onSubmit={login} >
                            <label htmlFor="username">{t('form.username')}</label>
                            <input type="text" id="username" name="username" required />
                            <label htmlFor="password">{t('form.pwd')}</label>
                            <input type="password" id="password" name="password" required />
                            <p className="error">{loginError}</p>
                        </form>
                    </div>
                    <div className="step-buttons">
                        <button type="submit" form="loginForm" className="button primary" disabled={loading} onClick={() => setValidateFields(true)} >{t('cashier.authentication.login')} {loading && <LoadingSpinner />}</button>
                        <button className="button secondary" onClick={() => {setCurrentNamedStep('register'); setValidateFields(false)}} disabled={loading}>{t('cashier.authentication.createAnAccount')}</button>
                    </div>
                </div>
            )
            case "register": return (
                <div className="understep" ref={nodeRefs[1]}>
                    <div className="step-content">
                        <p>{t('cashier.authentication.dialogCreateAccount')}</p>
                        <form id="registerForm" className={validateFields ? 'validate' : ''} onSubmit={register}>
                            <label htmlFor="username">{t('form.username')}</label>
                            <input type="text" id="username" name="username" required />
                            <label htmlFor="email">{t('form.mail')}</label>
                            <input type="email" id="email" name="email" required />
                            <label htmlFor="password">{t('form.pwd')}</label>
                            <input type="password" id="password" name="password" required />
                            <p className="error">{registerError}</p>
                        </form>
                    </div>
                    <div className="step-buttons">
                        <button type="submit" form="registerForm" className="button primary" disabled={loading} onClick={() => setValidateFields(true)} >{t('cashier.authentication.createMyAccount')} {loading && <LoadingSpinner />}</button>
                        <button className="button secondary" onClick={() => {setCurrentNamedStep('login'); setValidateFields(false)}} disabled={loading} >{t('form.cancel')}</button>
                    </div>
                </div>
            )
            case "confirmation": return (
                <div className="understep" ref={nodeRefs[2]}>
                    <div className="step-content">
                        <p>
                            <Trans i18nKey="cashier.authentication.dialogAlreadyConnected">
                                You're connected as <strong>{{ strongemail: props.currentCustomer?.username }}</strong> is it you ?
                            </Trans>
                        </p>
                    </div>
                    <div className="step-buttons">
                        <button type="submit" form="registerForm" className="button primary" onClick={props.goNextStep}>{t('form.confirm')}</button>
                        <button className="button secondary" onClick={() => setCurrentNamedStep('login')}>{t('cashier.authentication.changeAccount')}</button>
                    </div>
                </div>
            )

            default: return <div></div>
        }
    }

    return (
        <div ref={ref} className="cashier-step authentication">
            <TransitionGroup>
                <CSSTransition key={currentStep} nodeRef={nodeRefs[currentStep - 1]} timeout={600} classNames="fade" >
                    {displayCurrentStep()}
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
})

export default Authentication;