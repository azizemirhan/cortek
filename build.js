const fs = require('fs');
const path = require('path');

function buildPage(outputFile, filesToMerge) {
  const baseHtml = fs.readFileSync('cortek.html', 'utf8');
  let mergedCss = '';
  let mergedHtml = '';
  let mergedJs = '';

  filesToMerge.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Extract CSS
    const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    if (styleMatch) {
      let css = styleMatch[1];
      css = css.replace(/:root\s*{[^}]*}/g, '');
      css = css.replace(/\*,\*::before,\*::after\s*{[^}]*}/g, '');
      css = css.replace(/(^|\n|\})\s*body\s*{[^}]*}/g, '$1');
      css = css.replace(/(^|\n|\})\s*a\s*{[^}]*}/g, '$1');
      css = css.replace(/(^|\n|\})\s*img\s*{[^}]*}/g, '$1');
      mergedCss += `\n/* From ${file} */\n${css.trim()}\n`;
    }
    
    // Extract HTML
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      let bodyContent = bodyMatch[1];
      bodyContent = bodyContent.replace(/<script>([\s\S]*?)<\/script>/gi, '');
      mergedHtml += `\n<!-- From ${file} -->\n${bodyContent.trim()}\n`;
    }
    
    // Extract JS
    const scriptMatches = [...content.matchAll(/<script>([\s\S]*?)<\/script>/gi)];
    scriptMatches.forEach(match => {
      let js = match[1];
      mergedJs += `\n/* From ${file} */\n(function(){\n${js.trim()}\n})();\n`;
    });
  });

  // Inject CSS
  let finalHtml = baseHtml.replace(/\/\*\s*============ PLACEHOLDER MAIN[^\*]*\*\//, `/* ============ BİRLEŞTİRİLEN CSS ============ */\n${mergedCss}`);
  finalHtml = finalHtml.replace(/\.demo-hero\{[^}]*\}/, '');
  finalHtml = finalHtml.replace(/\.demo-hero h1\{[^}]*\}/, '');
  finalHtml = finalHtml.replace(/\.demo-hero p\{[^}]*\}/, '');

  // Inject HTML
  finalHtml = finalHtml.replace(/<!-- ================= PLACEHOLDER MAIN[^\-]*-->/, `<!-- ================= BİRLEŞTİRİLEN İÇERİK ================= -->\n${mergedHtml}`);

  // Inject JS
  finalHtml = finalHtml.replace('</body>', `<script>\n/* ============ BİRLEŞTİRİLEN JS ============ */\n${mergedJs}\n</script>\n</body>`);

  // Add links to navbar and common buttons
  finalHtml = finalHtml.replace(/href="#"([^>]*)>\s*Ana Sayfa\s*<\/a>/gi, 'href="index.html"$1>Ana Sayfa</a>');
  finalHtml = finalHtml.replace(/href="#"([^>]*)>\s*Hizmetleri Ke[sş]fet\s*<\/a>/gi, 'href="hizmetlerimiz.html"$1>Hizmetleri Keşfet</a>');
  finalHtml = finalHtml.replace(/href="#"([^>]*)>\s*Hizmeti [Iİ]ncele\s*<\/a>/gi, 'href="hizmetlerimiz.html"$1>Hizmeti İncele</a>');
  
  // Update top menu Hizmetler link to go to hizmetlerimiz.html (optional if it's a mega menu button, but good to have)
  finalHtml = finalHtml.replace(/<button class="nav__link" id="megaBtn"/gi, '<a href="hizmetlerimiz.html" class="nav__link" id="megaBtn"');
  finalHtml = finalHtml.replace(/<\/button>\s*<!-- MEGA MENU -->/gi, '</a>\n          <!-- MEGA MENU -->');
  
  // Remove the JS event listener that prevents the link from navigating and gets the mega menu stuck
  finalHtml = finalHtml.replace(/megaBtn\.addEventListener\('click', function\(e\)\{[\s\S]*?\}\);/gi, '');

  // Catch-all: replace any remaining href="#" with demo.html
  finalHtml = finalHtml.replace(/href="#"/g, 'href="demo.html"');

  // Also replace bottom nav "Hizmetler" link if it exists
  // e.g. <button class="bn-item" id="bnServices"> -> we can leave it if it opens a drawer.

  fs.writeFileSync(outputFile, finalHtml, 'utf8');
  console.log(`Successfully generated ${outputFile}`);
}

// Build index.html
buildPage('index.html', [
  'cortek-hero.html',
  'cortek-sections.html',
  'cortek-sections-2.html'
]);

// Build hizmetlerimiz.html
buildPage('hizmetlerimiz.html', [
  'cortek-hizmetler.html',
  'cortek-hizmetler-2.html'
]);

// Copy demo page
fs.copyFileSync('cortek-demo.html', 'demo.html');
console.log('Successfully generated demo.html');
