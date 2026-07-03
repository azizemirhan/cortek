const fs = require('fs');
const filePath = 'cortek-sections.html';
let content = fs.readFileSync(filePath, 'utf8');

// The base64 img tag is huge, we can replace it with regex
content = content.replace(/<img src="data:image\/jpeg;base64,[^"]+" alt="[^"]*" \/>/g, '<img src="Kamera.png" alt="Cortek Kamera Sistemleri" />');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Image replaced in cortek-sections.html');
