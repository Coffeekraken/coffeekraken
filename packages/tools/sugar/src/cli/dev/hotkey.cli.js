const __hotkey = require('../../node/keyboard/hotkey');

module.exports = (stringArgs = '') => {
  __hotkey('a', {
    systemWide: true
  }).on('press', (e) => {
    console.log('press', e);
  });
};
