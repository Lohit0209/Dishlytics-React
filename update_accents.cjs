const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// Replace funny-sage with deep Teal/Ocean Green (looks great with brown)
css = css.replace(/--funny-sage:\s*#[a-fA-F0-9]{6};/g, '--funny-sage: #2a9d8f;'); 
// Replace funny-amber with soft Gold/Mustard (matches espresso)
css = css.replace(/--funny-amber:\s*#[a-fA-F0-9]{6};/g, '--funny-amber: #e9c46a;'); 
// Replace funny-coral with vibrant warm Burnt Coral (adds energy but fits the earthy theme)
css = css.replace(/--funny-coral:\s*#[a-fA-F0-9]{6};/g, '--funny-coral: #e76f51;'); 

fs.writeFileSync('src/index.css', css, 'utf8');

console.log('Colors refined to a teal/gold/coral palette');
