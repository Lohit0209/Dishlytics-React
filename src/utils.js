import { ML_RECIPE_PATTERNS, INGREDIENT_PRICES, UNIT_CONVERSIONS } from './data';

const ML_WEIGHTS = {
    "coefficients": {
        "adults": 237.9053969285211,
        "teens": 240.38844353005672,
        "seniors": 239.57378991425156,
        "is_weekend": 320.53456209198964,
        "meal_type_breakfast": -249.03864851228337,
        "meal_type_dinner": 309.35265450828314,
        "meal_type_lunch": -60.31400599600005
    },
    "intercept": -95.02539281332815
};

export const predictQuantity = (recipeId, people, mealType = 'lunch', isWeekend = false) => {
    const { adults, teens, kids, seniors } = people;
    const coef = ML_WEIGHTS.coefficients;
    let prediction = ML_WEIGHTS.intercept;
    prediction += (adults * coef.adults);
    prediction += (teens * coef.teens);
    prediction += (seniors * coef.seniors);
    prediction += (kids * coef.adults * 0.75);

    if (isWeekend) prediction += coef.is_weekend;

    const mealKey = `meal_type_${mealType}`;
    if (coef[mealKey]) {
        prediction += coef[mealKey];
    } else if (mealType === 'snack') {
        prediction += coef.meal_type_breakfast * 0.5; 
    }

    const pattern = ML_RECIPE_PATTERNS[recipeId] || { richness: 1.0 };
    prediction *= pattern.richness;

    return Math.max(Math.round(prediction), 150);
};

export const calculateIngredientCost = (name, quantity, unit) => {
    const priceData = INGREDIENT_PRICES[name];
    if (!priceData) return { cost: 0, category: 'misc' };

    let qtyInBase = quantity;
    if (UNIT_CONVERSIONS[unit]) qtyInBase *= UNIT_CONVERSIONS[unit];

    let pricePerBase = priceData.price;
    const pUnit = priceData.unit;

    if (pUnit.includes('kg') || pUnit === 'liter') pricePerBase /= 1000;
    else if (pUnit.includes('g') || pUnit.includes('ml')) {
        const amt = parseInt(pUnit);
        pricePerBase /= amt;
    }

    return {
        cost: Math.round(qtyInBase * pricePerBase * 100) / 100,
        category: priceData.category
    };
};
