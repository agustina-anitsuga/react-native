import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { subscribeToQueue } from '../redux/actions';
import { connect } from 'react-redux';

import {styles} from './StyleSheet'


function getQueueId(){
	return '1111';
}

function validQueueFound( type, data ){
	return true;
}

function JoinQueueScreen( props ) {

	console.log(props);

	const [hasPermission, setHasPermission] = useState(null);
		const [scanned, setScanned] = useState(false);

	useEffect(() => {
	    (async () => {
	      const { status } = await BarCodeScanner.requestPermissionsAsync();
	      setHasPermission(status === 'granted');
	    })();
	  }, []);

	  const handleBarCodeScanned = ({ type, data }) => {
	    setScanned(true);
	    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	    if( validQueueFound(type,data) ){
	    	props.subscribeToQueue( getQueueId(data) );
	    	props.navigation.pop();
	    }
	  };

	  if (hasPermission === null) {
	    return <View style={styles.emptyContainer}><Text style={styles.text}>Requesting for camera permission</Text></View>;
	  }
	  if (hasPermission === false) {
	    return <View style={styles.emptyContainer}><Text style={styles.text}>No access to camera</Text></View>;
	  }

	  return (
	    <View style={styles.emptyContainer}>
	      <BarCodeScanner
	        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
	        style={StyleSheet.absoluteFillObject}/>
	      {scanned && <Button style={styles.button} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
	    </View>
	  );
};

function JoinQueueDummyScreen( props ){
	
	console.log(props);

	const handleBarCodeScanned = async () => {
	    if( validQueueFound('','') ){
	    	const queueId = getQueueId('');
	    	console.log(queueId);
	    	await props.subscribeToQueue( queueId );
	    	props.navigation.pop();
	    }
	  };

	return (
	    <View style={styles.emptyContainer}>
	      <Button style={styles.button} title={'Scan the QR'} onPress={() => handleBarCodeScanned()} />
	    </View>
	  );
}

export default connect(null,{subscribeToQueue})(JoinQueueDummyScreen);




