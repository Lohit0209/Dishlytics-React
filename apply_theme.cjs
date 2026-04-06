const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/:root\s*\{[^}]*?\}/s, `:root {
  --primary: #473c33;
  --primary-light: #f5f0eb;
  --secondary: #8c7b6c;
  --bg-app: #faf8f5;
  --bg-sidebar: #2c241c;
  --bg-card: #ffffff;
  --text-main: #2c241c;
  --text-muted: #8c7b6c;
  --border: #e8e4db;
  --shadow: 0 1px 3px rgba(44, 36, 28, 0.05), 0 1px 2px rgba(44, 36, 28, 0.03);
  --shadow-lg: 0 4px 12px rgba(44, 36, 28, 0.08);
  --funny-sage: #8c7b6c;
  --funny-amber: #bfa891;
  --funny-coral: #6b5e54;
  --hero-gradient: #f5f0eb;
}`);

css = css.replace(/\.dark\s*\{[^}]*?\}/s, `.dark {
  --primary: #d1c1b3;
  --primary-light: #3d332c;
  --secondary: #a39587;
  --bg-app: #1c1714;
  --bg-sidebar: #14100e;
  --bg-card: #2a231f;
  --text-main: #f5f0eb;
  --text-muted: #a39587;
  --border: #3d332c;
  --shadow: none;
  --shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.4);
  --funny-sage: #a39587;
  --funny-amber: #d1c1b3;
  --funny-coral: #8c7b6c;
  --hero-gradient: #2a231f;
}`);

css = css.replace(/\.hero-banner\s*\{[^}]*?\}/s, `.hero-banner {
  background: var(--hero-gradient);
  border-radius: 12px;
  padding: 4rem;
  color: var(--text-main);
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
}`);

css = css.replace(/\.hero-badge\s*\{[^}]*?\}/s, `.hero-badge {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 1.5rem;
}`);

css = css.replace(/border-radius:\s*2rem/g, 'border-radius: 12px');
css = css.replace(/border-radius:\s*1\.5rem/g, 'border-radius: 12px');
css = css.replace(/border-radius:\s*1rem/g, 'border-radius: 8px');
css = css.replace(/border-radius:\s*999px/g, 'border-radius: 8px');

fs.writeFileSync('src/index.css', css, 'utf8');

let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/borderStyle:\s*'dashed'/g, "borderStyle: 'solid'");
app = app.replace(/borderRadius:\s*'1rem'/g, "borderRadius: '8px'");
fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log('Update Complete');
