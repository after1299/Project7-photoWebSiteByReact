import React, {useState} from 'react';
import Search from "../components/Search"
import Picture from '../components/Picture';

const Homepage = () => {
    let [input, setInput] = useState("");
    const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;
    const auth = "563492ad6f91700001000001bb3fccf57572421e8bdd03bc8241e39a";
    const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    let [data, setData] = useState(null);
    const search = async() => {
        const dataFetch = await fetch(initialURL, {
            method: "GET", 
            headers: {
                Accept: "application/json",
                Authorization: auth
            }
        });
        let parseData = await dataFetch.json();
        setData(parseData.photos);
        // console.log(parseData);
    }
    return (
        <div style={{minHeight: "100vh"}}>
            <Search search={search}/>
            <div className="pictures">
                {data && data.map((d) => { 
                    // data will be null in the initial. Hence, "map" function will been error.
                    // Therefore, we need add "data &&" to determine whether the data exist.
                    // If it is false, map function will not be executed. 
                    return <Picture data={d}/>
                })}
            </div>
        </div>
    )
}

export default Homepage