import React, { useState } from 'react';
import logo from './Iota_logo.png';
import './App.css';
import { asciiToTrytes } from '@iota/converter';
import Mam from '@iota/mam';

const mode = 'restricted'
const secretKey = 'SECRETBIG' // secret always upper case!
const provider = 'https://nodes.devnet.iota.org'
const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${secretKey.padEnd(81, '9')}&root=`

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
        <div >Publish your device position to the tangle!</div>
        <div className="button" onClick={async () => {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const root = await publish({
              position,
              timestamp: (new Date()).toLocaleString()
            })
            setCurrentRoot(root);
            setPosition({ lat: pos.coords.latitude, long: pos.coords.longitude})
          });
        }} >Publish coordinates</div>
        <div className="link-wrapper">Base root: <a
          className="App-link"
          href={mamExplorerLink + baseRoot}
          target="_blank"
          rel="noopener noreferrer"
        > {baseRoot}</a></div>
        
        <div>Current position - long: {position.long } lat: { position.lat }</div>
        <div className="link-wrapper">Current root: <a
          className="App-link"
          href={mamExplorerLink + currentRoot}
          target="_blank"
          rel="noopener noreferrer"
        ><span> {currentRoot}</span></a></div>
      </header>
    </div>
  );
}

export default App;
