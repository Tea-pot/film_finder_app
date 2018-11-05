//Storage
const store = new Store();
//get stored data
const storedFilms = store.getFilmData();
//fetch film
const film = new Film();

// UI
const ui = new UI();


const replacers= {" ": "%20", "&": "%26"};
const regex = new RegExp( Object.keys(replacers).join('|'), "g"); 
//let titleUri = s.replace(regex, match => replaceChars[match]);
//console.log(titleUri);


//fetch film
const findFilm = document.querySelector('#find');
const findTitle = document.querySelector('#find-title');

//input field
let inputStr = document.querySelector('#phrase');
//event variable
const toFav = document.querySelector('.details');
//home and favourites toggle
const toggler = document.querySelector('.nav');
//favourites
const favList = document.querySelector('.insert-fav');
//delete all saved favourites
const clearLS = document.querySelector('.clearLS');

//load saved favourites film DOMcontentLoaded
document.addEventListener('DOMContentLoaded', loadFav);
//event listener for delete
favList.addEventListener('click', delFav);



//event delegation for Remove all saved films from LS
clearLS.addEventListener('click', deleteAllFilms);


//Enter press handle
inputStr.addEventListener('keydown', enterHandler);

//event delegation for favourites
toFav.addEventListener('click', storeTitle);

//display details of storeg Favourites
favList.addEventListener('click', savedDetails);





// should return promise, method is async in film, so we need to treat it as a promise
findFilm.addEventListener('click', getFilm);
findTitle.addEventListener('click', getTitle);

//displaying saved films on DOM load
function loadFav(){
  ui.favSaved();

    
}


//event delegation for handling Local Storage
function storeTitle(e) {  
  store.setFilmData(e);
  store.getFilmData();
  ui.addSingleFilm(e);
  ui.msgSaved('film has been saved...');    
} 



//ui and LS handling single entry edelete 
function delFav(e) {
    
  ui.deleteSaved(e.target);
  
  store.removeFromFav(e.target);
  
  if(!e.target.matches('.delete')){
    return false;
  } else{
      console.log(e.target.parentElement.parentElement.nodeName);
      ui.msgSaved('film has been deleted...');
  }

  e.preventDefault();  
}

//Local storage delete all saved movies MODAL
function deleteAllFilms() {  
  ui.deleteAllui();  
  store.getFilmData();
  if(store.savedFilms = []) {
    ui.msgSaved('there is no saved films...');
  }else {
    ui.msgSaved('All films has been deleted...');
  };
  store.removeAllFav();
  
}


//enter press event
function enterHandler(e) {
   if(e.keyCode === 13) {
    ui.msgHandle('Press');
    e.preventDefault();
   } else{
    false;
    
   }
   //e.keyCode === 13 ? ui.msgHandle('Press') : false;
   console.log('enter perssed'); 
         
}

//show details of saved Favourites films event handler
function savedDetails(e) {  
  ui.savedDetails(e);
  let el = e.target.textContent;

  /* 
  here we need to pass text content of element to use film method and display response from API
  */
  if (!el) {
    return false;
  } else{
    let toGet = el.replace(regex, match => replacers[match]);
    film.getTitle(toGet)
    .then(filmInfo => {
    console.log(filmInfo);
    ui.showfilm(filmInfo);

    })
    .catch(err => console.log(err));
    ui.msgSaved('open home for details');
    

  }

  e.preventDefault();
}





// this function should be called while user press keyword button for phrase
function getFilm(e) {  
  let inStr = document.querySelector('#phrase').value.trim();
  if(inStr == '') {
    ui.msgHandle('Enter');
  } else {
  let title = inStr.replace(regex, match => replacers[match]);
  
  film.getFilm(title)
  .then(film => {
    console.log(film);
    //show results as UI
    ui.showFilms(film);

  })
  .catch( err => console.log(err));

  }
// to prevent default form behavior and do not reload page
  e.preventDefault();
}

// this function should be called while user press title button for title
function getTitle(e) {
  let inStr = document.querySelector('#phrase').value.trim();
  if(inStr == '') {
    ui.msgHandle('Enter');
  } else {
  let fullTitle = inStr.replace(regex, match => replacers[match]);
  

  film.getTitle(fullTitle)
  .then(filmInfo => {
    console.log(filmInfo);
    ui.showfilm(filmInfo);

  })
  .catch(err => console.log(err));
}
  e.preventDefault();

}

