const express = require("express");
const app = express();
app.use(express.json());

module.exports = class Recipe {
  async getRecipe(request, response, db) {
    const { id } = request.params;
    const getRecipeQuery = `select * from recipe where id=${id}`;
    const book = await db.get(getRecipeQuery);
    response.send(book);
  }

  async addRecipe(request, response, db) {
    const { name, description, ingredients, instructions, imageUrl } =
      request.body;
    const addRecipeQuery = `Insert into recipe(name,description,ingredients,instructions,image_url)
    values('${name}','${description}','${ingredients}','${instructions}','${imageUrl}');`;
    await db.run(addRecipeQuery);
    response.send("Recipe added successfully");
  }

  async updateRecipe(request, response, db) {
    
  }

  async deleteRecipe(request, response, db) {}
};
