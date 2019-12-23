import "@babel/polyfill";
import "../../../dist/js/feature/all";

import innerHtml from '../../../dist/js/dom/innerHtml';

import sugar from '../../../dist/js/_all';

console.log(sugar);

innerHtml(document.getElementById('yop'), 'Hello World', {
  animIn: 'fadeDown',
  animOut: 'fadeDown'
}).then(() => {
  console.log('FINISHED');
})
