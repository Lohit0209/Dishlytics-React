const fs = require('fs');

// 1. Fix App.jsx hover color
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/e\.currentTarget\.style\.color = 'var\(--primary\)';/g, "e.currentTarget.style.color = 'white';");
fs.writeFileSync('src/App.jsx', app, 'utf8');

// 2. Fix index.css to make variables more vibrant
let css = fs.readFileSync('src/index.css', 'utf8');

// Change dull colors to vibrant espresso-complementary accents
css = css.replace(/--funny-sage:\s*#[a-fA-F0-9]{6};/g, '--funny-sage: #6b8e23;'); // Vibrant Matcha green
css = css.replace(/--funny-amber:\s*#[a-fA-F0-9]{6};/g, '--funny-amber: #d97706;'); // Vibrant Caramel
css = css.replace(/--funny-coral:\s*#[a-fA-F0-9]{6};/g, '--funny-coral: #d94f30;'); // Vibrant Terracotta

fs.writeFileSync('src/index.css', css, 'utf8');

console.log('Fixed hover and added vibrancy.');
