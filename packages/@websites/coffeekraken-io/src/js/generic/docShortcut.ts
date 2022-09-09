import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __scrollTo } from '@coffeekraken/sugar/dom';

// search shortcut
__hotkey('cmd+p').on('press', (e) => {
  // prevent behavior
  e.cancelBubble = true;
  e.preventDefault();
  e.stopImmediatePropagation();
  // svcroll to top
  // __scrollTo(document.body);
  // focus in search input
  // @ts-ignore
  document.querySelector('#search-input > input').focus();
});
