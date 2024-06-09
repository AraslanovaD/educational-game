import React, { useEffect, useState } from 'react';
import './game.css';
import Card from './Card/card.tsx';
import { NavLink } from 'react-router-dom';
import StopWatch from '../StopWatch/stopwatch.tsx';
import Result from './Result/result.tsx';

type Props = {
  words: { image: string, word: string }[],
  isYellow?: boolean,
  isGreen?: boolean,
  isBlue?: boolean,
  isPink?: boolean,
  isBeige?: boolean,
  storageKey: string
}
//Fisher-Yates shuffle algorithm
const shuffle = (array) => {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function Game({ words, isYellow, isGreen, isBlue, isPink, isBeige, storageKey }: Props) {
  const CreateList = () => {
    let allWords: string[] = [];

    words.map((card) => {
      allWords.push(card.word);
    })
    allWords = shuffle(allWords);

    let newList: { image: string, word: string }[] = [];
    allWords.map((word, index) => {
      newList.push({ image: words[index].image, word: word })
    })
    return newList;
  }

  const [isNewLeader, setIsNewLeader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isResultAdded, setIsResultAdded] = useState(false);
  const [rightCards, setRightCards] = useState(Array(words.length).fill(false));

  const [cardsList, setCardsList] = useState<{ image: string, word: string }[]>(CreateList());

  const [right, setRight] = useState(0);
  const [place, setPlace] = useState(0);

  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, formatTime } = StopWatch(0)



  const [leaderboard, setLeaderboard] = useState<{ name: string, score: number, formatTime: string, time: number }[]>([]);

  const handleResults = (state: boolean) => {
    CheckIsNewLeader();
    setIsShown(state)
  }

  const handleDragging = (dragging: boolean) => {
    if (!isChecked) {
      setIsDragging(dragging);
    }
  }

  const handleUpdateList = (pickedWord: string, swappedWord: string) => {
    let droppedInto = cardsList.find(item => item.word === swappedWord)
    let pickedFrom = cardsList.find(item => item.word === pickedWord)

    if (droppedInto && swappedWord !== pickedWord && pickedFrom) {
      droppedInto.word = pickedWord;
      pickedFrom.word = swappedWord;
    }
  }

  const CheckIsNewLeader = () => {
    for (let i = 0; i < 10; i++) {
      console.log(leaderboard[i].name)
      if (leaderboard[i].name) {
        if (timer <= leaderboard[i].time && right >= leaderboard[i].score) {
          console.log(leaderboard[i].time, leaderboard[i].score)
          setIsNewLeader(true);
          setPlace(i);
          break
        }
      } else {
        setIsNewLeader(true);
        setPlace(i);
        break
      }
    }
  }

  const handleAdd = (leaderName: string) => {
    leaderboard.splice(place, 0, { name: leaderName, score: right, formatTime: formatTime(), time: timer });
    leaderboard.pop();
    window.localStorage.setItem(storageKey, JSON.stringify(leaderboard));
  }

  const CheckWords = () => {
    let lenght = words.length;
    for (let i = 0; i < lenght; i++) {
      if (words[i].word === cardsList[i].word) {
        setRight(right => right + 1);
        rightCards[i] = true;
      }
    }
    setIsVisible(true);
    setIsChecked(true);
    handlePause();
  }

  const GameRestart = () => {
    setCardsList(CreateList);
    setRight(0);
    setIsVisible(false);
    setIsChecked(false);
    setRightCards(Array(words.length).fill(false));
    handleReset();
    handleStart();
    setIsNewLeader(false);
    setIsResultAdded(false);
  }

  const SetDefault = () => {
    setLeaderboard([
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 },
      { name: '', score: 0, formatTime: '', time: 0 }])
  }

  useEffect(() => {
    handleStart();

    let storage = window.localStorage.getItem(storageKey);
    if (storage) {
      setLeaderboard(JSON.parse(storage));
    } else {
      SetDefault();
    }


  }, [])



  return (
    <div className={`
    ${isYellow ? 'yellow' : ''}
    ${isGreen ? 'green' : ''}
    ${isBlue ? 'blue' : ''}
    ${isPink ? 'pink' : ''}
    ${isBeige ? 'beige' : ''}
    `
    }>

      {isShown && <Result
        time={timer}
        formatTime={formatTime()}
        score={right}
        all={words.length}
        isNewLeader={(isNewLeader && !isResultAdded)}
        leaderboard={leaderboard}
        handleVisibility={handleResults}
        setIsNewLeader={setIsNewLeader}
        setIsResultAdded={setIsResultAdded}
        handleAdd={handleAdd}
      />}

      <NavLink to='/matchup' className='button back-to-menu'>
        <span >Назад</span>
      </NavLink>

      {formatTime()}
      {isActive && <button className='button' onClick={handlePause}>Пауза</button>}
      {isPaused && !isVisible && <button className='button' onClick={handleResume}>Продолжить</button>}

      {(isActive || isChecked) && <div className='field'>
        {cardsList.map((card, index) => {
          return (<Card
            key={index}
            card={card}
            isDragging={isDragging}
            handleDragging={handleDragging}
            handleUpdateList={handleUpdateList}
            isRight={rightCards[index]}
            isChecked={isChecked}
          />)
        })}

      </div>}

      {!isVisible && isActive && <button className='button' onClick={CheckWords}>Проверить</button>}
      {isVisible && <button className='button' onClick={GameRestart}>Попробовать еще раз</button>}
      {isVisible && <button className='button' onClick={() => { handleResults(true) }}>Таблица лидеров</button>}


    </div>
  );
}

export default Game;
