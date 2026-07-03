const fs = require('fs');
const files = [
  'cortek.html',
  'cortek-sections.html',
  'cortek-sections-2.html',
  'cortek-hizmetler.html',
  'cortek-hero.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace margin-inline: auto with margin-left: auto; margin-right: auto;
  content = content.replace(/margin-inline:\s*auto/g, 'margin-left: auto; margin-right: auto');

  // Fix bottom nav row width
  content = content.replace(
    /\.bottom-nav__row\{display:flex;align-items:flex-end;justify-content:space-between;max-width:520px;margin:0 auto\}/g,
    '.bottom-nav__row{display:flex;align-items:flex-end;justify-content:space-between;max-width:520px;margin:0 auto;width:100%}'
  );

  // Fix services grid width
  content = content.replace(
    /\.services__grid\{grid-template-columns:1fr;max-width:520px;margin-left:\s*auto;\s*margin-right:\s*auto\}/g,
    '.services__grid{grid-template-columns:1fr;max-width:520px;margin-left: auto; margin-right: auto; width:100%}'
  );

  // Fix reviews grid width
  content = content.replace(
    /\.rev-grid\{grid-template-columns:1fr;max-width:520px;margin-left:\s*auto;\s*margin-right:\s*auto\}/g,
    '.rev-grid{grid-template-columns:1fr;max-width:520px;margin-left: auto; margin-right: auto; width:100%}'
  );

  // Fix panel max-width with width: 100%
  content = content.replace(
    /\.panel\{aspect-ratio:16\/11;max-width:520px;margin-left:\s*auto;\s*margin-right:\s*auto\}/g,
    '.panel{aspect-ratio:16/11;max-width:520px;margin-left: auto; margin-right: auto; width:100%}'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
