import "@babel/polyfill";
import "../../../dist/js/feature/all";

import innerHtml from '../../../dist/js/dom/innerHtml';

innerHtml(document.getElementById('yop'), 'Hello World', {

}).then(() => {
  console.log('FINISHED');
})
