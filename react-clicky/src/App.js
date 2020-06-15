import React, { Component } from 'react';
import Card from './components/Card';
import Wrapper from './components/Wrapper';
import Score from './components/Score';
import teams from './cards.json';
import './App.css';

class App extends Component {
  // Setting this.state.teams to the cards json array
  state = {
    teams,
    clickedTeamIds: [],
    score: 0,
    goal: 8,
    status: '',
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = (id) => {
    let clickedTeamIds = this.state.clickedTeamIds;

    if (clickedTeamIds.includes(id)) {
      this.setState({
        clickedTeamIds: [],
        score: 0,
        status: 'Game Over! You lost. Click to play again!',
      });
      return;
    } else {
      clickedTeamIds.push(id);

      if (clickedTeamIds.length === 8) {
        this.setState({
          score: 8,
          status: 'You Won! Great Job, Smartie! Click to play again!',
          clickedTeamIds: [],
        });
        console.log('You Win');
        return;
      }

      this.setState({
        teams,
        clickedTeamIds,
        score: clickedTeamIds.length,
        status: ' ',
      });

      for (let i = teams.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [teams[i], teams[j]] = [teams[j], teams[i]];
      }
    }
  };

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Clicky Game</h1>
          <p className="App-intro">Try not to click the same image twice!</p>
        </header>
        <Score total={this.state.score} goal={8} status={this.state.status} />
        <Wrapper>
          {this.state.teams.map((team) => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={team.id}
              key={team.id}
              image={team.image}
            />
          ))}
        </Wrapper>
        <footer></footer>
      </div>
    );
  }
}

export default App;
