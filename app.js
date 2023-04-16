(async function(){
const response=await fetch("./data.json")
const movies = await response.json()

const butnEl=document.getElementById("searchBtn")
const inputEl=document.getElementById("searchInput")
const listEl=document.getElementById("recipe-list")
const containerEl=document.getElementById("recipeDetailsContainer")
const mostWatchedEl=document.getElementsByClassName("most_watched")
const mostRecentEl=document.getElementsByClassName("most_recent")
const mostPopularEl=document.getElementsByClassName("most_popular")

function search() {
    const value = inputEl.value.toLowerCase();
    const result = movies.filter(function(recipe) {
      let genresString = "";
      if (typeof recipe.genres === "string") {
        genresString = recipe.genres.toLowerCase();
      } else if (Array.isArray(recipe.genres)) {
        genresString = recipe.genres.join(" ").toLowerCase();
      }

      return (
        recipe.title.toLowerCase().includes(value) ||
        recipe.original_language.toLowerCase().includes(value) ||
        genresString.includes(value) ||
        recipe.tagline.toLowerCase().includes(value) ||
        recipe.overview.toLowerCase().includes(value)
      );
      
    });
    displaySearchResult(result);
    console.log(result);
  }
  
butnEl.addEventListener("click",search)
function displaySearchResult(result){
    listEl.innerHTML=""
    result.forEach(function(recipe){
        const li=document.createElement("li")
        const ListItem=`
        <h2 className="title">${recipe.title}</h2>
        <div className="description">${recipe.genres}</div>
        <div className="description"><b>Languages: </b>${recipe.original_language}</div>
        <div className="description"><b>Cast: </b>${recipe.cast.map(actor => actor.name)          
            .join(", ")}</div>
            <div className="description"><b>Release Date: </b>${recipe.release_date}</div>
        `

        li.innerHTML=ListItem
        li.addEventListener("click", function () {
            loadRecipeDetails(recipe);
        });
        listEl.appendChild(li)
    })
}
function loadRecipeDetails(recipe) {
    containerEl.innerHTML = `
        <h2 class="title">${recipe.title}</h2>
        <h3>Genres:</h3>
        <ul>${recipe.genres.map(function (ingredient) {
          return "<li>" + ingredient + "</li>"
        }).join("")}</ul>
        <h3>Overview:</h3>
        <div>${recipe.overview}</div>
        <h3>Run Time:</h3>
        <div>${recipe.runtime}</div>
        <h3>Budget:</h3>
        <div>${recipe.budget} $</div>
        <h3>Revenue:</h3>
        <div>${recipe.revenue} $</div>
        <h3>Rating:</h3>
        <div>${recipe.vote_average} </div>
        <h3>Popularity:</h3>
        <div>${recipe.popularity} </div>
        <h3>Directors:</h3>
        <div className="description">${recipe.directors.map(directors => directors.name)          
            .join(", ")}</div>
        <h3>Writers:</h3>
        <div className="description">${recipe.writers.map(directors => directors.name)          
            .join(", ")}</div>

    `;
  }
  for (let i = 0; i < mostRecentEl.length; i++) {
    mostRecentEl[i].addEventListener("click", function() {
      // Add code to handle most recent button click
      const sortedMovies = movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    displaySearchResult(sortedMovies)
    console.log(sortedMovies)
    });
  }
  for (let i = 0; i < mostPopularEl.length; i++) {
    mostPopularEl[i].addEventListener("click", function() {
      // Add code to handle most recent button click
      const popularMovies = movies.sort((a, b) => (b.popularity) - (a.popularity));
    displaySearchResult(popularMovies)
    });
  }
  for (let i = 0; i < mostWatchedEl.length; i++) {
    mostWatchedEl[i].addEventListener("click", function() {
      // Add code to handle most recent button click
      const WatchedMovies = movies.sort((a, b) => (b.vote_average) - (a.vote_average));
    displaySearchResult(WatchedMovies)
    });
  }

  
})()