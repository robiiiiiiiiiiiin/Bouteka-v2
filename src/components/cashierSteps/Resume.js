import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useStateWithLS from 'components/useStateWithLS';

const Resume = (props) => {
    const { t } = useTranslation();

    return (
        <div className="cashier-step resume">
            Resume
        </div>
    )
}

export default Resume;