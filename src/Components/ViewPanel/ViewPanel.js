import CountryCard from "../CountryCard/CountryCard"
import "./ViewPanel.css"
export default function ViewPanel(props){
    return (
        <div className="ViewPanel">
         {props.data.map((i) => {
            return <CountryCard data={i}/>
         })}
        </div>
    )
}