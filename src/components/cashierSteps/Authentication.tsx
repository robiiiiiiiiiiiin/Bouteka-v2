import './Authentication.scss'

import React, { createRef, useState, Dispatch, SetStateAction, FormEvent } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from "react-router-dom";
import axios from 'axios';

import { CSSTransition, TransitionGroup, } from 'react-transition-group';

import LoadingSpinner from 'components/LoadingSpinner';

type AuthenticationProps = {
}

const Authentication = React.forwardRef<HTMLDivElement, AuthenticationProps>(({ }, ref) => {
    const { t } = useTranslation();
    const apiUrl = process.env.REACT_APP_API_URL

    // Steps handling
    const [currentStep, setCurrentStep] = useState(1)
    const steps = ['login', 'register', 'confirmation']

    const setCurrentNamedStep = (name: string) => {
        setCurrentStep(steps.indexOf(name) + 1)
    }

    const nodeRefs: React.Ref<HTMLDivElement>[] = steps.map(() => createRef<HTMLDivElement>())

    // Auth requests
    const [loading, setLoading] = useState(false)

    const login = async (evt: FormEvent) => {
        evt.preventDefault()
        console.log("login()")
        setLoading(true);
        var formData = new FormData(document.forms.namedItem('loginForm') as HTMLFormElement);

        try {
            const result = await axios({
                url: apiUrl + 'jwt-auth',
                method: 'post',
                headers: { "Content-Type": "multipart/form-data" },
                data: formData
            });
            console.log("succes", result)
        } catch (error) {
            console.error("Fetch error", error)
        }

        setLoading(false);
    }

    const displayCurrentStep = () => {
        switch (steps[currentStep - 1]) {
            case "login": return (
                <div className="understep" ref={nodeRefs[0]}>
                    <div className="step-content">
                        <p>{t('cashier.authentication.dialogHaveAccount')}</p>
                        <form id="loginForm" onSubmit={login}>
                            <label htmlFor="username">{t('cashier.authentication.username')}</label>
                            <input type="text" id="username" name="username" />
                            <label htmlFor="password">{t('cashier.authentication.pwd')}</label>
                            <input type="password" id="password" name="password" />
                        </form>
                    </div>
                    <div className="step-buttons">
                        <button type="submit" form="loginForm" className="button primary" disabled={loading}>{t('cashier.authentication.login')} {loading && <LoadingSpinner />}</button>
                        <button className="button secondary" onClick={() => setCurrentNamedStep('register')}>{t('cashier.authentication.createAnAccount')}</button>
                    </div>
                </div>
            )
            case "register": return (
                <div className="understep" ref={nodeRefs[1]}>
                    <div className="step-content">
                        <p>{t('cashier.authentication.dialogCreateAccount')}</p>
                        <form id="registerForm">
                            <label htmlFor="username">{t('cashier.authentication.username')}</label>
                            <input type="text" id="username" name="username" />
                            <label htmlFor="email">{t('cashier.authentication.mail')}</label>
                            <input type="email" id="email" name="email" />
                            <label htmlFor="password">{t('cashier.authentication.pwd')}</label>
                            <input type="password" id="password" name="password" />
                        </form>
                    </div>
                    <div className="step-buttons">
                        <button type="submit" form="registerForm" className="button primary" disabled={loading}>{t('cashier.authentication.createMyAccount')} {loading && <LoadingSpinner />}</button>
                        <button className="button secondary" onClick={() => setCurrentNamedStep('login')}>{t('cashier.authentication.cancel')}</button>
                    </div>
                </div>
            )
            case "confirmation": return (
                <div className="understep" ref={nodeRefs[2]}>
                    <div className="step-content">
                        <p>
                            <Trans i18nKey="cashier.authentication.dialogAlreadyConnected">
                                You're connected as <strong>{{ strongemail: "statique@changeme.com" }}</strong> is it you ?
                            </Trans>
                        </p>
                    </div>
                    <div className="step-buttons">
                        <button type="submit" form="registerForm" className="button primary">{t('cashier.authentication.confirm')}</button>
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