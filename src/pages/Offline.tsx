import React from 'react';

import Character from 'components/Character';

type OfflineProps = {
  selectedLang: string;
}

const Offline = React.forwardRef<HTMLDivElement, OfflineProps>((props, ref) => {
  // The translation is made manually here because the lang files are unreachable as the user is offline
  const messages: any = {
    fr: "Oh non, il semblerait que tu ne sois pas connecté à internet.",
    de: "Oh nein, es scheint, dass Sie nicht mit dem Internet verbunden sind.",
    en: "Oh no, it seems that you are not connected to the internet."
  }
  const message = messages.hasOwnProperty(props.selectedLang) ? messages[props.selectedLang] : messages.fr

  return (
    <div ref={ref} className="page loading">
      <main className="wrapper">
        <p className="text">{message}</p>
        <Character options={{}} />
      </main>
    </div>
  )
})

export default Offline;