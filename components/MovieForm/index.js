import React, { Component } from 'react';
import firebase from '../../_firebase';
import './movieForm.scss';
import script from '../../script';

class MovieForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      movieForm: JSON.parse(JSON.stringify(this.props.movie))
    }
    this.handleClear = this.handleClear.bind(this)
  }

  componentDidUpdate(prevProps){
    if (this.props.movie != prevProps.movie){
      this.forceUpdate()
    }
  }

  handleInputChange(event){
    // console.log("CHANGING")
    const target = event.target;
    const value = target.type==="file" ? target.files[0] : target.value;
    const name = target.name;
    // console.log("Before " + this.props.movie[name], this.state.movieForm[name]);
    this.setState((prevState) => {
      // console.log(prevState)
      prevState.movieForm[name] = value;
      return prevState;
    }/*,()=>{console.log("After " + this.props.movie[name], this.state.movieForm[name]);}*/)
  }

  handleClear(){
    if (confirm('Clear form?')){
      document.getElementById('name').value = "";
      document.getElementById('description').value = "";
      document.getElementById('price').value = "";
      document.getElementById('duration').value = "";
      document.getElementById('showtimes').value = "";
      document.getElementById('posterFile').value = "";
    }
  }

  handleSave(newMovie){
    if (newMovie.posterFile){
      script.UploadPoster(newMovie.posterFile).then((fileLocation) => {
        this.setState((prevState) => {
          prevState.movieForm['posterStorage'] = fileLocation;
          return prevState;
        });
        if (typeof newMovie.name != 'undefined'){
          script.UpsertMovie(newMovie).then(() => {
            this.setState((prevState) => {
              prevState.movieForm = this.props.movie;
              return prevState
            }, ()=>{
              this.props.GetAllMovie()
              this.handleClear()
              console.log("REFRESHING MOVIE LIST");
            })
          }).catch(err => {
            console.error(err.message);
            script.RemovePoster(newMovie.posterFile)
          })
        }
      });
    }
  }

  handleEdit(){
    console.log("EDITING")
    this.setState((prevState) => {
      // prevState.originalForm = JSON.parse(JSON.stringify(this.props.movie));
      prevState.movieForm = JSON.parse(JSON.stringify(this.props.movie));
      prevState.isEditing = true;
      return prevState
    })
  }

  handleUpdate(data){
    console.log("UPDATING")
    let originalName = this.props.movie.name;
    let newName = data.name;
    let originalPoster = this.props.movie.posterStorage;
    if (data.posterFile){
      console.log('Has file to upload first')
      script.UploadPoster(data.posterFile).then((fileLocation) => {
        this.setState((prevState) => {
          prevState.movieForm['posterStorage'] = fileLocation;
          return prevState;
        }, () => {
          script.UpsertMovie(data).then(this.props.GetAllMovie())
          let newPoster = this.state.movieForm.posterStorage;
          if (newPoster !== originalPoster){
            script.RemovePoster(originalPoster)
          }
        });
      })
    }
    else {
      console.log('No file, proceed')
      script.UpsertMovie(data).then(this.props.GetAllMovie())  
    }  
    if (originalName != newName){
      script.RemoveMovie(originalName).then(() => {
        console.log("REFRESHING MOVIE LIST");
        this.props.GetAllMovie()
      }).catch(err => {
        console.log(err.message);
      })
    }
    this.setState({isEditing: false})
  }

  handleCancel(){
    console.log("CHANGES CANCELED")
    this.setState((prevState) => {
      prevState.movieForm = this.props.movie;
      prevState.isEditing = false;
      return prevState
    })
  }

  handleDelete(dataRef){
    if(confirm("Delete \"" + this.props.movie.name + "\" data?")){
      var posterRef = this.props.movie.posterStorage
      script.RemovePoster
      script.RemoveMovie(dataRef).then(() => {
        console.log("REFRESHING MOVIE LIST");
        this.props.GetAllMovie()
      }).catch(err => {
        console.log(err.message);
      })
    }
  }

  render() {
    const movie = this.state.movieForm;
    var editable = this.state.isEditing || this.props.adder;
    return (
      <div className="form movieForm">
        <div className="input-text">
          <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={this.handleInputChange.bind(this)}
            value={movie.name}disabled={!editable}/>
        </div>
        <div className="input-multiline">
          <label htmlFor="description">Description</label>
            <textarea name="description" id="description" onChange={this.handleInputChange.bind(this)}
            value={movie.description} disabled={!editable}></textarea>
        </div>
        <div className="input-text">
          <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" onChange={this.handleInputChange.bind(this)}
            value={movie.price} disabled={!editable}/>
          <span>THB</span>
        </div>
        <div className="input-text">
          <label htmlFor="duration">Duration</label>
            <input type="number" name="duration" id="duration" onChange={this.handleInputChange.bind(this)}
            value={movie.duration} disabled={!editable}/>
          <span>min</span>
        </div>
        <div className="input-text">
          <label htmlFor="showtimes">Showtimes</label>
            <input type="text" name="showtimes" id="showtimes" onChange={this.handleInputChange.bind(this)}
            value={movie.showtimes} disabled={!editable}/>
        </div>
        {
          !this.props.adder &&
        <div className="input-text">
          <label htmlFor="posterStorage">Poster Storage</label>
            <input type="text" name="posterStorage" id="posterStorage" onChange={this.handleInputChange.bind(this)}
            value={movie.posterStorage} disabled={!editable}/>
        </div>
        }
        <div className="input-text">
          <label htmlFor="posterFile">Poster Image</label>
            <input type="file" name="posterFile" id="posterFile" onChange={this.handleInputChange.bind(this)}
            disabled={!editable}/>
        </div>
        {
          this.props.adder && 
          <button onClick={this.handleSave.bind(this, this.state.movieForm)}>Save</button>
        }
        {
          this.props.adder && 
          <button style={{float:'right'}} onClick={this.handleClear}>Clear</button>
        }
        {
          !this.props.adder && !this.state.isEditing &&
            <button onClick={this.handleEdit.bind(this)}>Edit</button>
        }
        {
          this.state.isEditing && <button className="confirm" onClick={this.handleUpdate.bind(this, this.state.movieForm)}>Update</button>
        }
        {
          this.state.isEditing && <button onClick={this.handleCancel.bind(this)}>Cancel</button>
        }
        {
          !this.props.adder && !this.state.isEditing &&
          <button className="danger" onClick={this.handleDelete.bind(this, this.props.movie.name)}>Delete</button>
        }        
      </div>
    );
  }
}
MovieForm.defaultProps = {
  movie: {
    name: "",
    description: "",
    price: "",
    duration: "",
    posterStorage: "",
    showtimes: []
  }
}

export default MovieForm;
