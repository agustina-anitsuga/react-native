
async function search( title, page ) {
	const omdbapi = `http://www.omdbapi.com/?apikey=8e2e5cb9&s=${title}&page=${page}`;
	return await query(omdbapi);
}

async function getDetails( imdbID ) {
	const omdbapi = `http://www.omdbapi.com/?apikey=8e2e5cb9&i=${imdbID}`;
	return await query(omdbapi);
}

async function query( queryStr ) {
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

export { search , getDetails };