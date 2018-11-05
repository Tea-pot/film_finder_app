class Film {
  constructor() {
    this.apikey = '3d2d65ad'; 
    //strongly recomanded to change it for your own from http://www.omdbapi.com/


  }


  //fetch search response

  async getFilm(title) {
    
    const filmResponse = await fetch(`http://www.omdbapi.com/?s=${title}&plot=full&apikey=${this.apikey}`);    
    
    const film = await filmResponse.json();    
    
    return film.Search;      

  }
 
  async getTitle(fullTitle) {
    
    const fullTitleResponse = await fetch(`http://www.omdbapi.com/?t=${fullTitle}&plot=full&apikey=${this.apikey}`);

    const filmInfo = await fullTitleResponse.json();

    return filmInfo;
  }





}