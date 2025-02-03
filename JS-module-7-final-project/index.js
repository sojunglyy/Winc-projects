"use strict";

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();
// Your functions here

//Return all authors of a give recipe list (check box 2)
const getAuthors = (recipes) => {
  const authors = [];
  recipes.forEach((recipe) => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });
  return authors;
};
console.log(
  "--------------------------------Authors of Recipes-----------------------------------"
);
console.log(getAuthors(cakeRecipes));

//Return the name of each recipe in a given recipe list (check box 4)
const getRecipeName = (recipes) => {
  if (!recipes) {
    return "No recipes found.";
  }
  const recipeNames = [];
  recipes.forEach((recipe) => {
    const { Name: recipeName } = recipe;
    recipeNames.push(recipeName);
  });
  return recipeNames;
};
console.log(
  "--------------------------------Names of recipes-----------------------------------"
);
console.log(getRecipeName(cakeRecipes));

//Return all recipes of a given author (check box 5)
const getRecipesByAuthor = (recipes, author) => {
  author = author.toLowerCase();
  const result = recipes.filter(
    (recipe) => recipe.Author.toLowerCase() === author
  );
  return result;
};
console.log(
  "--------------------------------Recipes By Author-----------------------------------"
);
console.log(getRecipesByAuthor(cakeRecipes, "Good Food"));

//Return a list of recipes that contain a given ingredient (check box 7)
const getRecipesByIngredient = (recipes, ingredient) => {
  const result = recipes.filter((recipe) =>
    recipe.Ingredients.some((string) => string.includes(ingredient))
  );
  return result;
};
console.log(
  "--------------------------------Recipes By Ingredient-----------------------------------"
);
console.log(getRecipesByIngredient(cakeRecipes, "carrot"));

//Return recipes that contain a specific ingredient (check box 8)
const getRecipesWithSpecificIngredient = (recipes, ingredient) => {
  const foundRecipesName = [];
  recipes.forEach((recipe) => {
    if (recipe.Ingredients.includes(ingredient)) {
      foundRecipesName.push(recipe.Name);
    }
  });
  return foundRecipesName;
};
console.log(
  "--------------------------------Recipe Names By Specific Ingredient-----------------------------------"
);
console.log(getRecipesWithSpecificIngredient(cakeRecipes, "140g caster sugar"));

//Return a single recipe that matches the given name (check box 9)
const getRecipeByName = (recipes, recipeName) => {
  const result = recipes.find((recipe) => recipe.Name.includes(recipeName));
  return result;
};
console.log(
  "--------------------------------Recipe By A Name-----------------------------------"
);
console.log(getRecipeByName(cakeRecipes, "mature"));

//Return all ingredients of a given recipe list (check box 11)
const getIngredientsOfRecipes = (recipes) => {
  //   const ingredientsFromEachRecipe = [];
  //   recipes.forEach((recipe) => {
  //     ingredientsFromEachRecipe.push(recipe.Ingredients);
  //   });
  //   const flattened = ingredientsFromEachRecipe.reduce(
  //     (acc, cur) => acc.concat(cur),
  //     []
  //   );
  //   return flattened;
  return recipes.reduce((ingredients, recipe) => {
    return ingredients.concat(recipe.Ingredients);
  }, []);
};
//Make a shorter array using the previous made function (check box 12)
const shorterArray = getRecipesByAuthor(cakeRecipes, "James Martin");
console.log(
  "--------------------------------All Ingredints of a Given Recipe List-----------------------------------"
);
console.log(getIngredientsOfRecipes(shorterArray));

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

let choice;
let savedRecipes = [];
do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(getAuthors(cakeRecipes));
      break;
    case 2:
      const author = prompt("Enter the name of an author: ");
      console.log(getRecipesByAuthor(cakeRecipes, author));
      break;
    case 3:
      const ingredient = prompt("Enter the name of the ingredient: ");
      console.log(getRecipesWithSpecificIngredient(cakeRecipes, ingredient));
      break;
    case 4:
      const recipeName = prompt("Enter the name of the recipe: ");
      const foundRecipe = getRecipeByName(cakeRecipes, recipeName);
      if (foundRecipe) {
        console.log(foundRecipe);
        savedRecipes.push(foundRecipe);
      } else {
        console.log("No recipe found");
      }
      break;
    case 5:
      console.log(savedRecipes);
      console.log(getIngredientsOfRecipes(savedRecipes));
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
