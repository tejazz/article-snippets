import React from 'react';
import openSocket from 'socket.io-client';
import './App.scss';

var socket = openSocket('http://localhost:9890');

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      currentBtn: '',
    };
  }

  componentDidMount() {
    socket.on('latest tweets', this.mapTweetsToState);
  }

  stopStreaming = () => {
    this.setState({ currentBtn: 'stop' });
    socket.emit('stop stream', () => { });
  }

  startStreaming = () => {
    this.setState({ currentBtn: 'start' });
    socket.emit('start stream', () => { });
  }

  mapTweetsToState = (tweet) => {
    this.setState({
      tweets: this.state.tweets.concat(tweet),
    });
  }

  render() {
    return (
      <div className='MainContainer'>
        <button className={(this.state.currentBtn === 'start') ? 'ActionBtn ActionBtn--Active' : 'ActionBtn'} onClick={this.startStreaming}>Start Stream</button>
        <button className={(this.state.currentBtn === 'stop') ? 'ActionBtn ActionBtn--Active' : 'ActionBtn'} onClick={this.stopStreaming}>Stop Stream</button>

        <div className='TweetContainer'>
          {this.state.tweets.map((tweet) => {
            return (
              <div className='TweetItem'>
                <p className='TweetItem__User'>{tweet.user}</p>
                <p className='TweetItem__Text'>{tweet.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
