"use strict";

const __log = require('./log');

module.exports = function header(title, description = null, infos = {}) {
  let message = '#######################################################################\n';
  message += '#\n';
  message += `# ${title} \n`;
  message += '#\n';

  if (description) {
    message += `# ${description}\n`;
    message += '#\n';
  } // loop on each infos


  Object.keys(infos).forEach(key => {
    message += `# - ${key.charAt(0).toUpperCase() + key.slice(1)}: ${infos[key]}\n`;
  });

  if (Object.keys(infos).length > 0) {
    message += `#\n`;
  }

  message += '#######################################################################'; // log the message

  __log(message, 'header');
};