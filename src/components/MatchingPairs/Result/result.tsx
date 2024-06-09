import React, { useEffect, useState } from 'react';
import './result.css';

type Props = {
  time: number,
  formatTime: string,
  score: number,
  all: number,
  isNewLeader: boolean,
  leaderboard: { name: string, score: number, formatTime: string, time: number }[],
  setIsNewLeader: (boolean) => void,
  handleVisibility: (boolean) => void,
  setIsResultAdded: (boolean) => void,
  handleAdd: (leaderName: string) => void
}

function Result({ time, formatTime, score, all, leaderboard, isNewLeader, handleVisibility, setIsNewLeader, setIsResultAdded, handleAdd }: Props) {

  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value)
  }

  const handleClick = () => {
    if (username) {
      setIsNewLeader(false);//чтобы не добавили еще раз
      setIsResultAdded(true);
      handleAdd(username)
    }
  }

  return (
    <div className='result'>
      <div className='results'>
        <button className='button results-close' onClick={() => { handleVisibility(false) }}>X</button>
        <span>Таблица лидеров</span>
        <div className='leaderboard'>
          <div className='leaderboard-row'>
            <span>№</span>
            <span>Имя</span>
            <span>Ходы</span>
            <span>Время</span>
          </div>
          {
            leaderboard.map((item, index) => (

              <div className='leaderboard-row'>
                <span>{index + 1}</span>
                <span>{item.name}</span>
                <span>{item.score}</span>
                <span>{item.formatTime}</span>
              </div>)

            )
          }
        </div>

        <span>Ваш результат</span>
        <div className='results-current'>
          <div className='results-text'>
            <span>Ходы</span>
            {score}
          </div>
          <div className='results-text'>
            <span>Время</span>
            {formatTime}
          </div>
        </div>
        {isNewLeader &&
          <div>
            <label className='results-text'>
              Ваше имя
              <input type="text" name="name" required
                minLength={4} maxLength={8} size={10}
                value={username}
                onChange={handleChange}
              />
            </label>
            <button className='button' onClick={handleClick}>Добавить</button>
          </div>
        }
      </div>

    </div>
  );
}

export default Result;
