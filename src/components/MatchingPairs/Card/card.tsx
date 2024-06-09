import React, { useState } from 'react';
import './card.css';

type Props = {
    sorce: string,
    word: string,
    isFlipped: boolean
    onClick: (position: number) => void
    position: number
}

const Card = ({ sorce,word, isFlipped, position, onClick }: Props) => {
    const Clicked = () => {
        if (!isFlipped) {
            onClick(position);
        }
    };

    return (
        <div className='pairscard'>
            <img src={sorce} className='back' />
            {!isFlipped &&
                <div className='front' id={word} onClick={Clicked}></div>
            }

        </div>

    );
}



export default Card;