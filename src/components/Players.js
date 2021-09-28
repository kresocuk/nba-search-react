import React from "react";
import classes from "./Teams.module.css";

const Players = (props) => {
  return (
    <table className={classes.contenttable}>
      <thead>
        <tr className={classes.header}>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classes.name}>
          <td>{props.first}</td>
          <td>{props.last}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Players;
