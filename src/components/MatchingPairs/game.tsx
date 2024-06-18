import './game.css';
import Card from './Card/card.tsx'
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import StopWatch from '../StopWatch/stopwatch.tsx';
import Result from './Result/result.tsx';
type Props = {
  words: { image: string, word: string }[],
  isYellow?: boolean,
  isGreen?: boolean,
  isBlue?: boolean,
  isPink?: boolean,
  isBeige?: boolean
  storageKey: string,
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

const Game = ({ words, isYellow, isGreen, isBlue, isPink, isBeige, storageKey }: Props) => {
  const [cards, setCards] = useState<{ image: string, word: string }[]>(shuffle(words.concat(words)));

  const [isShown, setIsShown] = useState(false);
  const [lock, setLock] = useState(false);
  const [isNewLeader, setIsNewLeader] = useState(false);
  const [isResultAdded, setIsResultAdded] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [flippedCards, setFlippedCards] = useState(Array(cards.length).fill(false));

  const [openCards, setOpenCards] = useState<[{ image: string, word: string }, number][]>([]);

  const [foundPairsCount, setFoundPairsCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [place, setPlace] = useState(0);

  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, formatTime } = StopWatch(0)

  const [leaderboard, setLeaderboard] = useState<{ name: string, score: number, formatTime: string, time: number }[]>([]);

  const CheckIsNewLeader = () => {
    for (let i = 0; i < 10; i++) {
      if (leaderboard[i].name) {
        if (timer <= leaderboard[i].time && moves <= leaderboard[i].score) {
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
    leaderboard.splice(place, 0, { name: leaderName, score: moves, formatTime: formatTime(), time: timer });
    leaderboard.pop();
    window.localStorage.setItem(storageKey, JSON.stringify(leaderboard));
  }

  const handleResults = (state: boolean) => {
    CheckIsNewLeader();
    setIsShown(state)
  }

  const checkFlippedCards = () => {
    let [firstCard, secondCard] = openCards;

    if (firstCard[0].word === secondCard[0].word) {
      setFoundPairsCount(foundPairsCount + 1);
    }
    else {
      flippedCards[firstCard[1]] = false;
      flippedCards[secondCard[1]] = false;
    }

    setTimeout(() => {
      setOpenCards([]);
      setLock(false);
    }, 1000);
  }

  const Flip = (position) => {
    if (!lock) {
      if (openCards.length === 0) {
        flippedCards[position] = true;
        setOpenCards([[cards[position], position]]);
      }
      else {
        setMoves(moves + 1);
        flippedCards[position] = true;
        setOpenCards((prev) => [...prev, [cards[position], position]]);
        setLock(true);
      }
    }
  }

  useEffect(() => {
    if (openCards.length === 2) {   
      checkFlippedCards();
    }

  }, [openCards]);

  
  useEffect(() => {
    if (foundPairsCount === words.length) {
      handlePause();
      setIsFinished(true)
    }
  }, [foundPairsCount])


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

  const GameRestart = () => {
    setLock(false);
    setCards(shuffle(cards));
    setFlippedCards(Array(cards.length).fill(false));
    setMoves(0);
    setFoundPairsCount(0);
    handleReset();
    handleStart();
    setIsNewLeader(false);
    setIsResultAdded(false);
    setIsFinished(false)
  }

  let cardsShow = cards.map((card, position) => {
    return <Card key={position} sorce={card.image} word={card.word} position={position} onClick={Flip} isFlipped={flippedCards[position]} />
  })

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
        score={moves}
        all={words.length}
        isNewLeader={(isNewLeader && !isResultAdded)}
        leaderboard={leaderboard}
        handleVisibility={handleResults}
        setIsNewLeader={setIsNewLeader}
        setIsResultAdded={setIsResultAdded}
        handleAdd={handleAdd}
      />}

      {formatTime()}
      {isActive && <button className='button' onClick={handlePause}>Пауза</button>}
      {isPaused && <button className='button' onClick={handleResume}>Продолжить</button>}


      <NavLink to='/matchingpairs' className='button back-to-menu'>
        <span  >Назад</span>
      </NavLink>

      {isActive && <p>Ходы: {moves}</p>}

      <div className={`game ${!isFinished?'active':''}`}>
        {cardsShow}
      </div>
      {isFinished && <button className='button' onClick={GameRestart}>Попробовать еще раз</button>}
      {isFinished  && <button className='button' onClick={() => { handleResults(true) }}>Таблица лидеров</button>}
    </div>
  );
}

export default Game;