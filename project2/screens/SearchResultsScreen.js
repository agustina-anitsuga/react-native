import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, Button, View, Image } from 'react-native';
import { search } from './../SearchEngine'; 


class SearchResultRow extends React.Component {

	constructor( props ){
		super(props);
		this.state = {
			movie: this.props.movie,
			onPress: this.props.onPress,
		};
	}

	onPress(){
		this.state.onPress(this.state.movie);
	}

	render(){
		const movie = this.props.movie;
		return (
    		<TouchableOpacity 
    			onPress={ () => this.onPress() }
    		>
    			<View style={styles.movieRow}>
    				<View>
	          			<Image source={{ uri: movie.Poster }} style={styles.poster} />
	          		</View>
	          		<View>
		      			<Text style={styles.title}>{ movie.Title }</Text>
		      			<Text style={styles.type}>{ movie.Type }</Text>
		      			<Text style={styles.year}>{ movie.Year }</Text>
		      		</View>
	      		</View>
      		</TouchableOpacity>
      	);
	}
	
}

class SearchResultsScreen extends React.Component {

	constructor( props ){
		super(props);
		this.state = {
			title: this.props.route.params.title,
			nextPage: 1,
			totalResults: 0,
			loadedResults: 0,
			movies: [],
		};
	}

	componentWillUnmount(){
		console.log('component will unmount');
	}

	shouldFetchMoreResults(){
		const ret = (this.state.totalResults === 0) || ( this.state.loadedResults < this.state.totalResults );
		return ret;
	}

	onEndReached(){
		this.loadNextPage()
	}

	async loadNextPage(){
		try {
			if( this.shouldFetchMoreResults() ) {
				const searchResult = await search(this.state.title, this.state.nextPage );
				if( searchResult ){
					this.setState(prevState => ({ 
						nextPage: prevState.nextPage + 1,
						totalResults: searchResult.totalResults,
						loadedResults: prevState.loadedResults + searchResult.Search.length,
						movies: prevState.movies.concat(searchResult.Search) 
					}));
				}
			}
		} catch( err ) {
			console.error(err);
		}
	}

	showDetails(movie){
		this.props.navigation.push('MovieDetails', { 
				movieID: movie.imdbID,
				movieTitle: movie.Title, 
		})
	}

	renderItem( item ){
		return(
			<SearchResultRow movie={item.item} onPress={(movie) => this.showDetails(movie)}/>
		)
	}

	render() {
	  	return (
		    <View style={styles.results}>
		    	<FlatList
				    data={this.state.movies}
			        renderItem={(item) => this.renderItem(item)}
			        keyExtractor={(movie) => movie.imdbID}
			        onEndReached={this.onEndReached()}
		    	/>
		    </View>
		);
	}
};

const styles = StyleSheet.create({
  results: {
    justifyContent: 'center',
    flex: 1
  },
  movieRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
  },
  poster: {
  	width: 100,
  	height: 100,
  },
  title: {
  	fontSize: 24,
  },
  type: {
  	fontSize: 12,
  },
  year: {
  	fontSize: 12,
  },
});

export default SearchResultsScreen;

