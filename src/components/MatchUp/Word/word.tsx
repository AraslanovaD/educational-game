import React from 'react';
import './word.css';

type Props = {
  word: string,
  isRight: boolean,
  isChecked: boolean,
  handleDragging: (dragging: boolean) => void
}

function Word({ word, isRight, isChecked, handleDragging }: Props) {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${word}`);
    handleDragging(true);
  }

  const handleDragEnd = () => handleDragging(false)

  return (
    <div
      className={`word ${isChecked? (isRight ? 'right' : 'wrong'):''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span>{word}</span>
    </div>
  );
}

export default Word;
