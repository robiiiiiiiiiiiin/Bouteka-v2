import React, { useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import useStateWithLS from 'components/useStateWithLS';

type CabasProps = {
    hasPastas: boolean;
}

const Cabas = ({hasPastas}: CabasProps) => {
    const { t } = useTranslation();

    return (
        <div className="cashier-step cabas">
            <div className="step-content">
                <p>
                    <Trans i18nKey="cashier.cabas.wannaCabas">
                        Hello ... <strong>{{ strongcabas: t('cashier.cabas.theCabas') }}</strong> ?
                    </Trans>
                </p>
                <br/>
                <p>
                    {hasPastas ? t('cashier.cabas.dontForgetWithPastas') : t('cashier.cabas.dontForgetWithoutPastas')}
                </p>
            </div>
            <div className="step-buttons">
                <button className="button primary">{t('cashier.cabas.addCabas')}</button>
                <button className="button secondary">{t('cashier.cabas.noThanks')}</button>
            </div>
        </div>
    )
}

export default Cabas;