import React, { useState } from "react";

const RecipeFinder = () => {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    
    const apiKey = "20e8d773027b4b1b9cd8f47f2f39db49"; 

    const searchRecipes = async () => {
        if (!query) {
            alert("Please enter an ingredient");
            return;
        }
        
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setRecipes(data.results);
        } catch (error) {
            alert("Failed to fetch recipes. Try again!");
        }
    };
    
    const showRecipeDetails = async (recipeId) => {
        const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSelectedRecipe(data);
        } catch (error) {
            alert("Failed to fetch recipe details. Try again!");
        }
    };

    return (
        <div style={{ 
          textAlign: "center", 
          fontFamily: "Arial, sans-serif", 
          padding: "20px", 
          minHeight: "100vh",
          backgroundImage: "url('/background-image.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
      }}>
            <h1>RECIPE FINDER</h1>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Enter ingredient (e.g. chicken)"
                style={{ padding: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <button 
                onClick={searchRecipes} 
                style={{ padding: "10px", marginLeft: "10px", cursor: "pointer", border: "none", backgroundColor: "#28a745", color: "white", borderRadius: "5px" }}
            >
                Search
            </button>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
                {recipes.map(recipe => (
                    <div key={recipe.id} onClick={() => showRecipeDetails(recipe.id)}
                        style={{ cursor: "pointer", border: "1px solid #ddd", padding: "10px", margin: "10px", width: "250px", borderRadius: "5px", background: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
                        <h3>{recipe.title}</h3>
                        <img src={recipe.image} alt={recipe.title} style={{ width: "100%", borderRadius: "5px" }} />
                    </div>
                ))}
            </div>

            {selectedRecipe && (
                <div style={{ marginTop: "20px", textAlign: "left", padding: "20px", border: "1px solid #ddd", background: "white", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)", maxWidth: "600px", margin: "20px auto" }}>
                    <h2>{selectedRecipe.title}</h2>
                    <img src={selectedRecipe.image} alt={selectedRecipe.title} style={{ width: "100%", borderRadius: "5px" }} />
                    <p><strong>Ingredients:</strong></p>
                    <ul>{selectedRecipe.extendedIngredients?.map(ing => <li key={ing.id}>{ing.original}</li>)}</ul>
                    <p><strong>Instructions:</strong></p>
                    <p>{selectedRecipe.instructions || "No instructions available."}</p>
                </div>
            )}
        </div>
    );
};

export default RecipeFinder;
