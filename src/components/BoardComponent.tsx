import React, { FunctionComponent, useEffect, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";

interface BoardProps{
    board: Board
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent: FunctionComponent<BoardProps> = ({board: Board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    function click(cell: Cell){
        //Если мы нажимаем на ячейку с фигурой и эта фигура может ходить,
        // а текущая ячейка отлична от той на которую мы хотим походить
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        }
        else{
            if(cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell)
            }
        }
    }

    useEffect( () => {
        hightLightCells()
    }, [selectedCell])

    function hightLightCells(){
        Board.hightlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = Board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
    <div>
        <h3 className="font">Ход: {currentPlayer?.color}</h3>
        <div className="board">
            {Board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                    <CellComponent
                    click={click}
                    cell={cell}
                    key={cell.id}
                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
                    )}
                </React.Fragment>
            )}
        </div>
    </div>
    )
}

export default BoardComponent