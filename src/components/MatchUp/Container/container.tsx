import React from 'react';
import './container.css';
import Word from '../Word/word.tsx';

type Props = {
  word: string,
  isDragging: boolean,
  isRight: boolean,
  isChecked: boolean,
  handleUpdateList: (pickedWord: string, word: string) => void,
  handleDragging: (dragging: boolean) => void
}

function Container({ word, isDragging, isRight, isChecked, handleDragging, handleUpdateList }: Props) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); }
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const pickedWord = e.dataTransfer.getData('text')

    handleUpdateList(pickedWord, word);
    handleDragging(false);
  }

  return (
    <div
      className={`container ${isDragging ? 'container-dragging' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleOnDrop}
    >
      <Word word={word} handleDragging={handleDragging}
        isRight={isRight}
        isChecked={isChecked}
      />
    </div>
  );
}

export default Container;
