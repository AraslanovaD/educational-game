import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.css';

type Props = {
    words: {
        [key: string]: []
    }
}

const MatchingPairsMenu = ({ words }: Props) => {
    return (
        <div className='menu'>
            <NavLink to='/' className='link back-to-menu'>
                <span>Назад</span>
            </NavLink>
            <h1>Найти пару</h1>
            <div className='buttons'>
                <NavLink to='/matchingpairs/sea' className='link'>
                    <span>Морские животные</span>
                </NavLink>
                <NavLink to='/matchingpairs/domestic' className='link'>
                    <span>Домашние животные</span>
                </NavLink>
                <NavLink to='/matchingpairs/forest' className='link'>
                    <span>Лесные животные</span>
                </NavLink>
                <NavLink to='/matchingpairs/savanna' className='link'>
                    <span>Животные саванны</span>
                </NavLink>
                <NavLink to='/matchingpairs/fruits' className='link'>
                    <span>Фрукты</span>
                </NavLink>
                <NavLink to='/matchingpairs/vegetables' className='link'>
                    <span>Овощи</span>
                </NavLink>
                <NavLink to='/matchingpairs/berries' className='link'>
                    <span>Ягоды</span>
                </NavLink>
                <NavLink to='/matchingpairs/dishes' className='link'>
                    <span>Куханные приборы</span>
                </NavLink>
                <NavLink to='/matchingpairs/shapes' className='link'>
                    <span>Геометрические фигуры</span>
                </NavLink>
                <NavLink to='/matchingpairs/colors' className='link'>
                    <span>Цвета</span>
                </NavLink>
            </div>
        </div>
    );
}

export default MatchingPairsMenu;
