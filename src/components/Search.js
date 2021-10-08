import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search = (props) => {
  const [filteredPlayer, setFilteredPlayers] = useState([]);
  const [enteredWord, setEnteredWord] = useState([]);

  const filterHandler = (event) => {
    const searchWord = event.target.value;
    setEnteredWord(searchWord);
    const newFilter = props.data.filter((value) => {
      return value.lastName.toLowerCase().includes(searchWord.toLowerCase()) || value.firstName.toLowerCase().includes(searchWord.toLowerCase()) ;
    });

    if (searchWord === "") {
      setFilteredPlayers([]);
    } else {
    }
    setFilteredPlayers(newFilter);
  };

  const clearInput = () =>{
    setFilteredPlayers([]);
    setEnteredWord("");
  };

  return (
    <Fragment>
    <div className={classes.head}>
      <h1>NBA SEARCH</h1>
    </div>
    <div className={classes.search}>
      <div className={classes.searchInputs}>
        <input
          type="text"
          placeholder={props.placeholder}
          value={enteredWord}
          onChange={filterHandler}
        />
        <div className={classes.searchIcon}>
          {filteredPlayer.length === 0 ? (
          <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredPlayer.length !== 0 && (
        <div className={classes.dataResult}>
          {filteredPlayer.slice(0, 15).map((value, key) => {
            return (
              <Link to={`stats/${value.id}`} className={classes.dataItem} key={value.id} >
                <p> {value.firstName} {value.lastName}  </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
    </Fragment>
  );
};

export default Search;
