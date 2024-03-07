const express = require("express");
const app = express();
app.use(express.json());

module.exports = class Recipe {
  async getRecipes(request, response, db) {
    const { search_q = "", sort_by = "id", sort_order = "ASC" } = request.query;
    const getRecipesQuery = `SELECT * FROM recipe WHERE name LIKE '%${search_q}%' ORDER BY ${sort_by} ${sort_order};`;
    const recipes = await db.all(getRecipesQuery);
    response.send(recipes);
  }

  async getRecipe(request, response, db) {
    const { id } = request.params;
    const getRecipeQuery = `select * from recipe where id=${id}`;
    const recipe = await db.get(getRecipeQuery);
    response.send(recipe);
  }

  async addRecipe(request, response, db) {
    const recipeDetails = request.body;
    const { name, description, ingredients, instructions, imageUrl } =
      recipeDetails;
    const addRecipeQuery = `insert into recipe(name,description,ingredients,instructions,image_url)
    values('${name}','${description}','${ingredients}','${instructions}','${imageUrl}');`;
    await db.run(addRecipeQuery);
    response.send("Recipe added successfully");
  }

  async updateRecipe(request, response, db) {
    const { id } = request.params;
    const recipeDetails = request.body;
    const { name, description, ingredients, instructions, imageUrl } =
      recipeDetails;
    const updateRecipeQuery = `update recipe set name='${name}',description='${description}',
    ingredients='${ingredients}',instructions='${instructions}',image_url='${imageUrl}' where id=${id}`;
    await db.run(updateRecipeQuery);
    response.send("Recipe updated successfully");
  }

  async deleteRecipe(request, response, db) {
    const { id } = request.params;
    const deleteRecipeQuery = `delete from recipe where id=${id}`;
    await db.run(deleteRecipeQuery);
    response.send("Recipe deleted successfully");
  }
};
