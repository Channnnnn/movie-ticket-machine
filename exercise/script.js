import firebase from './firebase';

function IsNotUndefined(variable){
  return typeof variable !== 'undefined'
}

function GetMovieDB(ref=''){
  return firebase.database().ref('/movies/' + ref);
}

function GetStorage(){
  return firebase.storage();
}

function FetchPosterURL(ref){
  return new Promise((resolve, reject) => {
    GetStorage().refFromURL(ref).getDownloadURL().then(url => {
      return resolve(url);
    })
  })
}

function GetAllMovie(){
  return new Promise((resolve, reject) =>{
    var movies = []
    var movieRef = GetMovieDB()
    movieRef.once('value', (snapshot) => {
        snapshot.forEach(child => {
            var movie = child.val()
            movie.name = child.key
            movies.push(movie)
        });
        return resolve(movies)
    }).catch((error) => {
        return reject(error);
    })
  })
}

function UpsertMovie(movie) {
  return new Promise((resolve, reject) => {
    let name = movie.name
    delete movie.name
    GetMovieDB().child(name).update(movie).then(() => {
      console.log("Update completed");
      return resolve();
    }).catch(err => {
      return reject(err);
    })
  })
}

function RemoveMovie(movieName) {
  return new Promise((resolve, reject) => {
    GetMovieDB().child(movieName).remove().then(() => {
      console.log("DELETED \"" + movieName + "\"");
      return resolve();
    }).catch(err => {
      console.error("FAILED TO DELETE \"" + movieName + "\"\n" + err.message);
    })
  })
}

function UploadPoster(file){
  return new Promise((resolve, reject) => {
    GetStorage().ref(file.name).put(file).then((fileSnapshot) => {
      console.log("UPLOADED POSTER \"" + file.name)
      return resolve(fileSnapshot.ref.toString())
    }).catch((err) => {
      return reject(err)
    })
  })
}

function RemovePoster(file){
  return new Promise((resolve, reject) => {
    if (typeof file === 'string'){
      GetStorage().refFromURL(file).delete().then(() => {
        console.log("DELETED POSTER \"" + file.name)
        return resolve();
      }).catch((err) => {
        return reject(err);
      })
    }
    else {
      GetStorage().ref(file.name).delete().then(() => {
        console.log("DELETED POSTER \"" + file.name)
        return resolve();
      }).catch((err) => {
        return reject(err);
      })
    }
  })
}

export default { IsNotUndefined,
  GetMovieDB,
  GetStorage,
  FetchPosterURL, 
  GetAllMovie,
  UpsertMovie,
  RemoveMovie,
  UploadPoster,
  RemovePoster }