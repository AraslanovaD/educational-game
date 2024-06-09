import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.css';

type Props = {
    words: {
        [key: string]: []
    }
}

const MainMenu = ({ words }: Props) => {
    return (
        <div className='menu'>
            <h1>Главное меню</h1>
            <div className='buttons'>
                <NavLink to='/matchup' className='link'>
                    <span>Сопоставление</span>
                </NavLink>
                <NavLink to='/matchingpairs'className='link'>
                    <span>Найти пару</span>
                </NavLink> 
            </div>
        </div>
    );
}

export default MainMenu;
