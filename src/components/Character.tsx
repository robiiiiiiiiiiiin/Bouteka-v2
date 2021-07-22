import './Character.scss'

import character_arm from 'assets/img/character_arm.svg'
import character_arm_basket from 'assets/img/character_arm_basket.svg'

type CharacterProps = {
    options: {
        direction?: string; 
        expression?: "normal" | "smiling" | "sad";
        hasBasket?: boolean;
        isWalking?: boolean;
        animating?: boolean;
    }
}

const Character = ({options}: CharacterProps) => {
    const {
        direction = "r", 
        expression = "normal",
        hasBasket = false,
        isWalking = false,
        animating = false
    } = options

    const image_body = require(`assets/img/character_body_${expression}.svg`).default
    const image_arm = hasBasket ? character_arm_basket : character_arm

    return (
        <div className={`character-wrapper ${direction} ${isWalking ? 'walking' : ''} ${animating ? 'animating' : ''}`}>
            <img className="character_part body" src={image_body} alt="" draggable="false" />
            <img className="character_part arm" src={image_arm} alt="" draggable="false" />
        </div>
    )
}

export default Character;