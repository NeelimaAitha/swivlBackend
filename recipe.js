const express = require("express");
const app = express();
app.use(express.json());

class Recipe {
  async getRecipes(request, response, db) {
    try {
      const {
        search_q = "",
        sort_by = "id",
        sort_order = "ASC",
      } = request.query;
      const getRecipesQuery = `SELECT name,description,ingredients,instructions,image_url as imageUrl FROM recipe WHERE name LIKE '%${search_q}%' ORDER BY ${sort_by} ${sort_order};`;
      const recipes = await db.all(getRecipesQuery);
      response.send(recipes);
    } catch (error) {
      console.error("Error getting recipes:", error);
      response.status(500).send("An error occurred while getting the recipes");
    }
  }

  async getRecipe(request, response, db) {
    try {
      const { id } = request.params;
      const getRecipeQuery = `SELECT name,description,ingredients,instructions,image_url as imageUrl FROM recipe WHERE id=${id}`;
      const recipe = await db.get(getRecipeQuery);
      response.send(recipe);
    } catch (error) {
      console.error("Error getting recipe:", error);
      response.status(500).send("An error occurred while getting the recipe");
    }
  }

  async addRecipe(request, response, db) {
    try {
      const recipeDetails = request.body;
      const { name, description, ingredients, instructions, imageUrl } =
        recipeDetails;
      const addRecipeQuery = `INSERT INTO recipe(
        name,description,ingredients,instructions,image_url
        )
        VALUES(
            '${name}','${description}','${ingredients}','${instructions}','${imageUrl}'
        );`;
      await db.run(addRecipeQuery);
      response.send("Recipe added successfully");
    } catch (error) {
      console.error("Error adding recipe:", error);
      response.status(500).send("An error occurred while adding the recipe");
    }
  }

  async updateRecipe(request, response, db) {
    try {
      const { id } = request.params;
      const recipeDetails = request.body;
      const { name, description, ingredients, instructions, imageUrl } =
        recipeDetails;

      const updateRecipeQuery = `UPDATE recipe SET
        name='${name}',
        description='${description}',
        ingredients='${ingredients}',
        instructions='${instructions}',
        image_url='${imageUrl}' WHERE id=${id}`;

      await db.run(updateRecipeQuery);
      response.send("Recipe updated successfully");
    } catch (error) {
      console.error("Error updating recipe:", error);
      response.status(500).send("An error occurred while updating the recipe");
    }
  }

  async deleteRecipe(request, response, db) {
    try {
      const { id } = request.params;
      const deleteRecipeQuery = `DELETE FROM recipe WHERE id=${id}`;
      await db.run(deleteRecipeQuery);
      response.send("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      response.status(500).send("An error occurred while deleting the recipe");
    }
  }
}

module.exports = Recipe;
