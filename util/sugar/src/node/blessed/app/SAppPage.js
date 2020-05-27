const __SPromise = require('../../promise/SPromise');
const __SComponent = require('../SComponent');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name                    SAppPage
 * @namespace               sugar.node.blessed.app
 * @type                    Class
 * @extends                 SComponent
 *
 * This represent the base class that all the pages of an SApp based application
 * MUST extends.
 *
 * @param       {String}        id          An id for this particular page that can be used to retreive this instance using the static method "SAppPage.getPageById(id)"
 * @param       {String}        title          A title for this particular page that can be used to retreive this instance using the static method "SAppPage.getPageByTitle(title)"
 * @param       {Object}        [settings={}]     A settings object that will be passed to the SComponent class constructor
 * - persistent (false) {Boolean}: Specify if you want your page to be destroyed when the user go to another one or not...
 *
 * @example       js
 * const SAppPage = require('@coffeekraken/sugar/node/blessed/app/SAppPage');
 * const myPage = new SAppPage('my.cool.page', 'My cool page', {});
 *
 * TODO: Documentation
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SAppPage extends __SComponent {
  /**
   * @name          _id
   * @type          String
   * @private
   *
   * Store the page id
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _id = null;

  /**
   * @name        _title
   * @type        String
   * @private
   *
   * Store the page title
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _title = null;

  /**
   * @name          _promise
   * @type          SPromise
   * @private
   *
   * Store an SPromise instance
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _promise = null;

  /**
   * @name          _argsObj
   * @type          Object
   * @private
   *
   * Store the arguments object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _argsObj = {};

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(id, title, settings = {}) {
    super(
      __deepMerge(
        {
          persistent: false
        },
        settings
      )
    );
    // save id and title
    this._id = id;
    this._title = title;
    // init a new SPromise instance
    this._promise = new __SPromise(() => {});
    // map some SPromise instance methods on this class instance
    this.on = this._promise.on.bind(this._promise);
  }

  /**
   * @name        app
   * @type        SApp
   * @get
   *
   * Access the application instance on which you will have access to configs, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get app() {
    return global.SAppInstance;
  }

  /**
   * @name        persistent
   * @type        Boolean
   * @get
   *
   * Access the value of the settings.persistent property
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get persistent() {
    return this._settings.persistent;
  }

  /**
   * @name        setArgs
   * @type        Function
   *
   * This method allows you to set some page arguments by passing an object.
   * Calling this will trigger an "args" and an "arg" SPromise "event".
   *
   * @param         {Object}        argsObj         An object of arguments to set
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  setArgs(argsObj) {
    // build an object that take all updated arguments values
    const updatedArgsObj = {};
    // loop on each new arguments
    Object.keys(argsObj).forEach((argName) => {
      // check if it has changed
      if (
        this._argsObj[argName] !== undefined &&
        argsObj[argName] === this._argsObj[argName]
      ) {
      } else {
        // trigger an "arg" event through the _promise property
        this._promise.trigger(`arg.${argName}`, {
          newValue: argsObj[argName],
          oldValue: this._argsObj[argName]
        });
        this._promise.trigger('arg', {
          name: argName,
          newValue: argsObj[argName],
          oldValue: this._argsObj[argName]
        });
        updatedArgsObj[argName] = {
          newValue: argsObj[argName],
          oldValue: this._argsObj[argName]
        };
      }
      // trigger an "args" event through the _promise property
      this._promise.trigger('args', updatedArgsObj);
      // set the new arg value
      this._argsObj[argName] = argsObj[argName];
    });
  }

  /**
   * @name          destroy
   * @type          Function
   *
   * This method serve to destroy the page when a user change to another one and that the
   * value of settings.persistent is to false
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  destroy() {}
};
