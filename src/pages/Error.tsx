import React from 'react';

import Character from 'components/Character';

type ErrorProps = {
  selectedLang: string;
}

const Error = React.forwardRef<HTMLDivElement, ErrorProps>((props, ref) => {
  // The translation is made manually here because the lang files may not be loaded
  const messages: any = {
    fr: "Oh non, il y a eu une erreur technique. Le site est cassé!",
    de: "Oh nein, das war ein technischer Fehler. Die Website ist defekt!",
    en: "Oh no, there was a technical error. The website is broken!"
  }
  const message = messages.hasOwnProperty(props.selectedLang) ? messages[props.selectedLang] : messages.fr

  return (
    <div ref={ref} className="page error">
      <main className="wrapper">
        <p className="text">{message}</p>
        <Character options={{ expression:"sad" }} />
      </main>
    </div>
  )
})

export default Error;