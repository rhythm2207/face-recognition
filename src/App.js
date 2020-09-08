import React from 'react';
import Navigation from './components/Navigation/Navigation'
import './App.css';
import Logo from './components/Logo/Logo'
import ImageForm from './components/ImageForm/ImageForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import ImageRecognition from './components/ImageRecognition/ImageRecognition'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

const app = new Clarifai.App({
  apiKey: '296ec1710ada4d16bbad29b9ae8f872a'
});

const particleoptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

var users_box = [];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageurl: '',
      box: [],
      route: 'signin'
    }
  }
  calculateFaceLocation = (data) => {
    for (var i = 0; i < data.outputs[0].data.regions.length; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputImage')
      const height = Number(image.height)
      const width = Number(image.width)
      users_box[i] = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }
    return users_box;
  }

  displayFace = (box) => {
    this.setState({ box: box })
    console.log(box)
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageurl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFace(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({ route: route })
  }


  render() {
    return (
      <div className="App" >
        <Particles className='particles'
          params={particleoptions} />

        {this.state.route === 'home'
          ? <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank />
            <ImageForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <ImageRecognition box={this.state.box} imageurl={this.state.imageurl} />
          </div>

          : (this.state.route === 'signin'
            ? <Login onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    )
  }

}

export default App;
