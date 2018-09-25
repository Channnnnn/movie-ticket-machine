import React, { Component } from 'react';
import '../scss/styles.scss';
import Poster from '../components/Poster';
import MovieTable from '../components/MovieTable';
import script from '../script';

export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount(){
        script.GetAllMovie().then((movies) => {
            this.setState({movies: movies})
        }).catch((err) => {
            console.error(err.code);
        });
    }

    render() {
        return (
            <div>
                <section className="main">
                    <h1 className="center tighten">Now Showing</h1>
                    <div className="h-scroll">
                        <div className="flex row center tighten">
                            {this.state.movies.map((movie) => (
                                <Poster key={movie.name} movie={movie}></Poster>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="movieList center">
                    <MovieTable movies={this.state.movies}></MovieTable> 
                </section>
            </div>
        );
    
    }
}