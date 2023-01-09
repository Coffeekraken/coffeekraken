// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import type { ISClassmapSettings } from '../shared/SClassmapBase';

import __fs from 'fs';
import __SClassmapBase from '../shared/SClassmap';

/**
 * @name                SClassmap
 * @namespace           node
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
 * @example             js
 * import SClassmap from '@coffeekraken/s-classmap';
 * const classmap = new SClassmap();
 * await classmap.read();
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISClassmapNodeSettings extends ISClassmapSettings {
    path: string;
}

export default class SClassmap extends __SClassmapBase {
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
    constructor(settings?: Partial<ISClassmapNodeSettings>) {
        super({
            path: __SSugarConfig.get('classmap.path'),
            ...(settings ?? {}),
        });
    }

    /**
     * @name      read
     * @type        Function
     * @async
     *
     * This method simply load the classmap.json file at the root of your project
     *
     * @return      {Promise<Object>}               The classmap json
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    async read(): Promise<any> {
        this.map = JSON.parse(__fs.readFileSync(this.settings.path));
        return this.map;
    }
}
