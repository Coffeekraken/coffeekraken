import "@babel/polyfill";
import "../../../dist/js/feature/all";

import hotkey from '../../../dist/js/keyboard/hotkey';

const stop = hotkey('ctrl+c', (event, handler) => {
  console.log('click');
  console.log(event, handler);
});
//
// setTimeout(() => {
//   stop();
// }, 10000);
