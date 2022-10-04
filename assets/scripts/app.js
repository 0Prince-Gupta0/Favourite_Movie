
const addMovieModal=document.getElementById("add-modal");
const StartAddMovieButton=document.querySelector("header button");

const backdrop=document.getElementById("backdrop");
const CancelAddMovie=addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = CancelAddMovie.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const NewText=document.getElementById("entry-text");
const listadd=document.getElementById("movie-list");
const confirmDel=document.getElementById("delete-modal");
const confirmYes=confirmDel.querySelector('.btn--danger');
const confirmNo=confirmDel.querySelector('.btn--passive');
let movieIndex=0;

const confirm=()=>{
  togglebackdrop();
  confirmDel.classList.toggle('visible');
}
const deletemovie=(movieId)=>{
 

  for( const movie of movies)
  {
    if(movieId===movie.id)
    {break;}
    movieIndex++;
  }
  
  confirm();
  confirmYes.addEventListener('click',deleteElement);
  confirmNo.addEventListener('click',confirm);
}
const deleteElement=()=>{
  
  movies.splice(movieIndex,1);
  listadd.children[movieIndex].remove();
  UpdateUI();
  confirm()
 
}
const UpdateUI=()=>{
  if(movies.lenght===0)
  {
   NewText.style.display='block';
  }
  else{
NewText.style.display='none';
  }
}
const renderNewMovie=(id,title,image,rating)=>{
  const newMovieElement=document.createElement('li');
  newMovieElement.className='movie-element';
  newMovieElement.innerHTML=`
  <table cell spacing='10'>
  <tr><td> <div class="movie-element__image">
  <img src="${image}" alt="Image Not Found"></img>
  </div></td>
      <td>
      <div class="movie-element__info">
      <h2>"${title}"</h2>
      <p>"${rating}/5 star"</p>
      </div>
      </td>
  </tr>
 
 
  </table>
  `;
  newMovieElement.addEventListener('click',deletemovie.bind(null,id));
listadd.append(newMovieElement);
};

const togglebackdrop=()=>{
    backdrop.classList.toggle('visible');
};
const toggleMovie=()=>{
    addMovieModal.classList.toggle('visible');
    togglebackdrop();
};
const clearMovie=()=>{
  for( const usrinputs of userInputs)
  {
    usrinputs.value="";
  }
};

const backdropClickHandler=()=>{
    backdrop.classList.toggle('visible');
    addMovieModal.classList.toggle('visible');
};
const CancelAddMoviebtn=()=>{
    toggleMovie();
};
const cancelAddMovieHandler = () => {
    toggleMovieModal();
  };
  const movies= [];
  const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
   
    if (
      titleValue.trim() === '' ||
      imageUrlValue.trim() === '' ||
      ratingValue.trim() === '' ||
      +ratingValue < 1 ||
      +ratingValue > 5
    ) {
      alert('Please enter valid values (rating between 1 and 5).');
      return;
    }
    const NewMovie={
      id: Math.random().toString(),
      title: titleValue, 
      image: imageUrlValue,
      rating: ratingValue
    }
    movies.push(NewMovie);
    console.log(movies);
    toggleMovie();
    clearMovie();
    renderNewMovie(NewMovie.id, NewMovie.title,NewMovie.image,NewMovie.rating);
   UpdateUI();
  };
 


StartAddMovieButton.addEventListener('click', toggleMovie);
backdrop.addEventListener('click',backdropClickHandler);
CancelAddMovie.addEventListener('click',CancelAddMoviebtn);
confirmAddMovieButton.addEventListener('click',addMovieHandler);