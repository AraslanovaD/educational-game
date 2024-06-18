import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.css';

type Props = {
    words: {
        [key: string]: []
    }
}

const MatchUpMenu = ({ words }: Props) => {
    return (
        <div className='menu'>
            <NavLink to='/educational-game' className='link back-to-menu'>
                <span>Назад</span>
            </NavLink>
            <h1>Сопоставление</h1>
            <p>Перетащите каждое слово рядом с его определением</p>
            <div className='buttons'>
                <NavLink to='/matchup/sea' className='link'>
                    <span>Морские животные</span>
                </NavLink>
                <NavLink to='/matchup/domestic' className='link'>
                    <span>Домашние животные</span>
                </NavLink>
                <NavLink to='/matchup/forest' className='link'>
                    <span>Лесные животные</span>
                </NavLink>
                <NavLink to='/matchup/savanna' className='link'>
                    <span>Животные саванны</span>
                </NavLink>
                <NavLink to='/matchup/fruits' className='link'>
                    <span>Фрукты</span>
                </NavLink>
                <NavLink to='/matchup/vegetables' className='link'>
                    <span>Овощи</span>
                </NavLink>
                <NavLink to='/matchup/berries' className='link'>
                    <span>Ягоды</span>
                </NavLink>
                <NavLink to='/matchup/dishes' className='link'>
                    <span>Куханные приборы</span>
                </NavLink>
                <NavLink to='/matchup/shapes' className='link'>
                    <span>Геометрические фигуры</span>
                </NavLink>
                <NavLink to='/matchup/colors' className='link'>
                    <span>Цвета</span>
                </NavLink>
            </div>
        </div>
    );
}

export default MatchUpMenu;
