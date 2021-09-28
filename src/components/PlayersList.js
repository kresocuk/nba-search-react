import React from 'react';
import Players from './Players';

const PlayersList = (props) => {
  return (
    <ul>
      {props.players.map((player) => (
        <Players
          first={player.firstname}
          name={player.lastname}
        />
      ))}
    </ul>
  );
};

export default PlayersList;