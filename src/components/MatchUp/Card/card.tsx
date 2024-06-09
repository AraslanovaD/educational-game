import React, { useState } from 'react';
import Container from '../Container/container.tsx';
import './card.css';

type Props = {
  card: {
    image: string,
    word: string
  },
  isDragging: boolean,
  isRight: boolean,
  isChecked: boolean
  handleDragging: (dragging: boolean) => void
  handleUpdateList: (pickedWord: string, word: string) => void
}

function Card({ card, isRight, isChecked, isDragging, handleDragging, handleUpdateList }: Props) {
  return (
    <div className='card'>
      <img src={card.image} />
      <Container word={card.word}
        isDragging={isDragging}
        handleDragging={handleDragging}
        handleUpdateList={handleUpdateList}
        isRight={isRight}
        isChecked={isChecked}
      />
    </div>
  );
}

export default Card;
