import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Menu from './components/Menus/mainMenu.tsx'

import MatchUpMenu from './components/Menus/matchupMenu.tsx'
import MatchUp from './components/MatchUp/game.tsx'

import MatchingPairsMenu from './components/Menus/matchingPairsMenu.tsx'
import MatchingPairs from './components/MatchingPairs/game.tsx'

type Props = {
  words: { [key: string]: [] }
}

function App({ words }: Props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu words={words} />} />

          <Route path='/matchingpairs' element={<MatchingPairsMenu words={words} />} />
          <Route path='/matchingpairs/sea' element={<MatchingPairs words={words.sea} isBlue={true} storageKey='matchingSea'/>} />
          <Route path='/matchingpairs/domestic' element={<MatchingPairs words={words.domestic} isBeige={true} storageKey='matchingDomestic'/>} />
          <Route path='/matchingpairs/forest' element={<MatchingPairs words={words.forest} isGreen={true} storageKey='matchingForest'/>} />
          <Route path='/matchingpairs/savanna' element={<MatchingPairs words={words.savanna} isYellow={true} storageKey='matchingSavanna'/>} />
          <Route path='/matchingpairs/fruits' element={<MatchingPairs words={words.fruits} isPink={true} storageKey='matchingFruits'/>} />
          <Route path='/matchingpairs/vegetables' element={<MatchingPairs words={words.vegetables} isGreen={true} storageKey='matchingVegetables'/>} />
          <Route path='/matchingpairs/berries' element={<MatchingPairs words={words.berries} isPink={true} storageKey='matchingBerries'/>} />
          <Route path='/matchingpairs/dishes' element={<MatchingPairs words={words.dishes} isBeige={true} storageKey='matchingDishes'/>} />
          <Route path='/matchingpairs/shapes' element={<MatchingPairs words={words.shapes} isBlue={true} storageKey='matchingShapes'/>} />
          <Route path='/matchingpairs/colors' element={<MatchingPairs words={words.colors} isYellow={true} storageKey='matchingcolors'/>} />

          <Route path='/matchup' element={<MatchUpMenu words={words} />} />
          <Route path='/matchup/sea' element={<MatchUp words={words.sea} isBlue={true} storageKey='matchSea'/>} />
          <Route path='/matchup/domestic' element={<MatchUp words={words.domestic} isBeige={true} storageKey='matchDomestic'/>} />
          <Route path='/matchup/forest' element={<MatchUp words={words.forest} isGreen={true} storageKey='matchForest'/>} />
          <Route path='/matchup/savanna' element={<MatchUp words={words.savanna} isYellow={true} storageKey='matchSavanna'/>} />
          <Route path='/matchup/fruits' element={<MatchUp words={words.fruits} isPink={true} storageKey='matchFruits'/>} />
          <Route path='/matchup/vegetables' element={<MatchUp words={words.vegetables} isGreen={true} storageKey='matchVegetables'/>} />
          <Route path='/matchup/berries' element={<MatchUp words={words.berries} isPink={true} storageKey='matchBerries'/>} />
          <Route path='/matchup/dishes' element={<MatchUp words={words.dishes} isBeige={true} storageKey='matchDishes'/>} />
          <Route path='/matchup/shapes' element={<MatchUp words={words.shapes} isBlue={true} storageKey='matchShapes'/>} />
          <Route path='/matchup/colors' element={<MatchUp words={words.colors} isYellow={true} storageKey='matchColors'/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
