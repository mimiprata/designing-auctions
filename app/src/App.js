import React, { Component } from 'react';


import './App.css';
import {AppRouter} from "./components/routers/AppRouter";

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidUpdate(prevProps, prevState, snapshot) {


  }

    componentDidMount() {



      /*loadAccount : async () =>{
          window.ethereum.enable().then((account) =>{
              const defaultAccount = account[0]
              web3.eth.defaultAccount = defaultAccount

          })
      }*/

      /*axios.get(`http://localhost:3001/api/auctions/create`)
          .then(res=>{
            console.log(res.data)
          }).then(res=> {

    axios.get(`http://localhost:3001/api/auctions/all`)
        .then(res=>{
          console.log(res.data)
        })});*/
 /*   axios.get(`https://localhost:3001/api/auctions/getAll`)
        .then(res=>{
          console.log(res.data)
        });*/

    /*
    axios.get(`http://localhost:3001/api/auctions/all`)
        .then(res=>{
          console.log(res.data)
        });*/
  }




  render() {
    return (
        <div className="App">
         {/* <Web3Provider/>*/}
          <AppRouter />
        </div>
    );
  }
}

export default App;