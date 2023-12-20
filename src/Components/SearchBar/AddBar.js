import { useRef } from "react";
import "./SearchBar.css";

export default function AddBar(props) {
    const input = useRef(null);
    function Click() {
        fetch(
            "https://restcountries.com/v3.1/name/" + input.current.value
        ).then((res) => {
            res.json().then((data) => {
                console.log(data);
                console.log(data[0].languages[0]);
                if (data.status == 404) {
                    alert("Error");
                } else {
                    let da = {
                        officialName: "",
                        svg: "",
                        region: "",
                        subregion: "",
                        startOfWeek: "",
                        population: "",
                        area: "",
                        fifa: "",
                        capital: "",
                        timezones: "",
                        map: "",
                        cca2:""
                    };
                    da.officialName = data[0].name.official;
                    da.svg = data[0].flags.svg;
                    da.region = data[0].region;
                    da.subregion = data[0].subregion;
                    da.startOfWeek = data[0].startOfWeek;
                    da.population = data[0].population;
                    da.area = data[0].area;
                    da.fifa = data[0].fifa;
                    da.capital = data[0].capital[0];
                    da.timezones = data[0].timezones.join(",");
                    da.map = data[0].maps.googleMaps;
                    da.cca2 = data[0].cca2;
                    fetch("http://127.0.0.1:8000/countries", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(da),
                    }).then((x) => {
                        x.json().then((d) => {
                            console.log(d);
                            props.get()
                        })
                        
                    });
                    // window.location = "?view=country&name="+data[0].cca2;
                }
            });
        });
    }
    return (
        <div className="searchBar">
            <input
                ref={input}
                placeholder="Enter ..."
                className="searchBar-input"
            ></input>
            <div
                className="searchBar-btn center"
                onClick={() => {
                    Click();
                }}
            >
                Add
            </div>
        </div>
    );
}
