const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.js');

const configContent = `const CONFIG = {
  CONTENTFUL_SPACE_ID: '${process.env.CONTENTFUL_SPACE_ID || "PLACEHOLDER"}',
  CONTENTFUL_ACCESS_TOKEN: '${process.env.CONTENTFUL_ACCESS_TOKEN || "PLACEHOLDER"}',
  CONTENTFUL_CONTENT_TYPE: '${process.env.CONTENTFUL_CONTENT_TYPE || "evento"}'
};`;

fs.writeFileSync(configPath, configContent);
console.log('✅ Config.js generado exitosamente con variables de entorno.');
