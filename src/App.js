import { useEffect, useState } from "react";
import "./App.css";
import CountryAbout from "./Components/CountryAbout/CountryAbout";
import AddBar from "./Components/SearchBar/AddBar";
import SearchBar from "./Components/SearchBar/SearchBar";
import ViewPanel from "./Components/ViewPanel/ViewPanel";

function App() {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("view") == "country") {
        return (
            <div>
                <CountryAbout />
            </div>
        );
    } else {
        return (
            <div>
                <Main />
            </div>
        );
    }
}

function Main() {
    const [showData, setShowData] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        Get();
    }, []);

    function Get() {
        fetch("http://localhost:8000/countries").then((res) => {
            console.log(res);
            res.json().then((data) => {
                console.log(data);
                setTotal(data.length);
                let list = [];
                const searchParams = new URLSearchParams(
                    window.location.search
                );
                let page = searchParams.get("page");
                if (!page) {
                    page = "0";
                }

                page = parseInt(page);
                for (let i = page * 10; i < page * 10 + 10; i++) {
                    if (i < data.length) {
                        list.push(data[i]);
                    }
                }
                setShowData(list);
            });
        });
    }
    return (
        <div className="App">
            <SearchBar />
            <AddBar get={Get}/>
            <ViewPanel data={showData} />
            <Slide num={total / 10} />
        </div>
    );
}

function Slide(props) {
    const [right, sRight] = useState("<");
    const [left, sLeft] = useState(">");
    const searchParams = new URLSearchParams(window.location.search);
    let page = searchParams.get("page");
    if (!page) {
        page = "0";
    }
    page = parseInt(page) + 1;
    useEffect(() => {
        // alert("123")
        if (page == 1) {
            sRight("");
        } else {
            sRight("<");
        }
        if (page > props.num) {
            sLeft("");
        } else {
            sLeft(">");
        }
    }, [props.num]);
    return (
        <div className="slide">
            <div
                className="btnCursor"
                onClick={() => {
                    if (page > 1) {
                        window.location = "?view=main&page=" + (page - 2);
                    }
                }}
            >
                {right}
            </div>
            <div>{page}</div>
            <div
                className="btnCursor"
                onClick={() => {
                    if (page < props.num)
                        window.location = "?view=main&page=" + page;
                }}
            >
                {left}
            </div>
        </div>
    );
}

export default App;

