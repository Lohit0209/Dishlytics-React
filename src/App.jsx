import React, { useState, useEffect } from 'react';
import { ChefHat, TrendingUp, Calculator, Home, ArrowRight, Zap, Target, DollarSign, Users, Clock, ShieldCheck, Leaf, CreditCard, Sparkles, UtensilsCrossed, PieChart, LayoutDashboard, ShoppingCart, MessageSquare, AlertCircle, Moon, Sun, Globe } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { predictQuantity, calculateIngredientCost } from './utils';
import { RECIPES, INGREDIENT_PRICES } from './data';
import logo from './assets/logo.svg';
import { t_dict } from './translations';
import { auth, db, getInsights } from './storage';
import AuthView from './AuthView';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function App() {
  const [user, setUser] = useState(auth.getCurrentUser());
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState('paneer_butter_masala');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [people, setPeople] = useState({ adults: 2, teens: 0, kids: 0, seniors: 0 });
  const [lang, setLang] = useState('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [customPrices, setCustomPrices] = useState({});
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGroceryModalOpen, setIsGroceryModalOpen] = useState(false);
  const [groceryChecked, setGroceryChecked] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [cookingSession, setCookingSession] = useState(null);

  const t = (key, params = {}) => {
    let text = t_dict[key]?.[lang] || t_dict[key]?.['en'] || key;
    if (params.n !== undefined) text = text.replace('{n}', params.n);
    return text;
  };

  const handlePersonChange = (type, delta) => {
    setPeople(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const onLogout = () => {
    auth.logout();
    setUser(null);
  };

  const handleFinishCooking = (shouldLog = false) => {
    if (shouldLog && cookingSession) {
      const res = db.addHistory(user.username, cookingSession);
      if (res.success) setUser({ ...user, history: res.history });
    }
    setIsCookingMode(false);
    setCookingSession(null);
    setCurrentStep(0);
  };

  const saveCurrentAsFamily = () => {
    if (!newFamilyName) return;
    const res = db.saveFamily(user.username, { name: newFamilyName, people });
    if (res.success) {
      setUser({ ...user, families: res.families });
      setIsAddFamilyOpen(false);
      setNewFamilyName('');
    }
  };

  const applyFamily = (family) => {
    setPeople(family.people);
    setActiveTab('predict');
  };

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  if (!user) return <AuthView onLogin={setUser} t={t} />;

  return (
    <div className="dashboard-shell">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        t={t} 
        user={user} 
        applyFamily={applyFamily} 
        onLogout={onLogout}
        isAddFamilyOpen={isAddFamilyOpen}
        setIsAddFamilyOpen={setIsAddFamilyOpen}
        newFamilyName={newFamilyName}
        setNewFamilyName={setNewFamilyName}
        saveCurrentAsFamily={saveCurrentAsFamily}
      />
      <GroceryModal 
        isGroceryModalOpen={isGroceryModalOpen} 
        setIsGroceryModalOpen={setIsGroceryModalOpen} 
        recipeId={selectedRecipeId} 
        people={people} 
        groceryChecked={groceryChecked} 
        setGroceryChecked={setGroceryChecked} 
        t={t} 
      />
      <CookingOverlay 
        isCookingMode={isCookingMode} 
        setIsCookingMode={setIsCookingMode} 
        recipeId={selectedRecipeId} 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep} 
        t={t} 
        handleFinishCooking={handleFinishCooking}
      />
      
      <div className="top-actions">
        <div style={{ position: 'relative' }}>
          <button className="icon-action-btn font-bold" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}>
            {lang.toUpperCase()}
          </button>
          
          {isLangMenuOpen && (
            <div className="lang-dropdown">
              {['en', 'hi', 'te', 'ta'].map((l, i, arr) => (
                <button 
                  key={l}
                  className="lang-option"
                  style={{ borderBottom: i === arr.length - 1 ? 'none' : '' }}
                  onClick={() => { setLang(l); setIsLangMenuOpen(false); }}
                >
                  {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : l === 'te' ? 'తెలుగు' : 'தமிழ்'}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button className="icon-action-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <main className="main-content">
        {activeTab === 'home' && (
          <HomeView 
            t={t} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            setSelectedRecipeId={setSelectedRecipeId} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'predict' && (
          <PredictView 
            t={t} 
            user={user}
            people={people} 
            handlePersonChange={handlePersonChange} 
            selectedRecipeId={selectedRecipeId} 
            setSelectedRecipeId={setSelectedRecipeId} 
            setIsGroceryModalOpen={setIsGroceryModalOpen} 
            setIsCookingMode={setIsCookingMode} 
            setCurrentStep={setCurrentStep} 
            setPeople={setPeople}
            setCookingSession={setCookingSession}
          />
        )}
        {activeTab === 'costs' && (
          <CostView 
            t={t} 
            selectedRecipeId={selectedRecipeId} 
            setSelectedRecipeId={setSelectedRecipeId} 
            people={people} 
            handlePersonChange={handlePersonChange} 
            customPrices={customPrices} 
            setCustomPrices={setCustomPrices} 
            setIsGroceryModalOpen={setIsGroceryModalOpen} 
            isDarkMode={isDarkMode} 
          />
        )}
        {activeTab === 'history' && (
          <HistoryView 
            t={t} 
            user={user} 
            setSelectedRecipeId={setSelectedRecipeId} 
            setPeople={setPeople} 
            setActiveTab={setActiveTab} 
          />
        )}
      </main>
    </div>
  );
}

// --- Sub-Components (Stabilized in Global Scope) ---

const Sidebar = ({ activeTab, setActiveTab, t, user, applyFamily, onLogout, isAddFamilyOpen, setIsAddFamilyOpen, newFamilyName, setNewFamilyName, saveCurrentAsFamily }) => (
  <div className="sidebar">
    <div className="sidebar-logo">
      <img src={logo} alt="D" />
      <span>Dishlytics.</span>
    </div>

    <nav className="nav-group">
      <button onClick={() => setActiveTab('home')} className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}>
        <Home size={20} /> <span>{t('nav_home')}</span>
      </button>
      <button onClick={() => setActiveTab('predict')} className={`nav-item ${activeTab === 'predict' ? 'active' : ''}`}>
        <Target size={20} /> <span>{t('nav_predict')}</span>
      </button>
      <button onClick={() => setActiveTab('costs')} className={`nav-item ${activeTab === 'costs' ? 'active' : ''}`}>
        <CreditCard size={20} /> <span>{t('nav_cost')}</span>
      </button>
      <button onClick={() => setActiveTab('history')} className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}>
        <PieChart size={20} /> <span>{t('nav_history')}</span>
      </button>
    </nav>

    <div className="sidebar-section-label" style={{ marginTop: '2rem', padding: '0 1.5rem' }}>{t('family_groups')}</div>
    <div className="family-list-sidebar" style={{ padding: '0.5rem 1rem' }}>
      {user.families?.map(f => (
        <button key={f.id} onClick={() => applyFamily(f)} className="family-nav-item">
          <Users size={16} />
          <span>{f.name}</span>
        </button>
      ))}
      <button className="family-nav-item add-btn" onClick={() => setIsAddFamilyOpen(!isAddFamilyOpen)}>
        <Zap size={16} />
        <span>{t('add_family')}</span>
      </button>
      
      {isAddFamilyOpen && (
        <div style={{ padding: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <input 
            className="search-input" 
            style={{ fontSize: '0.75rem', padding: '0.5rem' }} 
            placeholder={t('group_name')} 
            value={newFamilyName}
            onChange={e => setNewFamilyName(e.target.value)}
          />
          <button className="action-btn" style={{ fontSize: '0.65rem', padding: '0.4rem', marginTop: '0.5rem', width: '100%' }} onClick={saveCurrentAsFamily}>
            {t('save_group')}
          </button>
        </div>
      )}
    </div>

    <div className="sidebar-footer" style={{ marginTop: 'auto', padding: '1rem' }}>
      <div className="user-profile-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '1rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white' }}>
          {user.username[0].toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.username}</div>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'var(--funny-coral)', fontSize: '0.65rem', fontWeight: 700, padding: 0 }}>{t('logout')}</button>
        </div>
      </div>

      <div className="sidebar-version" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
        <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 700, marginBottom: '0.5rem' }}>{t('version')}</div>
        <div style={{ fontWeight: 800, color: 'white' }}>v3.2.0 PRO</div>
      </div>
    </div>
  </div>
);

const HomeView = ({ t, searchQuery, setSearchQuery, setSelectedRecipeId, setActiveTab }) => {
  const filteredRecipes = Object.entries(RECIPES).filter(([id, r]) => {
    const q = (searchQuery || "").toLowerCase();
    const name = (r.name || "").toLowerCase();
    const cuisine = (r.cuisine || "").toLowerCase();
    const ingredients = (r.ingredients || []).some(ing => (ing.name || "").toLowerCase().includes(q));
    return name.includes(q) || cuisine.includes(q) || ingredients;
  });

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
        <div className="badge">{t('hero_badge')}</div>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, marginTop: '1.5rem', lineHeight: 1 }}>
          Smart Kitchen <span style={{ color: 'var(--primary)' }}>Analytics</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginTop: '2rem', lineHeight: 1.6 }}>
          {t('hero_subtitle')}
        </p>
        <div className="search-container" style={{ marginTop: '3rem' }}>
          <div className="search-wrapper">
            <Sparkles size={20} style={{ color: 'var(--funny-amber)' }} />
            <input 
              type="text" 
              className="search-input" 
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>
          {searchQuery ? t('featured_recipes') : t('cuisines_title')}
        </h2>
        <div className="cuisine-grid">
          {filteredRecipes.map(([id, recipe]) => (
            <div key={id} className="cuisine-card" onClick={() => { setSelectedRecipeId(id); setActiveTab('predict'); window.scrollTo(0,0); }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div className="cuisine-tag">{t(recipe.cuisine)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  <Clock size={14} /> {recipe.time}m
                </div>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>{t(recipe.name)}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {recipe.ingredients.slice(0, 3).map((ing, i) => (
                  <span key={i} className="ing-chip">{t(ing.name)}</span>
                ))}
                {recipe.ingredients.length > 3 && <span className="ing-chip">+{recipe.ingredients.length - 3}</span>}
              </div>
              <button className="cuisine-btn" onClick={(e) => { e.stopPropagation(); setSelectedRecipeId(id); setActiveTab('predict'); window.scrollTo(0,0); }}>
                <span>{t(recipe.name)}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>{t('problem_title')}</h2>
        <div className="ditto-grid">
          <div className="gourmet-card">
            <div className="icon-wrapper" style={{ color: 'var(--funny-coral)' }}><AlertCircle size={32} /></div>
            <h3>{t('prob1_title')}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>{t('prob1_desc')}</p>
          </div>
          <div className="gourmet-card">
            <div className="icon-wrapper" style={{ color: 'var(--funny-amber)' }}><ShoppingCart size={32} /></div>
            <h3>{t('prob2_title')}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>{t('prob2_desc')}</p>
          </div>
          <div className="gourmet-card">
            <div className="icon-wrapper" style={{ color: 'var(--funny-sage)' }}><DollarSign size={32} /></div>
            <h3>{t('prob3_title')}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>{t('prob3_desc')}</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>{t('how_works')}</h2>
        <div className="ditto-grid">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--primary)' }}><UtensilsCrossed size={32} /></div>
            <h3>{t('step1_title')}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{t('step1_desc')}</p>
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--primary)' }}><Users size={32} /></div>
            <h3>{t('step2_title')}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{t('step2_desc')}</p>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--primary)' }}><Zap size={32} /></div>
            <h3>{t('step3_title')}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{t('step3_desc')}</p>
          </div>
        </div>
      </div>

      <div className="gourmet-card" style={{ background: 'var(--border)', borderStyle: 'solid', textAlign: 'center', padding: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{t('ready_title')}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>{t('ready_desc')}</p>
        <button onClick={() => setActiveTab('predict')} className="action-btn" style={{ maxWidth: '300px', margin: '0 auto' }}>{t('btn_try')}</button>
      </div>
    </div>
  );
};

const PredictView = ({ t, user, people, handlePersonChange, selectedRecipeId, setSelectedRecipeId, setIsGroceryModalOpen, setIsCookingMode, setCurrentStep, setPeople, setCookingSession }) => {
  const [results, setResults] = useState(null);
  const [mealType, setMealType] = useState('lunch');
  const [isWeekend, setIsWeekend] = useState(false);

  const onStartCooking = () => {
    const { total } = predictQuantity(selectedRecipeId, people, mealType, isWeekend);
    setCookingSession({ 
      recipeId: selectedRecipeId, 
      people, 
      mealType, 
      isWeekend, 
      qty: total 
    });
    setIsCookingMode(true);
    setCurrentStep(0);
  };

  const onPredict = () => {
    const { total, breakdown } = predictQuantity(selectedRecipeId, people, mealType, isWeekend);
    const recipe = RECIPES[selectedRecipeId];
    const totalP = Object.values(people).reduce((a, b) => a + b, 0);
    const scale = totalP / (recipe?.baseServings || 4);
    const items = (recipe?.ingredients || []).map(ing => ({ ...ing, scaledQty: Math.round(ing.quantity * scale * 10) / 10 }));
    
    const macros = { cal: 0, pro: 0, carb: 0, fat: 0 };
    items.forEach(item => {
      const pData = INGREDIENT_PRICES[item.name];
      if (pData && pData.nutrition) {
        let sc = item.scaledQty;
        if (item.unit === 'grams' || item.unit === 'ml') sc /= 1000;
        else if (item.unit === 'cups') sc *= (240 / 1000);
        else if (item.unit === 'tablespoons') sc *= (15 / 1000);
        else if (item.unit === 'teaspoons') sc *= (5 / 1000);
        macros.cal += pData.nutrition.cal * sc;
        macros.pro += pData.nutrition.pro * sc;
        macros.carb += pData.nutrition.carb * sc;
        macros.fat += pData.nutrition.fat * sc;
      }
    });
    const sC = totalP || 1;
    setResults({ 
      qty: total, 
      items, 
      breakdown,
      perServing: { 
        cal: Math.round(macros.cal / sC), 
        pro: Math.round(macros.pro / sC), 
        carb: Math.round(macros.carb / sC), 
        fat: Math.round(macros.fat / sC) 
      } 
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t('predict_title')}</h1>
      <div className="control-grid">
        <div className="gourmet-card space-y-8">
          <div className="form-group">
            <label className="form-label">{t('select_recipe')}</label>
            <select className="gourmet-select" value={selectedRecipeId} onChange={e => setSelectedRecipeId(e.target.value)}>
              {Object.entries(RECIPES).map(([id, r]) => <option key={id} value={id}>{t(r.name)}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">{t('meal_type')}</label>
              <select className="gourmet-select" value={mealType} onChange={e => setMealType(e.target.value)}>
                <option value="breakfast">{t('breakfast')}</option>
                <option value="lunch">{t('lunch')}</option>
                <option value="dinner">{t('dinner')}</option>
                <option value="snack">{t('snack')}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('is_weekend')}</label>
              <button 
                onClick={() => setIsWeekend(!isWeekend)} 
                className={`action-btn ${isWeekend ? 'funny-amber' : ''}`}
                style={{ height: '48px', padding: '0 1rem', background: isWeekend ? '' : 'var(--bg-app)', border: '1px solid var(--border)' }}
              >
                {isWeekend ? <TrendingUp size={18} /> : <Clock size={18} />}
                <span style={{ marginLeft: '0.5rem', fontWeight: 700 }}>{isWeekend ? 'YES' : 'NO'}</span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t('household_comp')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {Object.keys(people).map(type => (
                <div key={type}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>{t(type)}</label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-app)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <button onClick={() => handlePersonChange(type, -1)} className="stepper-btn">-</button>
                    <span style={{ fontWeight: 800 }}>{people[type]}</span>
                    <button onClick={() => handlePersonChange(type, 1)} className="stepper-btn p-plus">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={onPredict} className="action-btn" style={{ flex: 1 }}>{t('calc_portion')} <Zap size={20} /></button>
            {user.history?.length > 0 && (
              <button 
                title={t('predict_history')}
                onClick={() => {
                  const last = user.history[0];
                  setPeople(last.people);
                  setMealType(last.mealType);
                }} 
                className="icon-action-btn" 
                style={{ flexShrink: 0, color: 'var(--funny-sage)' }}
              >
                <TrendingUp size={20} />
              </button>
            )}
            {results && (
              <>
                <button onClick={() => setIsGroceryModalOpen(true)} className="icon-action-btn" style={{ flexShrink: 0 }}><ShoppingCart size={20} /></button>
                <button onClick={onStartCooking} className="action-btn funny-sage" style={{ flex: 1 }}>{t('start_cooking')}</button>
              </>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {results ? (
            <>
              <div className="gourmet-card text-center" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', fontSize: '0.65rem', fontWeight: 900, borderBottomLeftRadius: '12px' }}>AI PREDICTION</div>
                <span className="text-muted-bold">{t('est_yield')}</span>
                <div className="result-stat">{results.qty}g</div>
                <div className="verify-badge"><ShieldCheck size={16} /> {t('verified_acc')}</div>
              </div>

              <div className="gourmet-card">
                <h4 className="flex-center funny-amber" style={{ marginBottom: '1.5rem' }}><Sparkles size={18} /> {t('model_insights')}</h4>
                <div className="space-y-4">
                  {results.breakdown.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t(item.label)}</div>
                        <div style={{ fontSize: '0.65rem', color: item.value >= 0 ? 'var(--funny-sage)' : 'var(--funny-coral)', fontWeight: 600 }}>
                          {item.value >= 0 ? t('impact_pos') : t('impact_neg')}
                        </div>
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: item.value >= 0 ? 'inherit' : 'var(--funny-coral)' }}>
                        {item.value >= 0 ? '+' : ''}{item.value}g
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gourmet-card">
                <h4 className="flex-center funny-sage"><PieChart size={18} /> {t('nutrition_br')}</h4>
                <div className="macro-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center', marginTop: '1rem' }}>
                  <div className="macro-box"><div className="macro-val">{results.perServing.cal}</div><div className="macro-label">{t('calories')}</div></div>
                  <div className="macro-box"><div className="macro-val">{results.perServing.pro}g</div><div className="macro-label">{t('protein')}</div></div>
                  <div className="macro-box"><div className="macro-val">{results.perServing.carb}g</div><div className="macro-label">{t('carbs')}</div></div>
                  <div className="macro-box"><div className="macro-val">{results.perServing.fat}g</div><div className="macro-label">{t('fat')}</div></div>
                </div>
              </div>
            </>
          ) : (
            <div className="gourmet-card h-full flex flex-col items-center justify-center opacity-40" style={{ borderStyle: 'solid', borderWidth: '2px', minHeight: '400px' }}>
              <ChefHat size={64} style={{ color: 'var(--primary)' }} />
              <p style={{ marginTop: '1.5rem', fontWeight: 700, fontSize: '1.25rem' }}>{t('awaiting_input')}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Configure your matrix to see AI predictions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CostView = ({ t, selectedRecipeId, setSelectedRecipeId, people, handlePersonChange, customPrices, setCustomPrices, setIsGroceryModalOpen, isDarkMode }) => {
  const [analysis, setAnalysis] = useState(null);

  const onAnalyze = () => {
    const recipe = RECIPES[selectedRecipeId];
    const totalP = Object.values(people).reduce((a, b) => a + b, 0);
    const scale = totalP > 0 ? (totalP / recipe.baseServings) : 1;
    const data = recipe.ingredients.map(ing => {
      const scaledQty = ing.quantity * scale;
      const customP = customPrices[ing.name] !== undefined ? customPrices[ing.name] : null;
      const costData = calculateIngredientCost(ing.name, scaledQty, ing.unit, customP);
      return { name: ing.name, cost: costData.cost, category: costData.category || 'misc' };
    });
    const total = data.reduce((s, i) => s + i.cost, 0);
    const cats = {};
    data.forEach(d => cats[d.category] = (cats[d.category] || 0) + d.cost);
    setAnalysis({
      total,
      servingScale: totalP > 0 ? totalP : recipe.baseServings,
      chartData: {
        labels: Object.keys(cats).map(c => c.toUpperCase()),
        datasets: [{ data: Object.values(cats), backgroundColor: ['#45c9b8', '#f0d78c', '#f08a6e', '#473c33', '#b5a898'], borderWidth: 0 }]
      }
    });
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h1 className="view-title">{t('cost_title')}</h1>
      <div className="control-grid">
        <div className="gourmet-card space-y-8">
          <div className="form-group">
            <label className="form-label">{t('active_recipe')}</label>
            <select className="gourmet-select" value={selectedRecipeId} onChange={e => setSelectedRecipeId(e.target.value)}>
              {Object.entries(RECIPES).map(([id, r]) => <option key={id} value={id}>{t(r.name)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{t('household_comp')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {Object.keys(people).map(type => (
                <div key={type}>
                  <label className="text-muted-bold" style={{ display: 'block', marginBottom: '0.5rem' }}>{t(type)}</label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-app)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <button onClick={() => handlePersonChange(type, -1)} className="stepper-btn">-</button>
                    <span className="font-bold">{people[type]}</span>
                    <button onClick={() => handlePersonChange(type, 1)} className="stepper-btn p-plus">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t('market_prices')}</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {RECIPES[selectedRecipeId].ingredients.map(ing => (
                <div key={ing.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', background: 'var(--bg-app)', borderRadius: '10px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{t(ing.name) || ing.name}</span>
                  <div className="price-input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.25rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>₹</span>
                    <input type="number" className="price-input-field" style={{ width: '60px', background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 800, fontSize: '0.875rem', outline: 'none' }} value={customPrices[ing.name] || INGREDIENT_PRICES[ing.name]?.price || 0} onChange={e => setCustomPrices({ ...customPrices, [ing.name]: parseFloat(e.target.value) || 0 })} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={onAnalyze} className="action-btn" style={{ background: 'var(--bg-sidebar)', flex: 1 }}>{t('analyze_exp')} <Calculator size={20} /></button>
            {analysis && <button onClick={() => setIsGroceryModalOpen(true)} className="icon-action-btn" style={{ flexShrink: 0 }}><ShoppingCart size={20} /></button>}
          </div>
        </div>
        <div className="analysis-results" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {analysis && (
            <>
              <div className="gourmet-card">
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                  <span className="text-muted-bold">{t('proj_cost')}</span>
                  <div className="result-stat" style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)' }}>₹{analysis.total.toFixed(2)}</div>
                  <div className="text-muted-bold">{t('calc_for', { n: analysis.servingScale })}</div>
                </div>
                <div style={{ height: '250px' }}><Pie data={analysis.chartData} options={{ maintainAspectRatio: false }} /></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const GroceryModal = ({ isGroceryModalOpen, setIsGroceryModalOpen, recipeId, people, groceryChecked, setGroceryChecked, t }) => {
  if (!isGroceryModalOpen) return null;
  const recipe = RECIPES[recipeId];
  const totalP = Object.values(people).reduce((a, b) => a + b, 0);
  const scale = totalP > 0 ? (totalP / recipe.baseServings) : 1;
  const ingredients = (recipe?.ingredients || []).map(ing => ({ ...ing, sQty: Math.round(ing.quantity * scale * 10) / 10 }));
  const copy = () => {
    const text = `*Dishlytics Shopping List - ${t(recipe.name)}*\n\n` + ingredients.map(ing => `- [ ] ${t(ing.name)}: ${ing.sQty}${ing.unit}`).join('\n');
    navigator.clipboard.writeText(text); alert(t('grocery_copied'));
  };
  return (
    <div className="modal-overlay" onClick={() => setIsGroceryModalOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '1.5rem', width: '100%', maxWidth: '500px', border: '1px solid var(--border)' }}>
        <h2 className="flex-center" style={{ marginBottom: '2rem' }}><ShoppingCart className="sage" /> {t('grocery_list')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {ingredients.map(ing => (
            <label key={ing.name} className="checklist-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-app)', borderRadius: '12px', cursor: 'pointer' }}>
              <input type="checkbox" checked={groceryChecked[ing.name] || false} onChange={() => setGroceryChecked({ ...groceryChecked, [ing.name]: !groceryChecked[ing.name] })} />
              <span className="font-bold">{t(ing.name)}</span>
              <span style={{ marginLeft: 'auto', fontWeight: 800, color: 'var(--primary)' }}>{ing.sQty} {ing.unit}</span>
            </label>
          ))}
        </div>
        <button onClick={copy} className="action-btn" style={{ background: '#25d366', color: 'white' }}><MessageSquare size={20} /> {t('copy_whatsapp')}</button>
      </div>
    </div>
  );
};

const CookingOverlay = ({ isCookingMode, setIsCookingMode, recipeId, currentStep, setCurrentStep, t, handleFinishCooking }) => {
  if (!isCookingMode) return null;
  const recipe = RECIPES[recipeId];
  const steps = recipe?.steps || [];
  const prog = ((currentStep + 1) / steps.length) * 100;
  return (
    <div className="cooking-overlay" style={{ position: 'fixed', inset: 0, background: 'var(--bg-app)', zIndex: 2000, padding: '4rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>{t(recipe.name)}</div>
        <button onClick={() => handleFinishCooking(false)} className="stepper-btn" style={{ width: 'auto', padding: '0 1.5rem' }}>{t('exit')}</button>
      </div>
      <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', marginBottom: '4rem' }}><div style={{ height: '100%', background: 'var(--primary)', borderRadius: '4px', width: `${prog}%`, transition: 'width 0.3s ease' }}></div></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--funny-sage)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{t('step_x', { n: currentStep + 1 })}</div>
        <div style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.3, maxWidth: '900px' }}>{steps[currentStep]}</div>
      </div>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '4rem', justifyContent: 'center' }}>
        <button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)} className="action-btn" style={{ width: 'auto', background: 'var(--bg-card)', opacity: currentStep === 0 ? 0.3 : 1 }}><ArrowRight className="rotate-180" /> {t('prev')}</button>
        {currentStep < steps.length - 1 ? (
          <button onClick={() => setCurrentStep(currentStep + 1)} className="action-btn" style={{ width: 'auto' }}>
            {t('next')} <ArrowRight />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => handleFinishCooking(true)} className="action-btn funny-sage" style={{ width: 'auto' }}>
              {t('btn_mark_cooked')} <ShieldCheck />
            </button>
            <button onClick={() => handleFinishCooking(false)} className="action-btn" style={{ width: 'auto', background: 'var(--bg-card)' }}>
              {t('finish')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const HistoryView = ({ t, user, setSelectedRecipeId, setPeople, setActiveTab }) => {
  const insights = getInsights(user.history);

  const onRecook = (item) => {
    setSelectedRecipeId(item.recipeId);
    setPeople(item.people);
    setActiveTab('predict');
    window.scrollTo(0, 0);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h1 className="view-title">{t('history_title')}</h1>

      {insights ? (
        <>
          <div className="ditto-grid" style={{ marginBottom: '3rem' }}>
            <div className="gourmet-card text-center">
              <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--funny-sage)' }}><LayoutDashboard size={28} /></div>
              <div className="text-muted-bold">{t('insight_total_meals')}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem' }}>{insights.totalMeals}</div>
            </div>
            <div className="gourmet-card text-center">
              <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--funny-amber)' }}><ChefHat size={28} /></div>
              <div className="text-muted-bold">{t('insight_top_recipe')}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--primary)' }}>{t(RECIPES[insights.topRecipeId]?.name)}</div>
            </div>
            <div className="gourmet-card text-center">
              <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--funny-coral)' }}><Users size={28} /></div>
              <div className="text-muted-bold">{t('insight_avg_servings')}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem' }}>{insights.avgServings}</div>
            </div>
          </div>

          <div className="space-y-4">
            {user.history.map((item, i) => (
              <div key={i} className="gourmet-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--bg-app)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <UtensilsCrossed size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.25rem' }}>{t(RECIPES[item.recipeId]?.name)}</h4>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {new Date(item.timestamp).toLocaleDateString()}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14} /> {Object.values(item.people).reduce((a, b) => a + b, 0)} {t('nav_home').split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => onRecook(item)} className="cuisine-btn" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
                  {t('recook')} <Sparkles size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="gourmet-card h-full flex flex-col items-center justify-center opacity-40" style={{ borderStyle: 'dotted', borderWidth: '2px', minHeight: '400px' }}>
          <Clock size={64} style={{ color: 'var(--primary)' }} />
          <p style={{ marginTop: '1.5rem', fontWeight: 700, fontSize: '1.25rem', textAlign: 'center', maxWidth: '400px' }}>{t('no_history_yet')}</p>
        </div>
      )}
    </div>
  );
};
