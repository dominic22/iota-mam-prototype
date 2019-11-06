import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

let currentRoot;
const mode = 'restricted';
const secretKey = 'SECRETBIG'; // secret always upper case!
const provider = 'https://nodes.devnet.iota.org';
//let mamState = Mam.init(provider)
const baseRoot = 'a'// Mam.getRoot(mamState);
// mamState = Mam.changeMode(mamState, mode, secretKey);

const publish = async data => {
  // Create MAM Payload - STRING OF TRYTES
  //const trytes = asciiToTrytes(JSON.stringify(data))

  // mamState.channel.count = TREE_COUNT;
  // mamState.channel.next_count = TREE_COUNT;


  // const message = Mam.create(mamState, trytes)

  // Save new mamState
  // mamState = message.state

  // Attach the payload
  // await Mam.attach(message.payload, message.address, 3, 9)

  return 'message.root'
}

export default function App() {
  publishCoordinates = async () => {
    currentRoot = await publish({
     message: 'Hello...',
     timestamp: (new Date()).toLocaleString()
   })
   alert("PUBLISH")
   }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Base root: {baseRoot}</Text>
      <Text style={styles.text}>Publish your current coordinates to the tangle:</Text>
      
      <Button title="Publish coordinates" onPress={publishCoordinates} />
      <Text style={styles.text}>Current root: {currentRoot}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
  },
});
