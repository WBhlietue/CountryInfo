import { useEffect, useState } from "react";
import "./CountryAbout.css";

export default function CountryAbout() {
    const searchParams = new URLSearchParams(window.location.search);
    let name = searchParams.get("name");
    const [flag, setFlag] = useState("");
    const [cName, setCname] = useState("");
    const [regeon, setRegeon] = useState("");
    const [population, setPopulation] = useState("");
    const [startOfWeek, setStartOfWeek] = useState("");
    const [timeZones, setTimeZones] = useState("");
    const [subRegeon, setSubRegeon] = useState("");
    const [fifa, setFifa] = useState("");
    const [area, setArea] = useState("");
    const [capital, setCapital] = useState("");
    const [map, setMap] = useState("");
    useEffect(() => {
        // fetch("https://restcountries.com/v3.1/alpha/" + name).then((res) => {

        // res.json().then((data) => {
        //     console.log(data);
        //         setFlag(data[0].flags.svg);
        //         setCname(data[0].name.official);
        //         setRegeon(data[0].region);
        //         setSubRegeon(data[0].subregion);
        //         setStartOfWeek(data[0].startOfWeek);
        //         setPopulation(data[0].population);
        //         setArea(data[0].area);
        //         setFifa(data[0].fifa);
        //         setCapital(data[0].capital);
        //         setTimeZones(data[0].timezones);
        //         setMap(data[0].maps.googleMaps);
        //     })
        // })

        fetch("http://localhost:8000/countries/" + name).then((res) => {
            res.json().then((data) => {
                console.log(data);
                setFlag(data[0].svg);
                setCname(data[0].officialName);
                setRegeon(data[0].region);
                setSubRegeon(data[0].subregion);
                setStartOfWeek(data[0].startOfWeek);
                setPopulation(data[0].population);
                setArea(data[0].area);
                setFifa(data[0].fifa);
                setCapital(data[0].capital);
                setTimeZones(data[0].timezones);
                setMap(data[0].maps);
            });
        });
    }, []);
    function Click() {
        window.open(map);
    }
    return (
        <div className="CountryAbout">
            <div className="CountryAbout-flag">
                <img src={flag}></img>
            </div>
            <div className="CountryAbout-">
                Name: <input id="cName" defaultValue={cName} />{" "}
            </div>
            <div className="CountryAbout-">
                Region: <input id="regeon" defaultValue={regeon} />{" "}
            </div>
            <div className="CountryAbout-">
                Sub Region: <input id="subRegeon" defaultValue={subRegeon} />{" "}
            </div>
            <div className="CountryAbout-">
                Population: <input id="population" defaultValue={population} />{" "}
            </div>
            <div className="CountryAbout-">
                Area: <input id="area" defaultValue={area} />{" "}
            </div>
            <div className="CountryAbout-">
                Capital: <input id="capital" defaultValue={capital} />{" "}
            </div>
            <div className="CountryAbout-">
                Start of Week: <input id="startOfWeek" defaultValue={startOfWeek} />{" "}
            </div>
            <div className="CountryAbout-">
                Time Zone: <input id="timeZones" defaultValue={timeZones} />{" "}
            </div>
            <div className="CountryAbout-">
                FIFA: <input id="fifa" defaultValue={fifa} />{" "}
            </div>
            <button
                onClick={() => {
                    Click();
                }}
            >
                View on GoogleMap
            </button>
            <br/>
            <button
                onClick={() => {
                    let data = {
                        officialName: document.getElementById("cName").value,
                        region: document.getElementById("regeon").value,
                        subregion: document.getElementById("subRegeon").value,
                        population: document.getElementById("population").value,
                        area: document.getElementById("area").value,
                        capital: document.getElementById("capital").value,
                        startOfWeek:
                            document.getElementById("startOfWeek").value,
                            timezones: document.getElementById("timeZones").value,
                        fifa: document.getElementById("fifa").value,
                    };
                    console.log(data);
                    fetch("http://localhost:8000/countries/" + name, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }).then((res) => {
                        res.json().then((data) => {
                            console.log(data);
                        })
                        window.location.reload();
                    });
                }}
            >
                Save Edit
            </button>
            <br/>
            <button
                onClick={() => {
                    fetch("http://localhost:8000/countries/" + name, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(() => {
                        window.location = "?view=main";
                    });
                }}
            >
                Delete
            </button>
            <br/>
            <button onClick={() => {
window.location = "?view=main";
            }}>Back</button>
        </div>
    );
}
