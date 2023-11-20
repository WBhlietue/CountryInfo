import { useRef } from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
    const input = useRef(null);
    function Click() {
        // fetch(
        //     "https://restcountries.com/v3.1/name/" + input.current.value
        // ).then((res) => {
        //     res.json().then((data) => {
        //         console.log(data);
        //         if(data.status == 404){
        //             alert("Error")
        //         }else{
        //             window.location = "?view=country&name="+data[0].cca2;
        //         }
        //     })
        // });
        fetch(
            "http://localhost:8000/countries/" + input.current.value
        ).then((res) => {
            res.json().then((data) => {
                console.log(data);
                if(data.status == 404 || data.length == 0){
                    alert("Error")
                }else{
                    window.location = "?view=country&name="+data[0].cca2;
                }
            })
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
                Search
            </div>
        </div>
    );
}
