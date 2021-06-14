import './Decor.scss'
import React from 'react';

import grass from 'assets/img/grass.svg'
import treeSmall from 'assets/img/tree_1_small.svg'
import treeBig from 'assets/img/tree_1_big.svg'

const Decor = ({index = 1}) => {

    const grasses = []
    for (let i = 1; i <= 4; i++) {
        grasses.push(
            <img key={`grass_${i}`} className="grass" src={grass} alt="" />
        )
    }

    return (
        <div className="decor" style={{'--index': index-1}} >
            <img className="tree" src={treeBig} alt="" />
            <div className="grasses" >
                { grasses }
            </div>
        </div>
    )
}

export default Decor;