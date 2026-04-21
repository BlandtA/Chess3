import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';

const App = () => {
  const [board, setBoard] = useState(new Board()) //Состояние

  useEffect(() => {
    restartGame()
  }, [])

  function restartGame(){
    const newBoard = new Board();
    newBoard.ititCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  return (
    <div className="app">
      <BoardComponent
      board={board}
      setBoard={setBoard}/>
    </div>
  )
}

export default App;