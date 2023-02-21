// @ts-nocheck

import __SClassmapBase from '../shared/SClassmapBase';

/**
 * @name                SClassmap
 * @namespace           js
 * @extends             SClass
 * @type                Class
 * @platform            js
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

export interface ISClassmapJsSettings extends ISClassmapSettings {}

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
    constructor(settings?: Partial<ISClassmapJsSettings>) {
        super({
            map: document.env?.SUGAR?.classmap,
            ...(settings ?? {}),
        });
    }

    /**
     * @name        patchNativeMethods
     * @type        Function
     *
     * This method will patch the native methods like classList.add, style.setProperty, etc... to make use
     * of the classmap
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    patchNativeMethods(): void {
        const _this = this;

        // classList
        function getClassList() {
            var element = this;
            var classList = this.className.split(' ');
            classList.add = function (name) {
                if (classList.indexOf(name) !== -1) {
                    return;
                }
                classList.push(_this.map[name] ?? name);
                element.className = classList.join(' ');
            };
            classList.remove = function (name) {
                var index = classList.indexOf(_this.map[name] ?? name);
                if (index !== -1) {
                    classList.splice(index, 1);
                    element.className = classList.join(' ');
                }
            };
            classList.contains = function (name) {
                return classList.indexOf(_this.map[name] ?? name) !== -1;
            };
            return classList;
        }
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: getClassList,
        });

        const nativeQuerySelectorAll = Element.prototype.querySelectorAll;
        Element.prototype.querySelectorAll = function (...sels) {
            sels = sels.map((sel) => {
                return _this.patchSelector(sel);
            });
            return nativeQuerySelectorAll.call(this, sels);
        };
        const nativeQuerySelector = Element.prototype.querySelector;
        Element.prototype.querySelector = function (...sels) {
            sels = sels.map((sel) => {
                return _this.patchSelector(sel);
            });
            const res = nativeQuerySelector.call(this, sels);
            if (!res) {
            }
            return res;
        };

        // // style
        // // const nativeStylePrototype = HTMLElement.prototype.style;
        // function getStyle() {
        //     var element = this;
        //     // classList.contains = function (name) {
        //     //     return classList.indexOf(_this.map[name] ?? name) !== -1;
        //     // };
        //     return;
        // }
        // Object.defineProperty(HTMLElement.prototype.style, 'setProperty', {
        //     get: getStyle,
        // });
    }

    patchSelector(sel) {
        sel = sel
            .split(' ')
            .map((part) => {
                const classMatches = part.match(/\.[a-zA-Z0-9_-]+/gm);
                if (classMatches) {
                    classMatches.forEach((cls) => {
                        const clsWithoutDot = cls.slice(1);
                        part = part.replace(
                            cls,
                            `.${this.map[clsWithoutDot] ?? clsWithoutDot}`,
                        );
                    });
                }
                return part;
            })
            .join(' ');
        return sel;
    }

    /**
     * @name      loadFromUrl
     * @type        Function
     * @async
     *
     * Load a classmap from a url
     *
     * @param       {string}               url      The url to load the map from
     * @return      {Promise<Object>}               The loaded classmap
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    loadFromUrl(url: string): Promise<Record<string, string>> {
        return new Promise(async (resolve) => {
            const res = await fetch(url).then((response) => response.json());
            this.map = res;
            resolve(res);
        });
    }
}
