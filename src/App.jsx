import React, { useState, useEffect } from 'react';
import { ChefHat, TrendingUp, Calculator, Home, ArrowRight, Zap, Target, DollarSign, Users, Clock, ShieldCheck, Leaf, CreditCard, Sparkles, UtensilsCrossed, PieChart, LayoutDashboard, ShoppingCart, MessageSquare, AlertCircle, Moon, Sun } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { predictQuantity, calculateIngredientCost } from './utils';
import { RECIPES } from './data';
import logo from './assets/logo.png';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [people, setPeople] = useState({ adults: 2, teens: 0, kids: 0, seniors: 0 }); // Shared state between predictor and cost engine!

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="D" />
        <span>Dishlytics.</span>
      </div>
      <nav className="nav-group">
        <button onClick={() => setActiveTab('home')} className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}>
          <Home size={20} /> <span>Home Overview</span>
        </button>
        <button onClick={() => setActiveTab('predict')} className={`nav-item ${activeTab === 'predict' ? 'active' : ''}`}>
          <Target size={20} /> <span>Quantity Engine</span>
        </button>
        <button onClick={() => setActiveTab('costs')} className={`nav-item ${activeTab === 'costs' ? 'active' : ''}`}>
          <CreditCard size={20} /> <span>Cost Analytics</span>
        </button>
      </nav>

      <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

      <div className="sidebar-version" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 700, marginBottom: '0.5rem' }}>VERSION</div>
        <div style={{ fontWeight: 800, color: 'white' }}>v3.1.0 PRO</div>
      </div>
    </div>
  );
  const HomeView = () => (
    <div className="animate-in fade-in duration-700">
      <div className="hero-banner">
        <div className="hero-badge">Zero Food Waste Initiative</div>
        <h1 className="hero-title">Dishlytics</h1>
        <p className="hero-subtitle">
          Let's be real—we can't cook. But at least we can use AI to figure out
          the EXACT amount to make so we're not eating the same dal for 3 days straight! 😅
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setActiveTab('predict')} className="action-btn" style={{ background: 'white', color: 'var(--primary)', width: 'auto' }}>
            Start Predicting <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>The Problem We're Solving</h2>
        <div className="ditto-grid">
          <div className="gourmet-card">
            <div className="icon-wrapper" style={{ color: 'var(--funny-coral)' }}><AlertCircle size={32} /></div>
            <h3>Gen-Z Can't Cook</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>We grew up with food delivery apps, not cooking lessons. Now we're adults wondering why our rice is either soup or cement.</p>
          </div>
          <div className="gourmet-card">
            <div className="icon-wrapper" style={{ color: 'var(--funny-amber)' }}><ShoppingCart size={32} /></div>
            <h3>Massive Food Waste</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Cooked for 2, made enough for 10. Half goes to waste because "better safe than sorry" is our cooking motto.</p>
          </div>
          <div className="gourmet-card">
            <div className="icon-wrapper" style={{ color: 'var(--funny-sage)' }}><DollarSign size={32} /></div>
            <h3>Money Down the Drain</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Throwing away food = throwing away money. That leftover dal could've been tomorrow's lunch and some cash saved.</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>How It Works</h2>
        <div className="ditto-grid">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--primary)' }}><UtensilsCrossed size={32} /></div>
            <h3>Pick Your Recipe</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Choose from 18+ Indian recipes—from Biryani to Dal Makhani</p>
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--primary)' }}><Users size={32} /></div>
            <h3>Enter Your Household</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Tell us how many adults, teens, kids are eating</p>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="icon-wrapper" style={{ margin: '0 auto 1.5rem', color: 'var(--primary)' }}><Zap size={32} /></div>
            <h3>Get Smart Predictions</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>AI tells you exactly how much to cook + raw homemade cost</p>
          </div>
        </div>
      </div>

      <div className="gourmet-card" style={{ background: 'var(--border)', borderStyle: 'dashed', textAlign: 'center', padding: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Ready to Stop Wasting Food (and Money)?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Join the zero-waste kitchen revolution. No more guessing, no more leftovers.</p>
        <button onClick={() => setActiveTab('predict')} className="action-btn" style={{ maxWidth: '300px', margin: '0 auto' }}>Try AI Predictor</button>
      </div>
    </div>
  );

  const PredictView = () => {
    const [recipeId, setRecipeId] = useState('paneer_butter_masala');
    const [results, setResults] = useState(null);

    const onPredict = () => {
      const qty = predictQuantity(recipeId, people);
      const recipe = RECIPES[recipeId];
      const totalP = Object.values(people).reduce((a, b) => a + b, 0);
      const scale = totalP / recipe.baseServings;
      const items = recipe.ingredients.map(ing => ({
        ...ing,
        scaledQty: Math.round(ing.quantity * scale * 10) / 10
      }));
      setResults({ qty, items, recipeName: recipe.name });
    };

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Quantity Prediction Engine</h1>
        <div className="control-grid">
          <div className="gourmet-card space-y-8">
            <div className="form-group">
              <label className="form-label">Select Recipe</label>
              <select className="gourmet-select" value={recipeId} onChange={e => setRecipeId(e.target.value)}>
                {Object.entries(RECIPES).map(([id, r]) => <option key={id} value={id}>{r.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Household Composition</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {Object.keys(people).map(type => (
                  <div key={type}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{type}</label>
                    <input type="number" className="gourmet-input" value={people[type]} onChange={e => setPeople({ ...people, [type]: parseInt(e.target.value) || 0 })} />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onPredict} className="action-btn">
              Calculate Portion Strategy <TrendingUp size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {results ? (
              <>
                <div className="gourmet-card text-center">
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-muted)' }}>ESTIMATED TOTAL YIELD</span>
                  <div className="result-stat">{results.qty}g</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 800 }}>
                    <ShieldCheck size={16} /> Verified Accuracy
                  </div>
                </div>
                <div className="gourmet-card">
                  <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} /> Component Breakdown</h4>
                  <div className="ingredient-table">
                    {results.items.map((ing, i) => (
                      <div key={i} className="ingredient-row">
                        <span className="ingredient-name">{ing.name}</span>
                        <span className="ingredient-qty">{ing.scaledQty} {ing.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="gourmet-card h-full flex flex-col items-center justify-center opacity-40" style={{ borderStyle: 'dashed', borderWidth: '2px' }}>
                <ChefHat size={64} />
                <p style={{ marginTop: '1.5rem', fontWeight: 700 }}>Awaiting Input Matrix</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CostView = () => {
    const [recipeId, setRecipeId] = useState('chicken_biryani');
    const [analysis, setAnalysis] = useState(null);

    const onAnalyze = () => {
      const recipe = RECIPES[recipeId];
      const totalP = Object.values(people).reduce((a, b) => a + b, 0);
      const scale = totalP > 0 ? (totalP / recipe.baseServings) : 1;

      const data = recipe.ingredients.map(ing => {
        const scaledQty = ing.quantity * scale;
        const costData = calculateIngredientCost(ing.name, scaledQty, ing.unit);
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
          datasets: [{
            data: Object.values(cats),
            backgroundColor: ['#059669', '#10b981', '#fb7185', '#d97706', '#828e5c'],
            borderWidth: 0
          }]
        }
      });
    }

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Raw Homemade Cost Engine</h1>
        <div className="control-grid">
          <div className="gourmet-card space-y-8">
            <div className="form-group">
              <label className="form-label">Active Recipe</label>
              <select className="gourmet-select" value={recipeId} onChange={e => setRecipeId(e.target.value)}>
                {Object.entries(RECIPES).map(([id, r]) => <option key={id} value={id}>{r.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Household Composition</label>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Edit the matrix to see how raw grocery costs scale.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {Object.keys(people).map(type => (
                  <div key={type}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{type}</label>
                    <input type="number" className="gourmet-input" value={people[type]} onChange={e => setPeople({ ...people, [type]: parseInt(e.target.value) || 0 })} />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onAnalyze} className="action-btn" style={{ background: 'var(--bg-sidebar)' }}>
              Analyze Homemade Expenditure <Calculator size={20} />
            </button>
          </div>

          <div>
            {analysis ? (
              <div className="gourmet-card">
                <div className="text-center mb-4">
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-muted)' }}>PROJECTED RAW GROCERY COST</span>
                  <div className="result-stat">₹{analysis.totalCost || analysis.total.toFixed(2)}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Calculated for {analysis.servingScale} eaters based on local market rates</div>
                </div>
                <div style={{ height: '280px', marginTop: '2rem' }}>
                  <Pie data={analysis.chartData} options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: isDarkMode ? '#f8fafc' : '#111827' } } } }} />
                </div>
              </div>
            ) : (
              <div className="gourmet-card h-full flex items-center justify-center opacity-40" style={{ borderStyle: 'dashed', borderWidth: '2px' }}>
                <PieChart size={64} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-content">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'predict' && <PredictView />}
        {activeTab === 'costs' && <CostView />}
      </main>
    </div>
  );
}
