const __log = require('./log');
const __splitEveryNChars = require('../../js/string/splitEveryNChars');

module.exports = function header(title, description=null, infos={}) {

  let descriptionArray = [];
  if (description) {
    descriptionArray = __splitEveryNChars(description, 60);
  }
  let descriptionFormated = '';
  descriptionArray.forEach((line) => {
    descriptionFormated += '# ' + line + '\n';
  });


  let message = '#######################################################################\n';
  message += '#\n';
  message += `# ${title} \n`;
  message += '#\n';
  if (descriptionFormated) {
    message += descriptionFormated;
    message += '#\n';
  }
  // loop on each infos
  Object.keys(infos).forEach((key) => {
    message += `# - ${key.charAt(0).toUpperCase() + key.slice(1)}: ${infos[key]}\n`;
  });
  if (Object.keys(infos).length > 0) {
    message += `#\n`;
  }
  message += '#######################################################################';
  message += `#\n`;

  // log the message
  __log(message, 'header');

}
