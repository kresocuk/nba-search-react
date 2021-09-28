import React from 'react';
import Teams from './Teams';

const TeamsList = (props) => {
  return (
    <ul>
      {props.teams.map((team) => (
        <Teams
          key={team.id}
          conference={team.conference}
          name={team.name}
        />
      ))}
    </ul>
  );
};

export default TeamsList;