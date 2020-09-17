import React from 'react';
import Navigation from './components/Navigation/Navigation'
import './App.css';
import Logo from './components/Logo/Logo'
import ImageForm from './components/ImageForm/ImageForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import ImageRecognition from './components/ImageRecognition/ImageRecognition'
import Login from './components/Login/Login'
import Register from './components/Register/Register'



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

const initialState = {
  input: '',
  imageurl: '',
  box: [],
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageurl: '',
      box: [],
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    const clarifaiFacesRegions = data.outputs[0].data.regions;

    const boundingBoxes = clarifaiFacesRegions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
    return boundingBoxes;
  }

  displayFace = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageurl: this.state.input })
    console.log(this.state.input);
    fetch('http://localhost:3000/apicall', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log())
        }
        this.displayFace(this.calculateFaceLocation(response))
      }).catch(err => console.log(err));
  }

  onRouteChange = (route) => {

    if (route === 'signin')
      this.setState(initialState)
    else {
      this.setState({ route: route })
    }
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <ImageRecognition box={this.state.box} imageurl={this.state.imageurl} />
          </div>

          : (this.state.route === 'signin'
            ? <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    )
  }
}

export default App;
