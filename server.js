const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Enabling CORS to allow frontend (React) to connect

// MongoDB connection string (use your MongoDB credentials)
mongoose.connect('mongodb+srv://yug1785:yugchoubey@cluster0.ufrpm.mongodb.net/recipe_optimizer?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes
app.post('/recipes', async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const newRecipe = new Recipe({ name, ingredients, instructions });
  await newRecipe.save();
  res.status(201).json(newRecipe);
});

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Recipe optimization route
app.get('/recipes/optimize', async (req, res) => {
  const { ingredients } = req.query;
  const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

  const recipes = await Recipe.find({
    ingredients: { $all: ingredientList }
  });

  res.json(recipes);  // Return the matching recipes
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
