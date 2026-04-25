import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { CoordinatesChar, CoordinatesNum, CoordinatesZero } from "./figures/Coordinates";
import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board{
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []

    public addLostFigures(figure: Figure){
        figure.color === Colors.WHITE ?
        this.lostWhiteFigures.push(figure):
        this.lostBlackFigures.push(figure)
    }

    public ititCells(){
        for(let i = 0; i < 9; i++){
            const row: Cell[] = []
            for(let j = 0; j < 9; j++){
                if((i + j) % 2 ! == 0 && i != 0 && j != 0){
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                }
                else{
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                }
            }
            this.cells.push(row)
        }
    }

    public hightlightCells(selectedCell: Cell | null){
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i]
            for(let j = 0; j < row.length; j++){
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public getCopyBoard(): Board{
        const newBoard = new Board()
        newBoard.cells = this.cells
        newBoard.lostBlackFigures = this.lostBlackFigures
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        return newBoard
    }

    public getCell(x: number, y: number){
        return this.cells[y][x]
    }

    //Расстановка
    private addPawns(){
        for(let i = 1; i < 9; i++){
            new Pawn(Colors.BLACK, this.getCell(i, 2))
            new Pawn(Colors.WHITE, this.getCell(i, 7))
        }
    }

    private addRooks(){
        new Rook(Colors.BLACK, this.getCell(1, 1))
        new Rook(Colors.WHITE, this.getCell(1, 8))
        new Rook(Colors.BLACK, this.getCell(8, 1))
        new Rook(Colors.WHITE, this.getCell(8, 8))
    }

    private addBishops(){
        new Bishop(Colors.BLACK, this.getCell(2, 1))
        new Bishop(Colors.WHITE, this.getCell(2, 8))
        new Bishop(Colors.BLACK, this.getCell(7, 1))
        new Bishop(Colors.WHITE, this.getCell(7, 8))
    }

    private addKnights(){
        new Knight(Colors.BLACK, this.getCell(3, 1))
        new Knight(Colors.WHITE, this.getCell(3, 8))
        new Knight(Colors.BLACK, this.getCell(6, 1))
        new Knight(Colors.WHITE, this.getCell(6, 8))
    }

    private addQueens(){
        new Queen(Colors.BLACK, this.getCell(4, 1))
        new Queen(Colors.WHITE, this.getCell(4, 8))        
    }

    private addKings(){
        new King(Colors.BLACK, this.getCell(5, 1))
        new King(Colors.WHITE, this.getCell(5, 8))
    }

    private addCoordinates(){
        for(let i = 8; i > 0; i--){
            new CoordinatesNum(Colors.BLACK, this.getCell(0, i), 9-i)
            new CoordinatesChar(Colors.BLACK, this.getCell(i, 0), i-1)
            new CoordinatesZero(Colors.BLACK, this.getCell(0, 0), 64)
        }
    }

    public addFigures(){
        this.addCoordinates()
        this.addPawns()
        this.addRooks()
        this.addBishops()
        this.addKnights()
        this.addQueens()
        this.addKings()  
    }
}