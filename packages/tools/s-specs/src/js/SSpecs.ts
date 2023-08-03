import { __deepMerge } from '@coffeekraken/sugar/object';

import type { ISSpecsSettings } from '../shared/SSpecs.js';
import __SSpecs from '../shared/SSpecs.js';

/**
 * @name            SSpecs
 * @namespace       node
 * @type            Class
 * @platform        node
 * @status          beta
 *
 * This class allows you to access with ease some specification file(s) that supports internal and external references to other files, etc...
 * This is usefull to build specification files in json format that make share some parts through common files, etc...
 * You will also have easy access to your files through "namespaces" that represent different folders on your system. This will simplify
 * the way you read your files by prefixing your dotpath (simple fs "/" replacement) with the namespace you want to look in.
 *
 * @param       {Object}          [$settings={}]              Some settings to configure your instance
 *
 * @setting         {Object}            [namespaces={}]             An object of namespace like "my.namespace" property with a simple array of folders where to search for specs files when using this namespace
 * @setting         {Function}               [previewUrl=null]            A function called only when a .preview.png file exists alongside the .spec.json file that will take an object with "path", "name", "specs" and "specsObj" as input and that has to return the web accessible preview url. If not specified, no "preview" field will exists in the output spec json
 * @setting         {Boolean}           [read.metas=true]           Specify if you want to get the metas back for each spec
 * @setting         {Boolean}           [read.models=true]          Specigy if you want to get back the ".model.json" files that are alongside of the .spec.json file if exists
 *
 * @snippet          __SSpecs($1)
 * const specs = new __SSpecs($1);
 * const spec = specs.read('sugar.views.components.card');
 *
 * @example         js
 * import __SSpecs from '@coffeekraken/s-specs';
 * const spec = new __SSpecs();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSpecsJsSettings extends ISSpecsSettings {}

export default class SSpecs extends __SSpecs {
    /**
     * @name        constructor
     * @type        Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISSpecsJsSettings>) {
        super(__deepMerge({}, settings ?? {}));
    }
}
