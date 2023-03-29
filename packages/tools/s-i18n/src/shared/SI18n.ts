// @ts-nocheck

import __SClass from '@coffeekraken/s-class';

import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                SI18n
 * @namespace           shared
 * @type                Class
 * @platform            node
 * @platform            js
 * @status              beta
 *
 * This class allows you to handle translations (i18n) easily and elegantly.
 * It works in node as well as in the browser.
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet          __SI18n()
 * const i18n = new __SI18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @example             js
 * import __SI18n from '@coffeekraken/s-i18n';
 * const i18n = new __SI18n();
 * await i18n.load('en');
 * i18n.set('en');
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export default class SI18n extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings = {}) {
        super(__deepMerge({}, settings));
    }
}
