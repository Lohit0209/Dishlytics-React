export const RECIPES = {
    paneer_butter_masala: {
        cuisine: "North Indian",
        name: "Paneer Butter Masala",
        baseServings: 4,
        time: 30,
        ingredients: [
            { name: "Paneer", quantity: 400, unit: "grams" },
            { name: "Butter", quantity: 4, unit: "tablespoons" },
            { name: "Tomato puree", quantity: 2, unit: "cups" },
            { name: "Fresh cream", quantity: 3, unit: "tablespoons" },
            { name: "Garam masala", quantity: 2, unit: "teaspoons" }
        ],
        steps: ["Heat butter and oil in a pan", "Add tomato puree and cook for 5 minutes", "Add spices and mix well", "Add paneer cubes and simmer for 10 minutes", "Add cream, stir, and serve hot"]
    },
    veg_biryani: {
        cuisine: "North Indian",
        name: "Vegetable Biryani",
        baseServings: 4,
        time: 45,
        ingredients: [
            { name: "Basmati rice", quantity: 2, unit: "cups" },
            { name: "Mixed vegetables", quantity: 2, unit: "cups" },
            { name: "Yogurt", quantity: 4, unit: "tablespoons" },
            { name: "Biryani masala", quantity: 2, unit: "teaspoons" },
            { name: "Fried onions", quantity: 1, unit: "handful" }
        ],
        steps: ["Wash and soak rice for 20 minutes", "Cook vegetables with masala", "Layer rice and vegetables in a pot", "Add fried onions and ghee", "Steam for 15 minutes and serve"]
    },
    chicken_biryani: {
        cuisine: "North Indian",
        name: "Chicken Biryani",
        baseServings: 4,
        time: 60,
        ingredients: [
            { name: "Chicken", quantity: 600, unit: "grams" },
            { name: "Basmati rice", quantity: 2, unit: "cups" },
            { name: "Yogurt", quantity: 1, unit: "cup" },
            { name: "Biryani masala", quantity: 3, unit: "tablespoons" },
            { name: "Fried onions", quantity: 1, unit: "cup" }
        ],
        steps: ["Marinate chicken with yogurt and spices", "Cook rice 70% and keep aside", "Layer chicken and rice in a pot", "Add fried onions and ghee", "Dum cook for 25 minutes"]
    },
    rajma: {
        cuisine: "North Indian",
        name: "Rajma Curry",
        baseServings: 4,
        time: 40,
        ingredients: [
            { name: "Rajma (soaked)", quantity: 2, unit: "cups" },
            { name: "Tomato puree", quantity: 2, unit: "cups" },
            { name: "Onions (chopped)", quantity: 2, unit: "pieces" },
            { name: "Ginger garlic paste", quantity: 2, unit: "teaspoons" },
            { name: "Oil", quantity: 2, unit: "tablespoons" }
        ],
        steps: ["Pressure cook rajma with salt", "Sauté onions and spices", "Add tomato puree and cook", "Mix cooked rajma and simmer 20 minutes"]
    },
    dal_makhani: {
        cuisine: "North Indian",
        name: "Dal Makhani",
        baseServings: 4,
        time: 50,
        ingredients: [
            { name: "Whole urad dal", quantity: 1, unit: "cup" },
            { name: "Rajma", quantity: 4, unit: "tablespoons" },
            { name: "Butter", quantity: 4, unit: "tablespoons" },
            { name: "Tomato puree", quantity: 1, unit: "cup" },
            { name: "Cream", quantity: 4, unit: "tablespoons" }
        ],
        steps: ["Soak dal & rajma overnight", "Pressure cook until soft", "Prepare gravy with tomato & butter", "Mix dal and simmer for 30 minutes", "Add cream before serving"]
    },
    veg_pasta: {
        cuisine: "Italian",
        name: "Creamy Veg Pasta",
        baseServings: 4,
        time: 25,
        ingredients: [
            { name: "Pasta", quantity: 400, unit: "grams" },
            { name: "Mixed vegetables", quantity: 2, unit: "cups" },
            { name: "Milk", quantity: 1, unit: "cup" },
            { name: "Cheese", quantity: 4, unit: "tablespoons" },
            { name: "Butter", quantity: 2, unit: "tablespoons" }
        ],
        steps: ["Boil pasta until al dente", "Cook vegetables in butter", "Add milk and cheese to form sauce", "Mix pasta and simmer briefly"]
    },
    chicken_pasta: {
        cuisine: "Italian",
        name: "Chicken Alfredo Pasta",
        baseServings: 4,
        time: 30,
        ingredients: [
            { name: "Pasta", quantity: 400, unit: "grams" },
            { name: "Chicken", quantity: 400, unit: "grams" },
            { name: "Milk", quantity: 1, unit: "cup" },
            { name: "Cheese", quantity: 4, unit: "tablespoons" },
            { name: "Butter", quantity: 2, unit: "tablespoons" }
        ],
        steps: ["Boil pasta and set aside", "Cook chicken cubes in butter", "Add milk and cheese for sauce", "Mix pasta and simmer"]
    },
    aloo_paratha: {
        cuisine: "North Indian",
        name: "Aloo Paratha",
        baseServings: 4,
        time: 30,
        ingredients: [
            { name: "Wheat flour", quantity: 2, unit: "cups" },
            { name: "Potatoes (boiled)", quantity: 4, unit: "pieces" },
            { name: "Ghee", quantity: 4, unit: "tablespoons" },
            { name: "Spices", quantity: 1, unit: "teaspoon" }
        ],
        steps: ["Knead dough and rest 10 minutes", "Prepare potato filling", "Roll parathas and stuff filling", "Cook with ghee on tawa"]
    },
    masala_dosa: {
        cuisine: "South Indian",
        name: "Masala Dosa",
        baseServings: 4,
        time: 20,
        ingredients: [
            { name: "Dosa batter", quantity: 2, unit: "cups" },
            { name: "Potato masala", quantity: 2, unit: "cups" },
            { name: "Oil", quantity: 4, unit: "tablespoons" }
        ],
        steps: ["Spread dosa batter on hot tawa", "Add potato masala", "Fold and cook until crispy"]
    },
    egg_curry: {
        cuisine: "North Indian",
        name: "Egg Curry",
        baseServings: 4,
        time: 25,
        ingredients: [
            { name: "Eggs (boiled)", quantity: 8, unit: "pieces" },
            { name: "Onions (chopped)", quantity: 2, unit: "pieces" },
            { name: "Tomato puree", quantity: 1, unit: "cup" },
            { name: "Spices", quantity: 2, unit: "teaspoons" }
        ],
        steps: ["Fry boiled eggs lightly", "Cook onion–tomato gravy", "Add eggs and simmer"]
    },
    chicken_curry: {
        cuisine: "North Indian",
        name: "Chicken Curry",
        baseServings: 4,
        time: 45,
        ingredients: [
            { name: "Chicken", quantity: 600, unit: "grams" },
            { name: "Onions (chopped)", quantity: 2, unit: "pieces" },
            { name: "Tomato puree", quantity: 1, unit: "cup" },
            { name: "Spices", quantity: 2, unit: "teaspoons" },
            { name: "Oil", quantity: 3, unit: "tablespoons" }
        ],
        steps: ["Sauté onions & spices", "Add chicken & cook 10 minutes", "Add tomato puree and simmer 20 minutes"]
    },
    chole: {
        cuisine: "North Indian",
        name: "Chole (Chickpea Curry)",
        baseServings: 4,
        time: 35,
        ingredients: [
            { name: "Chickpeas (soaked)", quantity: 2, unit: "cups" },
            { name: "Onions (chopped)", quantity: 2, unit: "pieces" },
            { name: "Tomato puree", quantity: 1, unit: "cup" },
            { name: "Chole masala", quantity: 2, unit: "teaspoons" }
        ],
        steps: ["Pressure cook chickpeas", "Cook onion–tomato gravy", "Mix chickpeas and simmer"]
    },
    idli_sambar: {
        cuisine: "South Indian",
        name: "Idli Sambar",
        baseServings: 4,
        time: 35,
        ingredients: [
            { name: "Idli batter", quantity: 2, unit: "cups" },
            { name: "Toor dal", quantity: 1, unit: "cup" },
            { name: "Vegetables", quantity: 2, unit: "cups" }
        ],
        steps: ["Steam idlis", "Cook dal and vegetables", "Add tamarind & spices"]
    },
    fried_rice: {
        cuisine: "Chinese",
        name: "Veg Fried Rice",
        baseServings: 4,
        time: 20,
        ingredients: [
            { name: "Rice (cooked)", quantity: 3, unit: "cups" },
            { name: "Mixed vegetables", quantity: 2, unit: "cups" },
            { name: "Soy sauce", quantity: 3, unit: "teaspoons" },
            { name: "Oil", quantity: 3, unit: "tablespoons" }
        ],
        steps: ["Cook rice & cool completely", "Stir fry vegetables", "Add rice & sauces"]
    },
    chicken_fried_rice: {
        cuisine: "Chinese",
        name: "Chicken Fried Rice",
        baseServings: 4,
        time: 25,
        ingredients: [
            { name: "Rice (cooked)", quantity: 3, unit: "cups" },
            { name: "Chicken", quantity: 400, unit: "grams" },
            { name: "Soy sauce", quantity: 3, unit: "teaspoons" },
            { name: "Oil", quantity: 3, unit: "tablespoons" }
        ],
        steps: ["Cook and shred chicken", "Stir fry with rice & sauces"]
    },
    maggi_masala: {
        cuisine: "Street Food",
        name: "Veg Masala Maggi",
        baseServings: 4,
        time: 10,
        ingredients: [
            { name: "Maggi packets", quantity: 4, unit: "pieces" },
            { name: "Mixed vegetables", quantity: 1, unit: "cup" },
            { name: "Water", quantity: 3, unit: "cups" }
        ],
        steps: ["Boil water", "Add veggies and noodles", "Cook 2–3 minutes"]
    },
    pav_bhaji: {
        cuisine: "Street Food",
        name: "Pav Bhaji",
        baseServings: 4,
        time: 30,
        ingredients: [
            { name: "Potatoes (boiled)", quantity: 4, unit: "pieces" },
            { name: "Mixed vegetables", quantity: 2, unit: "cups" },
            { name: "Pav bhaji masala", quantity: 2, unit: "teaspoons" },
            { name: "Butter", quantity: 4, unit: "tablespoons" }
        ],
        steps: ["Mash boiled veggies", "Cook with butter & masala", "Toast pav and serve"]
    },
    fish_curry: {
        cuisine: "South Indian",
        name: "Fish Curry",
        baseServings: 4,
        time: 30,
        ingredients: [
            { name: "Fish", quantity: 600, unit: "grams" },
            { name: "Coconut milk", quantity: 1, unit: "cup" },
            { name: "Tamarind", quantity: 2, unit: "teaspoons" },
            { name: "Spices", quantity: 2, unit: "teaspoons" }
        ],
        steps: ["Marinate fish", "Cook gravy with spices", "Add fish & simmer"]
    }
};

export const INGREDIENT_PRICES = {
    "Paneer": { price: 320, unit: "kg", category: "dairy", nutrition: { cal: 2650, pro: 180, carb: 12, fat: 200 } },
    "Butter": { price: 550, unit: "kg", category: "dairy", nutrition: { cal: 7170, pro: 8, carb: 1, fat: 810 } },
    "Fresh cream": { price: 200, unit: "liter", category: "dairy", nutrition: { cal: 3400, pro: 20, carb: 30, fat: 350 } },
    "Milk": { price: 60, unit: "liter", category: "dairy", nutrition: { cal: 620, pro: 33, carb: 48, fat: 33 } },
    "Yogurt": { price: 80, unit: "kg", category: "dairy", nutrition: { cal: 610, pro: 35, carb: 47, fat: 33 } },
    "Cheese": { price: 400, unit: "kg", category: "dairy", nutrition: { cal: 4020, pro: 250, carb: 13, fat: 330 } },
    "Ghee": { price: 600, unit: "kg", category: "dairy", nutrition: { cal: 9000, pro: 0, carb: 0, fat: 1000 } },
    "Chicken": { price: 220, unit: "kg", category: "meat", nutrition: { cal: 2390, pro: 270, carb: 0, fat: 140 } },
    "Fish": { price: 300, unit: "kg", category: "seafood", nutrition: { cal: 2050, pro: 200, carb: 0, fat: 120 } },
    "Eggs (boiled)": { price: 7, unit: "piece", category: "protein", nutrition: { cal: 70, pro: 6, carb: 1, fat: 5 } },
    "Basmati rice": { price: 90, unit: "kg", category: "grains", nutrition: { cal: 3650, pro: 70, carb: 800, fat: 10 } },
    "Rice (cooked)": { price: 40, unit: "kg", category: "grains", nutrition: { cal: 1300, pro: 27, carb: 280, fat: 3 } },
    "Wheat flour": { price: 35, unit: "kg", category: "grains", nutrition: { cal: 3400, pro: 130, carb: 720, fat: 25 } },
    "Whole urad dal": { price: 120, unit: "kg", category: "lentils", nutrition: { cal: 3410, pro: 250, carb: 580, fat: 15 } },
    "Rajma": { price: 130, unit: "kg", category: "lentils", nutrition: { cal: 3330, pro: 240, carb: 600, fat: 8 } },
    "Rajma (soaked)": { price: 130, unit: "kg", category: "lentils", nutrition: { cal: 1300, pro: 90, carb: 230, fat: 3 } },
    "Chickpeas (soaked)": { price: 110, unit: "kg", category: "lentils", nutrition: { cal: 1600, pro: 90, carb: 270, fat: 26 } },
    "Toor dal": { price: 140, unit: "kg", category: "lentils", nutrition: { cal: 3430, pro: 220, carb: 620, fat: 15 } },
    "Mixed vegetables": { price: 40, unit: "kg", category: "vegetables", nutrition: { cal: 650, pro: 20, carb: 140, fat: 2 } },
    "Potatoes (boiled)": { price: 25, unit: "kg", category: "vegetables", nutrition: { cal: 870, pro: 19, carb: 200, fat: 1 } },
    "Onions (chopped)": { price: 30, unit: "kg", category: "vegetables", nutrition: { cal: 400, pro: 11, carb: 90, fat: 1 } },
    "Vegetables": { price: 40, unit: "kg", category: "vegetables", nutrition: { cal: 500, pro: 20, carb: 100, fat: 2 } },
    "Tomato puree": { price: 40, unit: "kg", category: "sauces", nutrition: { cal: 380, pro: 16, carb: 80, fat: 2 } },
    "Coconut milk": { price: 100, unit: "liter", category: "sauces", nutrition: { cal: 2300, pro: 23, carb: 55, fat: 240 } },
    "Garam masala": { price: 400, unit: "kg", category: "spices", nutrition: { cal: 0, pro: 0, carb: 0, fat: 0 } },
    "Biryani masala": { price: 450, unit: "kg", category: "spices", nutrition: { cal: 0, pro: 0, carb: 0, fat: 0 } },
    "Chole masala": { price: 400, unit: "kg", category: "spices", nutrition: { cal: 0, pro: 0, carb: 0, fat: 0 } },
    "Pav bhaji masala": { price: 420, unit: "kg", category: "spices", nutrition: { cal: 0, pro: 0, carb: 0, fat: 0 } },
    "Ginger garlic paste": { price: 150, unit: "kg", category: "spices", nutrition: { cal: 800, pro: 30, carb: 180, fat: 5 } },
    "Spices": { price: 400, unit: "kg", category: "spices", nutrition: { cal: 0, pro: 0, carb: 0, fat: 0 } },
    "Tamarind": { price: 120, unit: "kg", category: "spices", nutrition: { cal: 2390, pro: 28, carb: 620, fat: 6 } },
    "Oil": { price: 140, unit: "liter", category: "oils", nutrition: { cal: 8840, pro: 0, carb: 0, fat: 1000 } },
    "Soy sauce": { price: 80, unit: "liter", category: "condiments", nutrition: { cal: 530, pro: 80, carb: 49, fat: 6 } },
    "Fried onions": { price: 150, unit: "kg", category: "prepared", nutrition: { cal: 5900, pro: 30, carb: 400, fat: 450 } },
    "Dosa batter": { price: 40, unit: "kg", category: "prepared", nutrition: { cal: 1500, pro: 40, carb: 300, fat: 15 } },
    "Potato masala": { price: 30, unit: "kg", category: "prepared", nutrition: { cal: 900, pro: 20, carb: 180, fat: 20 } },
    "Idli batter": { price: 35, unit: "kg", category: "prepared", nutrition: { cal: 1400, pro: 40, carb: 280, fat: 10 } },
    "Pasta": { price: 60, unit: "kg", category: "pasta", nutrition: { cal: 3500, pro: 120, carb: 750, fat: 15 } },
    "Maggi packets": { price: 14, unit: "piece", category: "noodles", nutrition: { cal: 310, pro: 7, carb: 45, fat: 11 } },
    "Water": { price: 0, unit: "liter", category: "misc", nutrition: { cal: 0, pro: 0, carb: 0, fat: 0 } }
};

export const UNIT_CONVERSIONS = {
    "cups": 240, "tablespoons": 15, "teaspoons": 5, "handful": 30, "grams": 1, "kg": 1000, "ml": 1, "liter": 1000, "piece": 1, "pieces": 1
};

export const ML_RECIPE_PATTERNS = {
    paneer_butter_masala: { basePerPerson: 220, variance: 15, type: 'curry', richness: 1.1 },
    veg_biryani: { basePerPerson: 280, variance: 20, type: 'rice', richness: 1.15 },
    chicken_biryani: { basePerPerson: 300, variance: 22, type: 'rice', richness: 1.2 },
    rajma: { basePerPerson: 200, variance: 12, type: 'curry', richness: 1.0 },
    dal_makhani: { basePerPerson: 190, variance: 12, type: 'dal', richness: 1.05 },
    veg_pasta: { basePerPerson: 240, variance: 18, type: 'pasta', richness: 1.1 },
    chicken_pasta: { basePerPerson: 260, variance: 20, type: 'pasta', richness: 1.15 },
    aloo_paratha: { basePerPerson: 180, variance: 15, type: 'bread', richness: 0.95 },
    masala_dosa: { basePerPerson: 170, variance: 12, type: 'breakfast', richness: 0.9 },
    egg_curry: { basePerPerson: 210, variance: 15, type: 'curry', richness: 1.0 },
    chicken_curry: { basePerPerson: 240, variance: 18, type: 'curry', richness: 1.1 },
    chole: { basePerPerson: 210, variance: 15, type: 'curry', richness: 1.0 },
    idli_sambar: { basePerPerson: 200, variance: 12, type: 'breakfast', richness: 0.9 },
    fried_rice: { basePerPerson: 250, variance: 18, type: 'rice', richness: 1.1 },
    chicken_fried_rice: { basePerPerson: 270, variance: 20, type: 'rice', richness: 1.15 },
    maggi_masala: { basePerPerson: 150, variance: 10, type: 'snack', richness: 0.8 },
    pav_bhaji: { basePerPerson: 230, variance: 18, type: 'street_food', richness: 1.05 },
    fish_curry: { basePerPerson: 230, variance: 18, type: 'curry', richness: 1.1 }
};
