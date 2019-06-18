import React from 'react';
import ReactDOM from 'react-dom';
import {Players} from './../imports/api/players';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';


const renderPlayers = function (playerList) {
  return playerList.map(function(player){
    return <p key={player._id}>Player {player.name} has score {player.score}</p>;
  });
};

Meteor.startup(function() {
  // Players.remove({});
  Tracker.autorun(() => {
    let players = Players.find().fetch();
    let jsx = (<div>{renderPlayers(players)}</div>);
    ReactDOM.render(jsx, document.getElementById('app'));
  });

  Players.insert({
    name:'Edward',
    score:2
  });
  console.log(Players.find().fetch());

});
