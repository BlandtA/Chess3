import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

const App = () => {
  const [board, setBoard] = useState(new Board()) //Состояние
  const [whitePlayer, setWitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restartGame()
    setCurrentPlayer(whitePlayer)
  }, [])

  function restartGame(){
    const newBoard = new Board();
    newBoard.ititCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="app">
      <Timer
        restart={restartGame}
        currensPlayer={currentPlayer}
      />
      <BoardComponent
      board={board}
      setBoard={setBoard}
      currentPlayer={currentPlayer}
      swapPlayer={swapPlayer}/>
      <div>
        <LostFigures
        title='Потерянные черные'
        figures={board.lostBlackFigures}/>
        <LostFigures
        title='Потерянные белые'
        figures={board.lostWhiteFigures}/>
      </div>
    </div>
  )
}

export default App;