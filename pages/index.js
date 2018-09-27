import React, { Component } from 'react';
import '../scss/styles.scss';
import Poster from '../components/Poster';
import MovieTable from '../components/MovieTable';
import script from '../script';
import Navbar from '../components/Navbar';

export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            featured: [],
            message: ""
        }
        this.getAndSortMovie = this.getAndSortMovie.bind(this)
        this.getFeaturedMovie = this.getFeaturedMovie.bind(this)
        this.getSearchResult = this.getSearchResult.bind(this)
    }

    componentDidMount(){
        let {search} = this.props.url.query
        if (script.IsNotUndefined(search)){
            this.setState({message: "Search Result\n\'" + search + "\'"})
            this.getSearchResult(search)
        }
        else{
            this.setState({message: "Now Showing"})
            this.getFeaturedMovie()
            this.getAndSortMovie()
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.url.query.search !== prevProps.url.query.search){
            let {search} = this.props.url.query
            if (script.IsNotUndefined(search)){
                this.setState({message: "Search Result\n\'" + search + "\'"})
                this.getSearchResult(search)
            }
            else{
                this.setState({message: "Now Showing"})
                this.getFeaturedMovie()
                this.getAndSortMovie()
            }
        }
    }

    getFeaturedMovie(){
        script.GetAllMovie('featured').then(movies => {
            this.setState({featured: movies})
        })
    }

    getAndSortMovie(option = 'key'){
        let {search} = this.props.url.query
        if (script.IsNotUndefined(search)){
            if (option === 'next'){
                script.GetSearchResult(search).then(movies => {
                    // console.log(movies);
                    let nextMovie = script.SortByNextShowtime(movies.result)
                    this.setState({movies: nextMovie})
                })
            }
            else if (option === 'price') {
                script.GetSearchResult(search).then(movies => {
                    let sortedMovie = movies.result.sort(function (key1, key2) {
                        let price1 = key1.price
                        let price2 = key2.price
                        return price1 < price2 ? -1 : (price1 > price2 ? 1 : 0);
                    })
                    this.setState({movies: sortedMovie})
                })
            }
            else {
                this.getSearchResult(search)
            }
        }
        else {
            if (option === 'next'){
                script.GetAllMovie().then((movies) => {
                    let nextMovie = script.SortByNextShowtime(movies)
                    this.setState({movies: nextMovie})
                }).catch((err) => { console.error(err.message); });
            }
            else {
                script.GetAllMovie(option).then((movies) => {
                    this.setState({movies: movies})
                }).catch((err) => { console.error(err.message); });
            }
        }
    }

    getSearchResult(query){
        script.GetSearchResult(query).then(results => {
            let {result} = results
            let {message} = results
            if (result.length < 1 ){
                this.setState({featured: [], movies: []})
            }
            else {
                let sortedResult = result.sort(function (key1, key2) {
                    let match1 = script.SubstringExist(key1.name,query)
                    let match2 = script.SubstringExist(key2.name,query)
                    return (match1 === match2)? 0 : match1 ? -1 : 1;
                })
                this.setState({featured: sortedResult.slice(0,5), movies: sortedResult})
            }
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="main">
                    <section className="flex-center">
                        <h1 className="center tighten">{this.state.message}</h1>
                        <div className="h-scroll">
                            <div className="flex row center tighten">
                                {this.state.featured.map((movie) => (
                                    <Poster key={movie.name} movie={movie}></Poster>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="movieList center">
                        <MovieTable movies={this.state.movies} sortFunction={this.getAndSortMovie}>
                        { this.state.movies.length === 0 && script.IsNotUndefined(this.props.url.query.search) &&
                            <h2>No result</h2>
                        }
                        </MovieTable>
                    </section>
                </div>
            </div>
        );
    
    }
}