const serverless = require('serverless-http');
const requestListener = require('../../server.js');

// Export serverless handler for Netlify Functions
exports.handler = serverless(requestListener);
