const seeYear = new Date();
const upToDate = seeYear.getFullYear();
const footer = document.querySelector('.footer');
footer.textContent = `film finder © ${upToDate}`;

class UI {
  constructor() {
    this.searchResponse = document.querySelector('.details');    
    this.favResponse = document.querySelector('.insert-fav');
    this.msgResponse = document.querySelector('.msg-output');
  }
  //take information from film result -> fetch from film class
  showFilms(film) {    
    let output = '';
    //loop trough all results
    film.forEach( (film) => {
    //output all results int the UI
      
      output += `
      <div class="holder card mb-2">
        <div class="info card-body">
          <a rel="noopener noreferrer" href="#" class="card-link text-white">
          <h4 class="card-title full-title" title="add to favourites?">${film.Title}</h4>
          </a>                    
          <h6 class="card-subtitle mb-2 text-muted">${film.Year}</h6>                
          <img class="img-fluid p-2 mb-2"  src="${film.Poster}">
          <br>
          <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query=${film.Title}%20${film.Year}%20official%20trailer" class="card-link">Trailer▷</a>     
        </div>
      </div>
    `;
    });
    //place created UI into DOM
    this.searchResponse.innerHTML = output;
  }

  showfilm(filmInfo) {
    this.searchResponse.innerHTML =`
    <div class="holder card mb-2">
    <div class="info card-body">
      <a rel="noopener noreferrer" href="#" class="card-link text-white">      
      <h4 class="card-title full-title" title="add to favourites?">${filmInfo.Title}</h4>      
      </a>
      <h5 class="card-title">Director: ${filmInfo.Director}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${filmInfo.Year}</h6>
      <img class="img-fluid p-2"  src="${filmInfo.Poster}">
      <br>
      <div class="card-body">
        <p class="card-text"><small>${filmInfo.Plot}</small></p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${filmInfo.Actors}</li>
        <li class="list-group-item">Genre: ${filmInfo.Genre}</li>
        <li class="list-group-item">Runtime: ${filmInfo.Runtime}</li>
      </ul>            
      <div class="card-body">        
        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/results?search_query=${filmInfo.Title}%20${filmInfo.Year}%20official%20trailer" class="card-link">Trailer ▷</a>
        
  </div>
    <div class="card-footer text-muted">
      <p class="card-text"><small>imdbRating:${filmInfo.imdbRating} ☆ Rated:${filmInfo.Rated} </small></p>
    </div>
  </div>
  `;
  }

  msgHandle(message) {
    this.message = '';
    let eMsg = `
    <div class="alert alert-dismissible alert-info">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Oh well...</strong> <a href="#" class="alert-link">${message} Title or Keyword</a> while submitting again.
    </div>    
    `;
    this.msgResponse.innerHTML = eMsg;
  }

  favSaved(films) {
    films = store.savedFilms;    
    //let output='';
    films.forEach((films) => {
      const list = document.createElement('li');
      list.className = 'list-group-item d-flex justify-content-between align-items-center list';
      list.innerHTML = `      
        
          <a href="#" class="card-link text-white saved-title" title="show details">${films}</a>
          <a href="#" class="card-link"><span class="badge badge-pill badge-dark delete">X</span></a>
                    
      `;
      this.favResponse.appendChild(list);
    });
    
  }

  addSingleFilm(e) {
    let el = e.target.closest('.full-title');
    let titleToSave = el.textContent;
    const list = document.createElement('li');
    list.className = 'list-group-item d-flex justify-content-between align-items-center';
    list.innerHTML = `      
      
        <a href="#" class="card-link text-white saved-title" title="show details">${titleToSave}</a>
        <a href="#" class="card-link"><span class="badge badge-pill badge-dark delete">X</span></a>
                  
    `;
    this.favResponse.appendChild(list);
  }

  deleteAllui() {
    const listOfFilms = document.querySelector('.insert-fav');    
    while  (listOfFilms.hasChildNodes()) {
      listOfFilms.removeChild(listOfFilms.lastChild);  
    }
    
    
  }

  deleteSaved(target) {
    
    /*
    the issue here is DOM has no NODE with clss of .delete it has been created by innerHTML so element.matches(selectorString); will solve it.
    */
    if(target.matches('.delete')) {
      target.parentElement.parentElement.remove();
      console.log('removed');
    }
     
     console.log(target);   
  }

  savedDetails(e) {
    let el = e.target.closest('.saved-title').textContent;
    let itemToShow = el;
    if(!itemToShow && e.terget) {
      return false;
    } else{
      console.log(itemToShow);
    }    
    
  }

  
  msgSaved(message) {
    //clear remaining alerts
    this.clearAlert();
    const msgLS = document.createElement('h6');
    msgLS.className = 'store-msg text-info';

    msgLS.appendChild(document.createTextNode(message));
    //parent and message
    const parentCard = document.querySelector('.info-saved');
    const savedList = document.querySelector('.insert-msg');
    parentCard.insertBefore(msgLS, savedList);
    //timeout
    setTimeout(() =>{
      document.querySelector('.store-msg').remove();
    }, 3000);    
  }
  // to show just one alert at time regarding to the same event
  clearAlert() {
    const currentAllert = document.querySelector('.store-msg');
    if(currentAllert){
      currentAllert.remove();
    }
  }

  
}

