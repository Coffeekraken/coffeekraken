import _hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import _querySelector from '@coffeekraken/sugar/js/dom/querySelector';

export default class StatesSwitcher {

  /**
   * Constructor
   */
  constructor($domElm, settings = {}) {
    this._$domElm = $domElm

    // check if we have to display it or not depending on the localStorage data
    if (localStorage.getItem('ck-pre-view-welcome-container') === null) {
      setTimeout(() => {
        // display the container
        this.open();
      }, 1000);
    }

    // listen for click on the button to close the container
    _querySelector('button', {
      rootNode: this._$domElm
    }).addEventListener('click', () => {
      this.close();
    });
  }

  /**
   * Open the container
   */
  open() {
    if (!this._$domElm) return;
    this._$domElm.classList.add('ck-preview__welcome-container--open');
  }

  /**
   * Close the container
   */
  close() {
    this._$domElm.classList.remove('ck-preview__welcome-container--open');
    localStorage.setItem('ck-pre-view-welcome-container', true);
  }

}
