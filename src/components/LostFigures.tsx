import { FunctionComponent } from "react"
import { Figure } from "../models/figures/Figure"

interface LostFiguresProps{
    title: string
    figures: Figure[]
}
const LostFigures: FunctionComponent<LostFiguresProps> = ({title, figures}) =>{
    return (
        <div className="lost">
            <h3>{title}</h3>
            {figures.map(figure =>
                <label key={figure.id}>
                    {figure.logo && <img width={40} height={40} src={figure.logo}/>}
                </label>
            )}
        </div>
    )
}

export default LostFigures