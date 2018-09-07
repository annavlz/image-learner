import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';

class App extends Component {

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    this.imageSrc = this.webcam.getScreenshot();
    console.log("GOT IT")
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Webcam audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350}
            />
            <button onClick={this.capture}>Capture photo</button>
          </div>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <img src={this.imageSrc} />
        </div>
      </div>
    );
  }
}

export default App;
