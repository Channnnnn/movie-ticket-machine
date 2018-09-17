import React, { Component } from 'react';
import '../scss/styles.scss';
import Poster from '../components/Poster';
import MovieTableEntry from '../components/MovieTableEntry';
import MovieTable from '../components/MovieTable';
import firebase from '../firebase';
// import 'firebase/storage';

// let storage = firebase.storage();

const data = {
    movies:[
        {name: "Deadpool2", duration: 95},
        {name: "Ghostland", duration: 125},
        {name: "Avengers : Infinity War", duration: 102},
        {name: "Midnight Sun", duration: 93},
        {name: "The Nun", duration: 87}
    ]
}

export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: []
        }
    }

    getAllMovie(){
        var movies = []
        var movieRef = firebase.database().ref().child('/movies')
        movieRef.once('value', (snapshot) => {
            snapshot.forEach(child => {
                var movie = child.val()
                movie.name = child.key
                movies.push(movie)
            });
            this.setState({movies: movies})
        }).catch((error) => {
            console.error(error.code);
        })
    }

    componentDidMount(){
        this.getAllMovie();
    }

    render() {
        return (
            <div>
                <section className="main">
                    <h1 className="center">Now Showing</h1>
                    <div className="flex row center tighten scroll">
                        {data.movies.map((movie) => (
                            <Poster key={movie.name} movie={movie}></Poster>
                        ))}
                    </div>
                </section>
                {/* <MovieTableEntry db={firebase} posterUrl={this.state.posterUrl}></MovieTableEntry> */}
                <MovieTable movies={this.state.movies}></MovieTable> 
            </div>
        );
    
    }
}