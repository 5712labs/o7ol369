const strapi = require('strapi');

const path = require('path');
let envFilename = '.env';
if (process.env.NODE_ENV === 'development') {
  envFilename = '.env';
} else if (process.env.NODE_ENV === 'production') {
  envFilename = '.env';
}
require('dotenv').config({ path: path.join(__dirname, '../', envFilename) }); // 상위(루트)
console.log('dotenv config path: ', path.join(__dirname, '../', envFilename));

strapi().start();
