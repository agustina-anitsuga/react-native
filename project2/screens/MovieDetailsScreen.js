import React from 'react';
import { StyleSheet, Text, Button, View, Image, ScrollView, PropTypes} from 'react-native';
import { getDetails } from './../SearchEngine'; 


function shouldDisplay( val ){
	return val && (val!='N/A') ;
}

const Attribute = props => (
	<View>
    {
		shouldDisplay(props.value) &&
		<View style={styles.row}>
    		<Text style={styles.attributeTitle}>{props.name}</Text>
    		<Text style={styles.attributeDescription}>{props.value}</Text>
		</View>
	}
	</View>
);

class MovieDetailsScreen extends React.Component {

	constructor( props ){
		super(props);
		this.state = {
			movieID: this.props.route.params.movieID,
		};
	}

	componentDidMount(){
		this.getMovieDetails();
	}

	async getMovieDetails(){
		try {
			const movieDetails = await getDetails(this.state.movieID);
			this.setState({ movieDetails });
		} catch ( errorMessage ) {
			this.setState({errorMessage});
		}
	}

	render() {
	  return (
	  	<ScrollView style={styles.container}>
	  		{ this.state.movieDetails &&
		    	<View style={styles.details}>

		    		<View style={styles.header}>
		    			{ this.state.movieDetails.Poster &&
		    			<View>
		    				<Image source={{ uri: this.state.movieDetails.Poster }} style={styles.poster} />
		    			</View>
		    			}
		    			<View>
				    		<Text style={styles.movieTitle}>{this.state.movieDetails.Title}</Text>
				    		<Text style={styles.attributeDescription}>({this.state.movieDetails.Type})</Text>
				    		<Text style={styles.attributeDescription}>Year: {this.state.movieDetails.Year}</Text>
				    		<Text style={styles.attributeDescription}>Released: {this.state.movieDetails.Released}</Text>
				    	</View>
			    	</View>

			    	{ shouldDisplay(this.state.movieDetails.Plot) &&
			    	<View style={styles.row}>
			    		<Text style={styles.plot}>{this.state.movieDetails.Plot}</Text>
			    	</View>	
			    	}

			    	<Attribute value={this.state.movieDetails.Actors} name='Actors'/>
			    	<Attribute value={this.state.movieDetails.Director} name='Director'/>
			    	<Attribute value={this.state.movieDetails.Production} name='Production'/>
			    	<Attribute value={this.state.movieDetails.Runtime} name='Runtime'/>
			    	<Attribute value={this.state.movieDetails.Writer} name='Writer'/>
			    	<Attribute value={this.state.movieDetails.Genre} name='Genre'/>
			    	<Attribute value={this.state.movieDetails.Rated} name='Rated'/>
			    	<Attribute value={this.state.movieDetails.Language} name='Language'/>
			    	<Attribute value={this.state.movieDetails.Country} name='Country'/>
			    	<Attribute value={this.state.movieDetails.Awards} name='Awards'/>
			    	<Attribute value={this.state.movieDetails.BoxOffice} name='BoxOffice'/>
			    	<Attribute value={this.state.movieDetails.DVD} name='DVD'/>
		    	</View>
			}
			{
				!this.state.movieDetails &&
				<Text style={styles.error}>{this.state.errorMessage}</Text>
			}
		</ScrollView>
	  );
	}
};

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  },
  details: {
    alignItems: 'flex-start',
  },
  header: {
  	flexDirection: 'row',
  	padding: 5,
  },
  movieTitle: {
  	fontSize: 22,
  	textAlign: 'left',
  	fontWeight: 'bold',
  },
  row: {
  	padding: 10,
  },
  attributeTitle: {
  	fontSize: 18,
  	fontWeight: 'bold',
  },
  attributeDescription: {
  	fontSize: 18,
  },
  plot: {
  	fontSize: 18,
  	textAlign: 'left',
  },
  poster: {
  	width: 150,
  	height: 150,
  },
  error: {
    fontSize: 12,
    alignSelf: 'center',
    color: 'red',
    margin: 5,
  },
});

export default MovieDetailsScreen;