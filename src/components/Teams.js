import React from "react";
import classes from "./Teams.module.css";

const Teams = (props) => {
  return (
    <table className={classes.contenttable}>
      <thead>
        <tr className={classes.header}>
          <th>Teams</th>
          <th>Conference</th>
        </tr>
      </thead>
      <tbody>
        <tr className={classes.name}>
          <td>{props.name}</td>
          <td>{props.conference}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Teams;
