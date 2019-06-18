import React from 'react';
import ReactDOM from 'react-dom';
import {Players} from './../imports/api/players';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';


const renderPlayers = (playerList) => playerList.map((player) => {
  return (
    <p key={player._id}>
    {player.name} has score {player.score}
    <button onClick = {() => Players.update(player._id,{$inc:{score:1}})}>+</button>
    <button onClick = {() => Players.update(player._id,{$inc:{score:-1}})}>-</button>
    <button onClick = {() => Players.remove(player._id)}>X</button>
    </p>
  );
})

const handleSubmit = (event) => {
  let playerName = event.target.playerName.value;
  event.preventDefault();
  if(playerName){
    event.target.playerName.value = '';
    Players.insert({
      name:playerName,
      score:0
    });
  }
}


Meteor.startup( () => {
  Tracker.autorun(() => {
    let players = Players.find().fetch();
    let jsx = (
      <div>
      {renderPlayers(players)}
      <form onSubmit = {handleSubmit}>
      <input type="text" name="playerName" placeholder="Player Name"/>
      <button>Add Player</button>
      </form>
      </div>
    )
    ReactDOM.render(jsx,document.getElementById('app'));
  })
})
