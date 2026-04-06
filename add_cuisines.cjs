const fs = require('fs');
let content = fs.readFileSync('src/data.js', 'utf8');

const mapping = {
    paneer_butter_masala: 'North Indian',
    veg_biryani: 'North Indian',
    chicken_biryani: 'North Indian',
    rajma: 'North Indian',
    dal_makhani: 'North Indian',
    veg_pasta: 'Italian',
    chicken_pasta: 'Italian',
    aloo_paratha: 'North Indian',
    masala_dosa: 'South Indian',
    egg_curry: 'North Indian',
    chicken_curry: 'North Indian',
    chole: 'North Indian',
    idli_sambar: 'South Indian',
    fried_rice: 'Chinese',
    chicken_fried_rice: 'Chinese',
    maggi_masala: 'Street Food',
    pav_bhaji: 'Street Food',
    fish_curry: 'South Indian'
};

for (const [key, cuisine] of Object.entries(mapping)) {
    const searchString = key + ': {\r\n        name: "';
    const splitArr = content.split(searchString);
    if (splitArr.length === 2) {
        content = splitArr.join(searchString.replace('name: "', 'cuisine: "' + cuisine + '",\r\n        name: "'));
    } else {
        // Fallback to \n only
        const searchString2 = key + ': {\n        name: "';
        const splitArr2 = content.split(searchString2);
        if (splitArr2.length === 2) {
            content = splitArr2.join(searchString2.replace('name: "', 'cuisine: "' + cuisine + '",\n        name: "'));
        }
    }
}

fs.writeFileSync('src/data.js', content, 'utf8');
console.log('Done');
