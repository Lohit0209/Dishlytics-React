const STORAGE_KEY = 'dishlytics_data';

const getRawData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { users: {}, currentUser: null };
};

const saveRawData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const auth = {
  signup: (username, password) => {
    const data = getRawData();
    if (data.users[username]) return { success: false, message: 'User already exists' };
    data.users[username] = { 
      password, 
      families: [
        { name: 'Default Home', people: { adults: 2, teens: 0, kids: 0, seniors: 0 }, id: 'def_1' }
      ], 
      history: [] 
    };
    saveRawData(data);
    return { success: true };
  },

  login: (username, password) => {
    const data = getRawData();
    const user = data.users[username];
    if (user && user.password === password) {
      data.currentUser = username;
      saveRawData(data);
      return { success: true, user: { username, ...user } };
    }
    return { success: false, message: 'Invalid username or password' };
  },

  logout: () => {
    const data = getRawData();
    data.currentUser = null;
    saveRawData(data);
  },

  getCurrentUser: () => {
    const data = getRawData();
    if (!data.currentUser) return null;
    return { username: data.currentUser, ...data.users[data.currentUser] };
  }
};

export const db = {
  saveFamily: (username, family) => {
    const data = getRawData();
    const user = data.users[username];
    if (!user) return;
    
    const idx = user.families.findIndex(f => f.id === family.id);
    if (idx >= 0) user.families[idx] = family;
    else user.families.push({ ...family, id: Date.now().toString() });
    
    saveRawData(data);
    return { success: true, families: user.families };
  },

  deleteFamily: (username, familyId) => {
    const data = getRawData();
    const user = data.users[username];
    if (!user) return;
    user.families = user.families.filter(f => f.id !== familyId);
    saveRawData(data);
    return { success: true, families: user.families };
  },

  addHistory: (username, entry) => {
    const data = getRawData();
    const user = data.users[username];
    if (!user) return;
    user.history.unshift({ ...entry, timestamp: new Date().toISOString() });
    if (user.history.length > 50) user.history.pop(); // Keep last 50
    saveRawData(data);
    return { success: true, history: user.history };
  }
};

export const getInsights = (history = []) => {
  if (!history.length) return null;
  
  const totalMeals = history.length;
  
  // Top Recipe
  const recipeCounts = {};
  let totalS = 0;
  history.forEach(item => {
    recipeCounts[item.recipeId] = (recipeCounts[item.recipeId] || 0) + 1;
    const servings = Object.values(item.people).reduce((a, b) => a + b, 0);
    totalS += servings;
  });
  
  const topRecipeId = Object.keys(recipeCounts).reduce((a, b) => recipeCounts[a] > recipeCounts[b] ? a : b);
  const avgServings = Math.round((totalS / totalMeals) * 10) / 10;
  
  return {
    totalMeals,
    topRecipeId,
    avgServings
  };
};
