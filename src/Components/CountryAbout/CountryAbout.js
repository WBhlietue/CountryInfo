import { useEffect, useState } from "react";
import "./CountryAbout.css"

export default function CountryAbout(){
    const searchParams = new URLSearchParams(window.location.search);
    let name = searchParams.get("name");
    const [flag, setFlag] = useState("")
    const [cName, setCname] = useState("")
    const[regeon, setRegeon] = useState("")
    const [population, setPopulation] = useState("")
    const [startOfWeek, setStartOfWeek] = useState("")
    const [timeZones, setTimeZones] = useState("");
    const [subRegeon, setSubRegeon] = useState("")
    const [fifa, setFifa] = useState("");
    const [area, setArea] = useState("");
    const [capital, setCapital] = useState("")
    const [map, setMap] = useState("")
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/alpha/" + name).then((res) => {
            
        res.json().then((data) => {
            console.log(data);
                setFlag(data[0].flags.svg);
                setCname(data[0].name.official);
                setRegeon(data[0].region);
                setSubRegeon(data[0].subregion);
                setStartOfWeek(data[0].startOfWeek);
                setPopulation(data[0].population);
                setArea(data[0].area);
                setFifa(data[0].fifa);
                setCapital(data[0].capital);
                setTimeZones(data[0].timezones);
                setMap(data[0].maps.googleMaps);
            })
        })   
    }, [])
    function Click(){
        window.open(map);
    }
    return (
        <div className="CountryAbout">
            <div className="CountryAbout-flag"><img src={flag}></img></div>
            <div className="CountryAbout-">Name: {cName}</div>
            <div className="CountryAbout-">Region: {regeon}</div>
            <div className="CountryAbout-">Sub Region: {subRegeon}</div>
            <div className="CountryAbout-">Population: {population}</div>
            <div className="CountryAbout-">Area: {area}</div>
            <div className="CountryAbout-">Capital: {capital}</div>
            <div className="CountryAbout-">Start of Week: {startOfWeek}</div>
            <div className="CountryAbout-">Time Zone: {timeZones}</div>
            <div className="CountryAbout-">FIFA: {fifa}</div>
            <button onClick={() => {
Click();
            }}>View on GoogleMap</button>
        </div>
    )
}