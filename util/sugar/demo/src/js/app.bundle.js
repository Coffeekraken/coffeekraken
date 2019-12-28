import "@babel/polyfill";
import "../../../dist/js/feature/all";

import innerHtml from '../../../dist/js/dom/innerHtml';

import sugar from '../../../dist/js/_all';

import base64 from '../../../dist/js/crypt/base64';


console.log(base64.encrypt('Coco'));

console.log(sugar);

innerHtml(document.getElementById('yop'), 'Hello World', {
  animIn: 'fadeDown',
  animOut: 'fadeDown'
}).then(() => {
  console.log('FINISHED');
})
