// seeding.js
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

// Connect to MongoDB
mongoose.connect('mongodb+srv://<your-mongo-connection-string>')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Sample Recipes (Indian)
const recipes = [
  { name: 'Paneer Butter Masala', ingredients: ['paneer', 'butter', 'cream', 'tomato', 'garam masala'], instructions: 'Fry paneer, then simmer in a rich tomato and butter gravy.' },
  { name: 'Chole Bhature', ingredients: ['chickpeas', 'flour', 'onion', 'tomato', 'spices'], instructions: 'Cook chickpeas with spices, serve with deep-fried bread called Bhature.' },
  { name: 'Aloo Gobi', ingredients: ['potato', 'cauliflower', 'turmeric', 'cumin seeds', 'garam masala'], instructions: 'Cook potatoes and cauliflower with spices until tender.' },
  { name: 'Vegetable Biryani', ingredients: ['rice', 'vegetables', 'yogurt', 'onions', 'spices'], instructions: 'Layer vegetables and rice, cook with spices.' },
  { name: 'Palak Paneer', ingredients: ['spinach', 'paneer', 'garlic', 'onion', 'garam masala'], instructions: 'Cook spinach with spices, blend into a paste, and add paneer.' },
  { name: 'Masoor Dal', ingredients: ['masoor dal', 'onion', 'tomato', 'garlic', 'turmeric'], instructions: 'Cook lentils with spices and garnish with fried onions.' },
  { name: 'Samosa', ingredients: ['potato', 'peas', 'spices', 'flour'], instructions: 'Stuff spiced potatoes and peas into dough and deep fry.' },
  { name: 'Pav Bhaji', ingredients: ['vegetables', 'bread', 'butter', 'spices'], instructions: 'Mash cooked vegetables with spices, serve with buttered bread rolls.' },
  { name: 'Methi Thepla', ingredients: ['fenugreek leaves', 'flour', 'yogurt', 'spices'], instructions: 'Knead dough with fenugreek leaves and spices, roll into flatbreads and cook.' },
  { name: 'Baingan Bharta', ingredients: ['eggplant', 'onion', 'tomato', 'garlic', 'spices'], instructions: 'Roast eggplant, mash it, and cook with onions and tomatoes.' }
];

async function seedDatabase() {
  await Recipe.deleteMany();  // Clear existing recipes
  await Recipe.insertMany(recipes);  // Insert new recipes
  console.log('10 Indian recipes added!');
  mongoose.connection.close();
}

seedDatabase();
