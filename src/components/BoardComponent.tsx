import React, { FunctionComponent, useEffect, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void
}

const BoardComponent: FunctionComponent<BoardProps> = ({board: Board, setBoard}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell){
        //Если мы нажимаем на ячейку с фигурой и эта фигура может ходить,
        // а текущая ячейка отлична от той на которую мы хотим походить
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
        }
        else{
        setSelectedCell(cell)
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
    )
}

export default BoardComponent