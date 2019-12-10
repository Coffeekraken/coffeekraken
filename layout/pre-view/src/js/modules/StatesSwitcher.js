import _hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import _querySelector from '@coffeekraken/sugar/js/dom/querySelector';

export default class StatesSwitcher {

  /**
   * Constructor
   */
  constructor($domElm, settings = {}) {
    this._$domElm = $domElm
    this._settings = {
      ...settings
    };
    this._currentStateIndex = 0;

    // add the hotkeys
    this._addHotkeys();

    // add events listeners
    this._addEventListeners();
  }

  /**
   * Add the hotkey getted from the settings object
   */
  _addHotkeys() {
    this._deleteHotkey = _hotkey('ctrl+enter', (event, handler) => {
      this.switchState();
    });
  }

  /**
   * Remove the hotkey
   */
  _removeHotkeys() {
    if (this._deleteHotkey) this._deleteHotkey();
  }

  /**
   * Add event listeners
   */
  _addEventListeners() {
    window.addEventListener('message', (e) => {
      if (e.data === 'states-switcher--switch') {
        this.switchState();
      }
    });
  }

  /**
   * Switch between the registered states
   */
   switchState() {
     // update current state index
     this._currentStateIndex += 1;
     if (this._currentStateIndex >= window.ck_states.length) {
       this._currentStateIndex = 0;
     }
     // get the state size
     const stateWidth = window.ck_states[this._currentStateIndex];
     // apply the width to the iframe
     this._$domElm.style.width = stateWidth;
   }

}
