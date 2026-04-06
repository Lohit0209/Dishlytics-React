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

/**
 * Predicts quantity based on ML weights from synthetic dataset.
 * Returns both the final prediction and a breakdown of components for UI visualization.
 */
export const predictQuantity = (recipeId, people, mealType = 'lunch', isWeekend = false) => {
    const { adults, teens, kids, seniors } = people;
    const coef = ML_WEIGHTS.coefficients;
    const breakdown = [];

    // 1. Base Intercept
    let prediction = ML_WEIGHTS.intercept;
    breakdown.push({ label: 'base_value', value: Math.round(ML_WEIGHTS.intercept) });

    // 2. Household Composition
    const hAdults = adults * coef.adults;
    const hTeens = teens * coef.teens;
    const hSeniors = seniors * coef.seniors;
    const hKids = kids * (coef.adults * 0.75);
    const householdTotal = hAdults + hTeens + hSeniors + hKids;
    
    prediction += householdTotal;
    breakdown.push({ label: 'household_comp', value: Math.round(householdTotal) });

    // 3. Weekend Surge
    if (isWeekend) {
        prediction += coef.is_weekend;
        breakdown.push({ label: 'weekend_impact', value: Math.round(coef.is_weekend) });
    }

    // 4. Meal Type Adjuster
    const mealKey = `meal_type_${mealType}`;
    let mealImpact = 0;
    if (coef[mealKey]) {
        mealImpact = coef[mealKey];
    } else if (mealType === 'snack') {
        mealImpact = coef.meal_type_breakfast * 0.5; 
    }
    
    if (mealImpact !== 0) {
        prediction += mealImpact;
        breakdown.push({ label: 'meal_impact', value: Math.round(mealImpact) });
    }

    // 5. Recipe Richness Pattern
    const pattern = ML_RECIPE_PATTERNS[recipeId] || { richness: 1.0 };
    const preRichness = prediction;
    prediction *= pattern.richness;
    
    if (pattern.richness !== 1.0) {
        breakdown.push({ label: 'recipe_richness', value: Math.round(prediction - preRichness) });
    }

    return {
        total: Math.max(Math.round(prediction), 150),
        breakdown
    };
};

export const calculateIngredientCost = (name, quantity, unit, customPrice = null) => {
    const priceData = INGREDIENT_PRICES[name];
    if (!priceData && !customPrice) return { cost: 0, category: 'misc' };

    let qtyInBase = quantity;
    if (UNIT_CONVERSIONS[unit]) qtyInBase *= UNIT_CONVERSIONS[unit];

    let pricePerBase = customPrice !== null ? customPrice : priceData.price;
    const pUnit = customPrice !== null ? 'kg' : priceData.unit; // Default custom price is per KG/Liter

    if (pUnit.includes('kg') || pUnit === 'liter') pricePerBase /= 1000;
    else if (pUnit.includes('g') || pUnit.includes('ml')) {
        const amt = parseInt(pUnit);
        pricePerBase /= amt;
    }

    return {
        cost: Math.round(qtyInBase * pricePerBase * 100) / 100,
        category: priceData ? priceData.category : 'misc'
    };
};
