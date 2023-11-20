import { useEffect } from "react";
import "./CountryCard.css";
export default function CountryCard(props) {
    useEffect(() => {
        console.log(props.data);
    }, []);
    return (
        <div className="CountryCard" onClick={() => {
            window.location = "?view=country&name="+props.data.cca2;
        }}>
            <div className="CountryCard-flag">
                <img src={props.data.svg}></img>
            </div>
            <div className="CountryCard-text">
                <div>
                    <b>{props.data.officialName}</b>
                </div>
                <div>{props.data.population} хүн амтай</div>
                <div>{props.data.cca2} </div>
            </div>
            <div className="CountryCard-view center">&#11166;</div>
        </div>
    );
}
