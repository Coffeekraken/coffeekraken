import _hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import _querySelector from '@coffeekraken/sugar/js/dom/querySelector';

export default class ViewsSelector {

  /**
   * Constructor
   */
  constructor($domElm, settings = {}) {
    this._$domElm = $domElm
    this._settings = {
      hotkey: 'command+enter',
      ...settings
    };

    // add the hotkeys
    this._addHotkeys();

    // add events listeners
    this._addEventListeners();
  }

  /**
   * Add the hotkey getted from the settings object
   */
  _addHotkeys() {
    this._deleteEscapeHotkey = _hotkey('esc', (event, handler) => {
      // close the views selector
      this.close();
    });
    // listen for the hotkey to open the view selection module
    this._deleteHotkey = _hotkey('command+enter', (event, handler) => {
      // open the views selector
      this.open();
    });
  }

  /**
   * Remove the hotkey
   */
  _removeHotkeys() {
    if (this._deleteHotkey) this._deleteHotkey();
    if (this._deleteEscapeHotkey) this._deleteEscapeHotkey();
  }

  /**
   * Add event listeners
   */
  _addEventListeners() {
    if (this._$domElm) {
      this._$domElm.addEventListener('change', this._onChange);
    }
    window.addEventListener('message', (e) => {
      if (e.data === 'views-selector--open') {
        this.open();
      }
    });
  }

  /**
   * On change
   */
  _onChange(e) {
    // change the url with the passed e
    window.location.href = e.target.value;
  }

  /**
   * Set the focus to the views selector
   */
  focus() {
    if (this._$domElm) {
      const $select = _querySelector('[is="ck-select"]', {
        rootNode: this._$domElm
      });
      // set the focus and open the select
      $select.open();
      $select.focus();
    }
  }

  /**
   * Open the views selector
   */
  open() {
    if (this._$domElm) {
      this._$domElm.classList.add('ck-preview__views-selector--opened');
      this.focus();
    }
  }

  /**
   * Close the views selector
   */
  close() {
    if (this._$domElm) {
      this._$domElm.classList.remove('ck-preview__views-selector--opened');
    }
  }

}
