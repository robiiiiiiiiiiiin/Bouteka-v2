import React from 'react';
 
const LangSelector = (props) => {
  return (
    <form>
      <label><input type="radio" value="de" name="language" checked={props.selectedLang === 'de'}  onChange={props.changeLanguage}/> de</label>
      <label><input type="radio" value="fr" name="language" checked={props.selectedLang === 'fr'}  onChange={props.changeLanguage}/> fr</label>
    </form>
  )
}
 
export default LangSelector;