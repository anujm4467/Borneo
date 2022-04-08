import './App.css';
import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      response: []
    }
  }

  handleChange = async (event) => {
    await this.callTheApi(event.target.value)
  }

  callTheApi = async (search) => {
    console.log(search)
    const response = await axios.get('http://localhost:3000/api/searchText?search=' + search);
    this.setState({ response: response.data });
  }




  render() {
    return (
      <div className="App" >

        <input type="text" id="myInput" onChange={async (event) => { await this.handleChange(event) }} placeholder="Search for names.." />

        <ul id="myUL">
          {this.state.response.map((item, index) => {
            return (
              <li key={index}>
                <a href={item._source.publicURL}>{item._source.name}</a>
              </li>
            )
          }
          )}
        </ul>
      </div>
    );
  }
}

export default App;
