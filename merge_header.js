const fs = require('fs');
const path = require('path');

const dir = '/Users/artemtarianik/kate1';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newHeader = `
  <!-- HEADER & NAV -->
  <header class="main-nav" id="main-nav">
    <div class="container">
      <div class="logo-area">
        <a href="index.html" class="logo-img-link">
          <img src="logo.png" alt="Swiss Center Services AG" class="top-bar-logo">
        </a>
      </div>
      
      <div class="nav-links" id="nav-links">
        <a href="index.html" id="nav-home" data-i18n="nav_home">Startseite</a>
        <a href="legal.html" id="nav-legal" data-i18n="nav_legal">Rechtsberatung</a>
        <a href="accounting.html" id="nav-accounting" data-i18n="nav_accounting">Buchhaltung</a>
        <a href="tax.html" id="nav-tax" data-i18n="nav_tax">Steuerfragen</a>
        <a href="about.html" id="nav-about" data-i18n="nav_about">Über uns</a>
        <a href="contact.html" id="nav-contacts" data-i18n="nav_contacts">Kontakt</a>
      </div>

      <div class="top-contacts">
        <div class="lang-switcher"></div>
        <a href="contact.html" class="nav-cta-link" id="nav-cta" data-i18n="nav_cta">Anfrage</a>
        <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
    <div class="mobile-overlay" id="mobile-overlay"></div>
  </header>
`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Try to remove old top-bar and main-nav and replace with newHeader
  // Match from <header class="top-bar"> to </nav>
  // The regex needs to be careful
  
  const regex = /<header class="top-bar">[\s\S]*?<\/nav>/i;
  
  if (regex.test(content)) {
    content = content.replace(regex, newHeader.trim());
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated', file);
  } else {
    // maybe it doesn't have top-bar or main-nav exactly like that
    console.log('Skipped', file);
  }
});
