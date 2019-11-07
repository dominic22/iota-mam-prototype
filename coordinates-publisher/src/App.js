import React, { useState } from 'react';
import logo from './Iota_logo.png';
import './App.css';
import { asciiToTrytes } from '@iota/converter';
import Mam from '@iota/mam';

const mode = 'restricted'
// secret always upper case!
const secretKey = 'SECRETBIG'
const provider = 'https://nodes.devnet.iota.org'


let mamState = Mam.init(provider)
const baseRoot = Mam.getRoot(mamState);
mamState = Mam.changeMode(mamState, mode, secretKey)

const publish = async data => {
  // Create MAM Payload - STRING OF TRYTES
  const trytes = asciiToTrytes(JSON.stringify(data))


  const message = Mam.create(mamState, trytes)

  // Save new mamState
  mamState = message.state

  // Attach the payload
  await Mam.attach(message.payload, message.address, 3, 9)

  return message.root
}

function App() {
  const [currentRoot, setCurrentRoot] = useState('');
  const [position, setPosition] = useState({ lat:0, long:0});

  
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div >Base root: {baseRoot}</div>
        <div >Publish your current coordinates to the tangle:</div>
      
        <button onClick={async () => {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const root = await publish({
              position,
              timestamp: (new Date()).toLocaleString()
            })
            setCurrentRoot(root);
            setPosition({ lat: pos.coords.latitude, long: pos.coords.longitude})
          });
        }} >Publish coordinates</button>
        <div>Current position - long: {position.long } lat: { position.lat }</div>
        <div >Current root: <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > {currentRoot}</a></div>
        
        
      </header>
    </div>
  );
}

export default App;
