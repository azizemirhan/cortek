const fs = require('fs');
let content = fs.readFileSync('cortek-hizmetler.html', 'utf8');

const replacements = [
  '<img src="3.png" alt="Akıllı Ev" style="width:100%;height:100%;object-fit:cover;" />\n        <div style="position:absolute;inset:0;background:linear-gradient(to right, #fff 0%, rgba(255,255,255,0.7) 15%, transparent 45%);pointer-events:none;"></div>',
  '<img src="2.png" alt="Güvenlik Sistemleri" style="width:100%;height:100%;object-fit:cover;" />\n        <div style="position:absolute;inset:0;background:linear-gradient(to left, #fff 0%, rgba(255,255,255,0.7) 15%, transparent 45%);pointer-events:none;"></div>',
  '<img src="1.png" alt="Otomatik Kapı Sistemleri" style="width:100%;height:100%;object-fit:cover;" />\n        <div style="position:absolute;inset:0;background:linear-gradient(to right, #fff 0%, rgba(255,255,255,0.7) 15%, transparent 45%);pointer-events:none;"></div>'
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
console.log('Replaced', i, 'images with no frames and added gradients.');
