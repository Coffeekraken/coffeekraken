// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                SClassmapBase
 * @namespace           shared
 * @extends             SClass
 * @type                Class
 * @status              beta
 *
 * This package allows you to compress your css classes/variables,
 * to patch them in your HTML as well as to proxy js native functions
 * like classList.add, style.setProperty, etc, to reflect your minified classnames.
 *
 * @param       {Object}            [settings={}]           An object of settings to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISClassmapSettings {
    map: string | Record<string, string>;
}

export default class SClassmapBase extends __SClass {
    /**
     * @name        map
     * @type        Object
     *
     * Store the classmap used across
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    map;

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
    constructor(settings?: Partial<ISClassmapSettings>) {
        super(
            __deepMerge(
                {
                    path: undefined,
                    map: undefined,
                },
                settings ?? {},
            ),
        );

        // set the map if setted in the settings
        if (this.settings.map) {
            this.map = this.settings.map;
        }
    }

    /**
     * @name            patchHtml
     * @type        Function
     *
     * This method takes an html string and replace all the classnames that are present in the classmap
     *
     * @param       {String}            html            The html to process
     * @return      {String}                            The processed html
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    patchHtml(html: string): string {
        console.log('patch', html);
    }
}
