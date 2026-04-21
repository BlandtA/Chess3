import React, { FunctionComponent } from "react";
import { Cell } from "../models/Cell";


interface CellProps{
    cell: Cell;
    selected: boolean; //Флаг (выбрана ячейка или нет)
    click: (cell: Cell) => void;
}

const CellComponent: FunctionComponent<CellProps> = ({cell: Cell, selected: selected, click}) => {
    return (
        <div
            className={`${['cell', Cell.color, selected ? "selected" : ''].join(' ')}
            ${Cell.available && Cell.figure ? "selectedForAttack" : ''}`}
            onClick={() => click(Cell)}
        >
            {Cell.available && !Cell.figure && <div className={"available"}/>}
            {Cell.figure?.logo && <img className="cell img" src={Cell.figure.logo}alt=""/>}
        </div>
    )
}

export default CellComponent