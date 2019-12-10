import _hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';

_hotkey('command+enter', (event, handler) => {
  window.parent.postMessage('views-selector--open');
});
_hotkey('ctrl+enter', (event, handler) => {
  window.parent.postMessage('states-switcher--switch');
});
