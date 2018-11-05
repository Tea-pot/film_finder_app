
class Store { 
  constructor() {
    this.savedFilms = JSON.parse(localStorage.getItem('films')) || [];
  }
  

   getFilmData() {
     let films;
     if(localStorage.getItem('films') === null) {
       films = [];
       

     } else {
       films = JSON.parse(localStorage.getItem('films'));
       console.log(films);
     }
     return films;

    }
  

  setFilmData(e) { 
    //we need to parse it in order to user push() method to append existing array.
    let films = this.savedFilms;   
    let el = e.target.closest('.full-title');
    let titleToSave = el.textContent;    
        
    if(e.target !== el) {
      return false;
    } else{
      console.log(titleToSave);
      console.log(typeof titleToSave);
        
      e.preventDefault();
    }

    films.push(titleToSave);
    //we need to stringify it in order to store it in LS
    localStorage.setItem('films', JSON.stringify(films));
    //console.log(films);

  }

  removeFromFav(target) {
    /* 
    we need to remove unique title, while clicking on X, parent elemrnt of tag a, we are aiming for text content of an a tag where saved-title">${films}</a> is stored.
    looping through array searching for unique title - toDel variable -text content we can gat an index of this element. While we know an inde of element we'd like to remove, we can simply use 
    array.splice(index, howmany, item1, ....., itemX) - (www.w3schools.com/jsref/jsref_splice.asp)
    */ 
   let films = this.savedFilms;
   let toDel = target.parentElement.previousElementSibling.textContent;
   films.forEach((toDel, index) =>{
     if(toDel === target.parentElement.previousElementSibling.textContent){
       console.log(toDel, index);
       films.splice(index, 1);

     }
     localStorage.setItem('films', JSON.stringify(films));
     console.log(films);    
     
   
  })
    
  }

  removeAllFav() {  
    let films = this.savedFilms;   
    localStorage.clear();
    localStorage.getItem('films');
    console.log(films);
  }

}
