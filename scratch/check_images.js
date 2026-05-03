const fs = require('fs');
const path = require('path');

const dir = 'public/projects';
fs.readdirSync(dir).forEach(file => {
  const filePath = path.join(dir, file);
  const stats = fs.statSync(filePath);
  console.log(`${file}: ${stats.size} bytes`);
});
