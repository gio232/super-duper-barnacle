const fs = require('fs');
const path = require('path');

const dir = '/Users/artemtarianik/kate1';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Replace address
  content = content.replace(/>Cham\/Zug, Switzerland</g, '>Seeblick 1, CH- 6330 Cham, Switzerland<');
  content = content.replace(/>Cham\/Zug, Switzerland — unser Standort</g, '>Seeblick 1, CH- 6330 Cham, Switzerland — unser Standort<');
  content = content.replace(/Cham\/Zug, Switzerland\s*<\/div>/g, 'Seeblick 1, CH- 6330 Cham, Switzerland</div>');
  content = content.replace(/Cham\/Zug, Switzerland(\s*)<\/p>/g, 'Seeblick 1, CH- 6330 Cham, Switzerland$1</p>');
  
  // Also fix the text in index.html (about section line 221 & 298)
  content = content.replace(/Cham\/Zug, Switzerland/g, 'Seeblick 1, CH- 6330 Cham, Switzerland');
  
  fs.writeFileSync(path.join(dir, file), content);
});
console.log('HTML files updated successfully.');
