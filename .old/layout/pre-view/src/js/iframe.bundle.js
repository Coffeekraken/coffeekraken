import _hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';

_hotkey(window.parent.ck_hotkey_selector || 'command+enter', (event, handler) => {
  window.parent.postMessage('views-selector--open');
});
_hotkey(window.parent.ck_hotkey_states || 'ctrl+enter', (event, handler) => {
  window.parent.postMessage('states-switcher--switch');
});
