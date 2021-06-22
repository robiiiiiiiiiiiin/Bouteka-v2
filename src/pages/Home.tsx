import './Home.scss';

import React, { useState } from 'react';
import { History } from 'history';

import cloud from 'assets/img/cloud.svg'
import sun from 'assets/img/sun.svg'
import world_bg from 'assets/img/world_bg.png'
import world_fg from 'assets/img/world_fg.png'

import Character from 'components/Character'

import { useTranslation } from 'react-i18next';

type HomeProps = {
    history: History;
}

const Home = React.forwardRef<HTMLDivElement, HomeProps>((props, ref) => {
    const { t } = useTranslation();
    const [animated, setAnimated] = useState(false)
    const [characterWalking, setCharacterWalking] = useState(false)

    const animate = () => {
        setAnimated(true)
        setTimeout(() => {
            setCharacterWalking(true)
        }, 1350)
        setTimeout(() => {
            setCharacterWalking(false)
            props.history.push('/baskets')
        }, 3350)
    }

    return (
        <div ref={ref} className="page home" onClick={animate}>
            <main className={`wrapper ${animated ? 'animated' : ''}`}>
                <div className="cloud-wrapper">
                    <img className="cloud" src={cloud} alt="" />
                </div>
                <div className="sun-wrapper">
                    <img className="sun" src={sun} alt="" />
                </div>
                <div role="img" className="composed-img world">
                    <img className="bg" src={world_bg} alt="" />
                    <Character options={{direction: 'l', isWalking: characterWalking}} />
                    <img className="fg" src={world_fg} alt="" />
                </div>
                <div className="text">{t('clickOnWorld')}</div>
            </main>
        </div>
    )
})

export default Home;