import React from 'react';
import { useTranslation } from 'react-i18next';
 
const HelloWorld = () => {
  const { t } = useTranslation();
 
  return (
    <div>
      <b>{t('Hello')}</b>
    </div>
  )
}
 
export default HelloWorld;