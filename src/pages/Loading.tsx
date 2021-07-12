import './Loading.scss'
import React from 'react';

import Character from 'components/Character';

type LoadingProps = {
  hasBasket: boolean;
  selectedLang: string;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  // The translation is made manually here because i18next may not be loaded yet
  const loadings: any = {
    fr: "Chargement",
    de: "Beladung",
    en: "Loading"
  }
  const loading = loadings.hasOwnProperty(props.selectedLang) ? loadings[props.selectedLang] : loadings.fr

  return (
    <div ref={ref} className="page loading">
      <main className="wrapper">
        <p className="text">{loading}</p>
        <Character options={{ hasBasket: props.hasBasket, isWalking: true }} />
      </main>
    </div>
  )
})

export default Loading;