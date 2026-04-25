import logo from '../../assets/black-bishop.png'
import { Cell } from '../Cell';
import { Colors } from "../Colors";

export enum FigureNames{
    FIGURE = "Фигура",
    BISHOP = "Слон",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
}

export class Figure{
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;
    coordinatesNum: number| null
    coordinatesChar: string| null
    coordinatesZero: number| null

    constructor(color: Colors, cell: Cell){
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
        this.coordinatesNum = null;
        this.coordinatesChar = null;
        this.coordinatesZero = null;
    }

    canMove(target: Cell) : boolean{
        if(target.figure?.color === this.color){
           return false 
        }
        if(target.figure?.name === FigureNames.KING){
            return false
        }
        if(target.x == 0 || target.y == 0){
            return false
        }
        return true;
    }
    
    moveFigure(target: Cell){}
}