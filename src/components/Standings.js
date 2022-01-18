import { useCallback, useEffect, useState } from "react";

const Standings = () =>{

    useEffect(() =>{
        fetchStandingsHandler();
    }, []);
    
    const [standings, setStandings] = useState([]);
    
    
    const fetchStandingsHandler = useCallback(async () =>{

        const response = await fetch("https://api-nba-v1.p.rapidapi.com/standings/league/2021", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                "x-rapidapi-key": "e1fcab19f8msh7f15d7ecd2e3288p1a702cjsnd1d443f178c8"
            }
        })
        const stand = await response.json();
        setStandings(stand);
    })
    
    console.log(standings);


};

export default Standings;