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

    // restore the state from localstorage
    this._restoreState();
  }

  /**
   * Add the hotkey getted from the settings object
   */
  _addHotkeys() {
    this._deleteHotkey = _hotkey(window.ck_hotkey_states || 'ctrl+enter', (event, handler) => {
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
   * Apply a state by passing the state index
   */
  applyState(stateIndex) {
    // get the state size
    const stateWidth = window.ck_states[stateIndex];
    // apply the width to the iframe
    this._$domElm.style.width = stateWidth;
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

     // save the state in localstorage
     localStorage.setItem('ck-pre-view-state', this._currentStateIndex);
     // apply the state
     this.applyState(this._currentStateIndex);
   }

   /**
    * Restore the state from localstorage
    */
   _restoreState() {
     // try to get the state from localStorage
     const state = localStorage.getItem('ck-pre-view-state');
     // check if we have a states
     if (state !== 'NaN') {
       // set the state in instance
       this._currentStateIndex = state;
       // apply the state
       this.applyState(this._currentStateIndex);
     } else {
       this._currentStateIndex = 0;
     }
   }

}
