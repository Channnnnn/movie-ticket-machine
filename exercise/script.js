import firebase from './_firebase';

function Defaults(variable, default_value){
  if (IsNotUndefined(variable)){
    return variable
  }
  else return default_value
}

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

function GetAllMovie(option = 'key'){
  return new Promise((resolve, reject) =>{
    var movies = []
    var movieRef = GetMovieDB()
    var query = movieRef
    if (option === 'key'){
      query = movieRef.orderByKey()
    }
    else if (option === 'price'){
      query = movieRef.orderByChild('price')
    }
    else if (option === 'featured'){
      query = movieRef.limitToFirst(5)
    }
    query.once('value', (snapshot) => {
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
  if (typeof movie.showtimes === 'string'){
    let showtimesArray = movie.showtimes.split(',')
    movie.showtimes = showtimesArray
  }

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
        console.log("DELETED POSTER \"" + file)
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

const coins = [1000, 500, 100, 50, 20, 10, 5, 2, 1]

function GetChange(price, paid) {
    var changes = []
    var amount = paid - price
    coins.forEach(coin => {
        while (amount >= coin) {
            changes.push(coin)
            amount -= coin
        }
    });
    return {amount: paid - price, changes: changes}
}

/*
SORT BY SHOWTIME
*/

function MomentBefore(time1, time2){
  const seconds1 = GetSeconds(typeof time1 === 'string' ? ParseTimeString(time1): time1)
  const seconds2 = GetSeconds(ParseTimeString(time2))
  if (seconds1 <= seconds2){ return true }
  else { return false }
}

function ParseTimeString(timeString){
  let items = timeString.split(':', 3)
  let time = items.map((item) => parseInt(item, 10))
  if (time.length < 3) { time[2] = 0}
  return {hour: time[0], min: time[1], sec:time[2]}
}

function GetSeconds(timeObj){
  return timeObj.hour*60*60 + timeObj.min*60 + timeObj.sec
}

function OffsetTimeString(time, offset){
  let _time = ParseTimeString(time)
  let _offset = ParseTimeString(offset)
  return {hour: _time.hour + _offset.hour,
      min: _time.min + _offset.min,
      sec: _time.sec + _offset.sec }
}

function FindIndexMomentAfter(timeString, timeArray, timeStringOffset = "0:0:0"){
  let refTime = OffsetTimeString(timeString, timeStringOffset)
  let index = timeArray.findIndex(time => MomentBefore(refTime, time))
  return {index: index, value: timeArray[index]};
}

function SortByNextShowtime(movies, timeArg = GetNowTimeString()){
  let newArray = movies.map(function(item,index) {
    if (IsNotUndefined(item.showtimes)){
      let last_item = item.showtimes[item.showtimes.length - 1]
      let result = FindIndexMomentAfter(timeArg, item.showtimes)
      item.next = result.index === -1 ? last_item : result.value
    }
    else {
      item.next = "24:00"
    }
    return item
  })
  return newArray.sort(function(a, b) {
      var showtimesA = GetSeconds(ParseTimeString(a.next))
      var showtimesB = GetSeconds(ParseTimeString(b.next))

      return showtimesA < showtimesB ? -1 : (showtimesA > showtimesB ? 1 : 0)
  })
}

function GetNowTimeString(){
  let now = new Date()
  let timeNow = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  return timeNow;
}

function GetSearchResult(input){
  let first_letter = input[0].toUpperCase()
  let next_letter = String.fromCharCode(first_letter.charCodeAt(0)+1)
  return new Promise((resolve, reject) => {
    ExactQuery(input).then(result => {
      if (result === null){
        RangeQuery(first_letter, next_letter).then(result => {
          return resolve({result: result, message:'Not Exact'})
        }).catch(err => {
          return reject(err)
        })
      }
      else {
        return resolve({result: result, message:'Exact'})
      }
    }).catch(err => { return reject(err); })
  })
}

function ExactQuery(input){
  let query = GetMovieDB().orderByKey()
  return new Promise((resolve, reject) => {
    query.equalTo(input).once('value', snapshot => {
      let result = snapshot.val()
      if (result !== null){
        result.name = snapshot.key
      }
      return resolve(result)
    }).catch(error => {
      return reject(error)
    })
  })
}

function RangeQuery(start, end){
  let query = GetMovieDB().orderByKey()
  return new Promise((resolve, reject) => {
    query.startAt(start).endAt(end).once('value', snapshot => {
      let result = []
      if (snapshot !== null) {
        snapshot.forEach(element => {
          let item = element.val()
          item.name = element.key
          result.push(item)
        });
      }
      return resolve(result)
    }).catch(error => {
      return reject(error)
    })
  })
}

function SubstringExist(string1, string2){
  var str1 = string1.toUpperCase()
  var str2 = string2.toUpperCase()
  if (str1.length >= str2.length) {
    return str1.includes(str2)
  }
  else {
    return str2.includes(str1)
  }
}

export default { Defaults,
  IsNotUndefined,
  GetMovieDB,
  GetStorage,
  FetchPosterURL, 
  GetAllMovie,
  UpsertMovie,
  RemoveMovie,
  UploadPoster,
  RemovePoster,
  GetChange,
  SortByNextShowtime,
  GetSearchResult,
  SubstringExist }