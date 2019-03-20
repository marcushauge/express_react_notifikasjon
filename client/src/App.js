import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
state = {
    data: null,
    confirmation: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        Render the newly fetched data inside of this.state.data 
        <p className="App-intro">{this.state.data}</p>

        <h2>Sende notifikasjon</h2>
        Fra: <input type="text" id="frominput"></input>
        Til: <input type="text" id="toinput"></input>
        <input type="button" value="Send" onClick={() => this.notificationToBackend()}></input>
        <p>{this.state.confirmation}</p>

      </div>

      
    );
  }

  //Function called by send button to make a POST request with the "notification" to the backend
  notificationToBackend() {
    //object with two properties to be sent in the request
    var data = {"Sender": document.getElementById("frominput").value,
                "Mottaker": document.getElementById("toinput").value
    }

    if(data.Sender === '' || data.Mottaker === '') {return}
    
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:  JSON.stringify(data)
    }

    fetch('/send_notif', options)
    .then(res => res.json())
    .then(resJsonObj => console.log(resJsonObj))

  }



  //Function to test GET request
  getReqTest() {
    
    fetch('/get_test')
    .then(res => res.json())
    .then(resJsonObj => console.log(resJsonObj))

  }

  //Function to test POST request
  postReqTest() {
    var data = {"navn": "Heisann"}
    
    //Optional object to pass in fetch() parameter
    const options = {
      method: "POST",
      body:  JSON.stringify(data),
      headers: new Headers({"Content-Type": "application/json"})
    }

    //make request and logs the response from the backend
    fetch("/post_test", options)
    .then(res => res.json())
    .then(resJsonObj => console.log(resJsonObj))

  }



}

export default App;