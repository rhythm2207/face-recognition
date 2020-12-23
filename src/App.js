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
import { storage } from './firebase/firebase.utils'

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

// let num = [];
// let sex = [];

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
      },
      fileUrl: "",
      // age: [],
      // genderList: []
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

  // calculateAge = (data2) => {
  //   const ages = data2.outputs[0].data.regions;
  //   let i = 0;
  //   ages.forEach(age => {
  //     num[i] = age.data.concepts[0].name;
  //     i++
  //   });
  //   this.setState({ ageList: num }, () => console.log(this.state.ageList));
  // }

  // calculateSex = (data3) => {
  //   const genders = data3.outputs[0].data.regions;
  //   let i = 0;
  //   genders.forEach(gender => {
  //     sex[i] = gender.data.concepts[20].name;
  //     i++
  //   });
  //   this.setState({ genderList: sex }, () => console.log(this.state.genderList));
  // }

  displayFace = (box) => {
    this.setState({ box: box }, () => console.log(this.state.box))
  }

  handleUpload = async event => {
    const file = event.target.files[0]
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    const url = await fileRef.getDownloadURL()
    this.setState({ input: url })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageurl: this.state.input })
    fetch('https://nameless-falls-31950.herokuapp.com/apicall', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://nameless-falls-31950.herokuapp.com/image', {
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
        // this.calculateAge(response)
        // this.calculateSex(response)

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
            <ImageForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} handleUpload={this.handleUpload} />

            <ImageRecognition box={this.state.box} imageurl={this.state.imageurl} genderList={this.state.genderList} ageList={this.state.ageList} />
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
