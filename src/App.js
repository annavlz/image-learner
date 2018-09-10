import React, { Component } from 'react';
import './App.css';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

// const loadMobilenet = async () => {
//   // const mobilenet = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
//   const model = await mobilenet.load()
//   const layer = mobilenet.getLayer('conv_pw_13_relu');
//   return tf.model({ inputs: model.inputs, outputs: layer.output });
// }


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      tab: 0,
      predictions: ''
    }
  };


  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = async () => {
    const {video, image} = this.webcam.getScreenshot();
    const screenshot = tf.fromPixels(video).expandDims(0).toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    const model = await mobilenet.load()
    const predictions = tf.tidy(() => model.classify(screenshot));
    this.setState({ image, predictions })
  };

  render() {
    const {image, predictions} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Webcam audio={true}
              video={true}
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
          {image ? <img src={image} alt="" /> : null }
        </div>
        <div>
          {predictions ? predictions : "Nope"}
        </div>
      </div>
    );
  }
}

export default App;
