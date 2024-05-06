
async function apiGetQueueStats( queueId ) {
	//const api = `http://localhost:8080/queue/{queueId}/stats`;
	//return await query(api);
	let queue1 = initializeDemoQueue();
	queue1.customers.push( { name: 'Customer 1', phone: '1512345678', arrivalTime: new Date() } );
	return queue1; 
}

async function apiGetQueueDetails( queueId ) {	
	const api = `http://localhost:8080/queue/{queueId}`;
	return await query(api);
}

async function apiNextCustomer( queueId ){
	return { name: 'Customer 1', phone: '541150121626', arrivalTime: new Date(), waitTime: 16 };
}

async function apiSubscribeToQueue( data ){
	console.log('apiSubscribeToQueue');
	return { storeName: 'Demo Store', placeInQueue: 3 };
}

function initializeDemoQueue() {
    const queue1 = { 
      id: '1111',
      owner: 'Demo Store',
      customers: [ ],
      avgServiceTime: 15,
      avgWaitTime: 16,
    };
    /*
    queue1.customers.push( { name: 'Customer 1', phone: '1512345678', arrivalTime: new Date() } );
    queue1.customers.push( { name: 'Customer 2', phone: '1512345678', arrivalTime: new Date() } );
    queue1.customers.push( { name: 'Customer 3', phone: '1512345678', arrivalTime: new Date() } );
    */
    return queue1;
}

async function apiCreateQueue( queue ) {	
	console.log( 'apiCreateQueue' );
	return initializeDemoQueue();
}

async function doGet( queryStr ) {
	try {
		const response = await fetch(queryStr);
		if( !response.ok ) {
			const body =  await response.json();
			const errorMessage = `Error ${response.status} querying service: ${body.Error}`;
			throw errorMessage;
		} 
		const results = await response.json();
		return results;
	} catch ( err ) {
		console.log(err);
		throw err;
	}
}

export { apiGetQueueStats, apiGetQueueDetails, apiNextCustomer, apiCreateQueue, apiSubscribeToQueue };