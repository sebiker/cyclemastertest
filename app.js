const fs = require('fs');
const path = require('path');

const distEntry = path.join(__dirname, 'dist', 'index.js');

if (!fs.existsSync(distEntry)) {
  console.error('Error: Built entry point not found.');
  console.error('Run "npm run build" first, then use "node app.js" or "npm start".');
  process.exit(1);
}

require(distEntry);
