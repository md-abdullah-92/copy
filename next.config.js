// next.config.js
const path = require('path');

module.exports = {
  webpack: (config) => {
    // Optional: Alias for the frontend folder
    config.resolve.alias['@'] = path.join(__dirname, 'frontend');
    return config;
  },
  // Keep this for custom page extensions if needed
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
