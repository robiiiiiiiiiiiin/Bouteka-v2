import React from 'react';

import character_l from 'assets/img/character_left.svg'
import character_r from 'assets/img/character.svg'
import character_r_basket from 'assets/img/character_wBasket.svg'
import character_r_basket_smiling from 'assets/img/character_wBasket_smiling.svg'

type CharacterProps = {
    options: {
        direction?: string; 
        isSmiling?: boolean;
        hasBasket?: boolean;
        isWalking?: boolean;
    }
}

const Character = ({options}: CharacterProps) => {
    const {
        direction = "r", 
        isSmiling = false,
        hasBasket = false,
        isWalking = false
    } = options

    const images = {character_l, character_r, character_r_basket, character_r_basket_smiling}
    const dynamicImageKey = `character_${direction}${hasBasket ? '_basket' : ''}${isSmiling ? '_smiling' : ''}`  as keyof typeof images;

    const image = Object.keys(images).includes(dynamicImageKey) ? images[dynamicImageKey] : images.character_l

    return (
        <div className={`character-wrapper ${direction} ${isWalking ? 'walking' : ''}`}>
            <img className="character" src={image} alt="" />
        </div>
    )
}

export default Character;