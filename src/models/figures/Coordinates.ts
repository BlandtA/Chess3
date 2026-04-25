import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure } from "./Figure";

export class CoordinatesNum extends Figure{
    constructor(color: Colors, cell: Cell, coordinatesNum: number){
        super(color, cell);
        this.coordinatesNum = coordinatesNum;
    }
}

export class CoordinatesChar extends Figure{
    constructor(color: Colors, cell: Cell, coordinatesNum: number){
        super(color, cell);
        const char: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
        this.coordinatesChar = char[coordinatesNum];
    }
}

export class CoordinatesZero extends Figure{
    constructor(color: Colors, cell: Cell, coordinatesZero: number){
        super(color, cell);
        this.coordinatesZero = coordinatesZero;
    }
}