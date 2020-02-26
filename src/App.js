import React,{useEffect, useState} from 'react';
import { REACT_APP_API_ID, REACT_APP_API_KEY} from './config.js';
import Recipe from "./Recipe"
import './App.css';
//require("dotenv").config()

const App = () => {
  const APP_ID = REACT_APP_API_ID;
  const APP_KEY = REACT_APP_API_KEY;  
  
  const [recipes, setRecipes] = useState([]); //taking arguments from the state, passing down to props
  const [search, setSearch] = useState("");// updates everytime we type a value into search. We use query below to fix
  const [query, setQuery] = useState("chicken"); //only updates search after we click submit button

  useEffect(()=>{
    getRecipes();
  }, [query]); // useEffect only runs when our query changes

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  // e is an event, update search is a function that changes the state
  const updateSearch = e=> {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }



  return( //returns jsx
    <div className = "App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe // props get values passed down from state, the go to Recipe.js
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
