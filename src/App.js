import React, { Component } from 'react';
import './App.css';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';


const loadMobilenet = async () => {
  const mobilenet = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  return tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      tab: 0
    }
  };


  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = async () => {
    const {video, image} = this.webcam.getScreenshot();
    this.setState({image})
    const screenshot = tf.fromPixels(video).expandDims(0).toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    const mobilenet = await loadMobilenet()
    tf.tidy(() => mobilenet.predict(screenshot));
    console.log("Mob", mobilenet)
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Webcam audio={false}
              height={224}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={224}
            />
            <button onClick={this.capture}>Capture photo</button>
          </div>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {this.state.image ? <img src={this.state.image} alt="" /> : null }
        </div>
      </div>
    );
  }
}

export default App;
