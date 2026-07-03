const fs = require('fs');
let content = fs.readFileSync('cortek-hizmetler.html', 'utf8');

const replacements = [
  '<img src="1.png" alt="Akıllı Ev" style="width:100%;height:100%;object-fit:cover;border-radius:22px;box-shadow:0 30px 60px -20px rgba(30,41,59,0.3);" />',
  '<img src="2.png" alt="Güvenlik Sistemleri" style="width:100%;height:100%;object-fit:cover;border-radius:22px;box-shadow:0 30px 60px -20px rgba(30,41,59,0.3);" />',
  '<img src="3.png" alt="Otomatik Kapı Sistemleri" style="width:100%;height:100%;object-fit:cover;border-radius:22px;box-shadow:0 30px 60px -20px rgba(30,41,59,0.3);" />'
];

let i = 0;
content = content.replace(/(<div class="srow__media">)[\s\S]*?(<\/div>\s*<div class="srow__content">)/g, (match, p1, p2) => {
    if (i < replacements.length) {
        let rep = `${p1}\n        ${replacements[i]}\n      ${p2}`;
        i++;
        return rep;
    }
    return match;
});

fs.writeFileSync('cortek-hizmetler.html', content, 'utf8');
console.log('Replaced', i, 'images.');
