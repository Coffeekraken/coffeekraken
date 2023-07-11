// @ts-nocheck

import type { ISClassmapBaseSettings } from '../shared/SClassmapBase.js';
import __SClassmapBase from '../shared/SClassmapBase.js';

/**
 * @name                SClassmap
 * @namespace           js
 * @extends             SClass
 * @type                Class
 * @platform            js
 * @status              wip
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

export interface ISClassmapSettings extends ISClassmapBaseSettings {
    patchNativeMethods: boolean;
}

export default class SClassmap extends __SClassmapBase {
    /**
     * @name            init
     * @type            Function
     * @static
     *
     * This method allows you to init the your SClassmap instance and store it into the document.env.SUGAR.classmap property
     *
     * @return          {SClassmap}                                    The SClassmal instance that represent the classmap.json file
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static init(settings?: ISClassmapSettings): SClassmap {
        let classmapInstance = new this(settings);

        // set the front in the env.SUGAR.front property
        if (!document.env) document.env = {};
        if (!document.env.SUGAR) document.env.SUGAR = {};
        document.env.SUGAR.classmap = classmapInstance;

        // return the classmap instance
        return classmapInstance;
    }

    /**
     * @name           isEnabled
     * @type            Function
     * @static
     *
     * Store if the classmap if enabled or not
     *
     * @return      {Boolean}       true if enabled, false if not. Basically, the classmap is enabled if a `document.env.CLASSMAP` map exists
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static isEnabled(): boolean {
        return document.env?.CLASSMAP !== undefined;
    }

    /**
     * @name           areNativeMethodsPatched
     * @type            Function
     * @static
     *
     * Store if the native methods have already been patched
     *
     * @return      {Boolean}       true if already patched, false if not
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _areNativeMethodsPatched: boolean;
    static areNativeMethodsPatched(): boolean {
        return this._areNativeMethodsPatched;
    }

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
        super({
            map: document.env?.CLASSMAP ?? {},
            patchNativeMethods: true,
            ...(settings ?? {}),
        });

        // patch native methods
        if (
            this.settings.patchNativeMethods &&
            !this.constructor.areNativeMethodsPatched()
        ) {
            this.patchNativeMethods();
        }

        this.patchDomLive();
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

        // mark methods as patched
        this.constructor._areNativeMethodsPatched = true;

        // classList
        function getClassList() {
            var element = this;
            var classList = this.className.split(' ');
            classList.add = function (name) {
                const finalName = _this.map[name] ?? name;
                if (classList.indexOf(finalName) !== -1) {
                    return;
                }
                classList.push(finalName);
                element.className = classList.join(' ');
            };
            classList.remove = function (name) {
                const finalName = _this.map[name] ?? name;
                var index = classList.indexOf(finalName);
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
            const newSels = sels.map((sel) => {
                return _this.patchSelector(sel);
            });
            return nativeQuerySelectorAll.call(this, [...sels, ...newSels]);
        };
        const nativeQuerySelector = Element.prototype.querySelector;
        Element.prototype.querySelector = function (...sels) {
            const newSels = sels.map((sel) => {
                const newSel = _this.patchSelector(sel);
                return newSel;
            });

            return nativeQuerySelector.call(this, [...sels, ...newSels]);
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

    resolve(cls: string): string {
        return this.map[cls] ?? this.map[cls.replace(/^\./, '')] ?? cls;
    }

    patchElement($elm: HTMLElement): void {
        const cls = $elm.getAttribute('class')?.split(' ') ?? [];
        const newCls = cls.map((c) => this.resolve(c));
        $elm.setAttribute('class', newCls.join(' '));
    }

    patchDomLive($rootNode: HTMLElement = document): void {
        const settings = {
            afterFirst: undefined,
            rootNode: document,
            // ...settings,
        };

        // observer callback
        const patchDomLiveCallback = (mutationList) => {
            mutationList.forEach((mutation) => {
                // new nodes
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach((node) => {
                        if (!node.matches) return;
                        this.patchElement(node);
                        this.patchDom(node);
                    });
                }
                if (mutation.attributeName === 'class') {
                    if (mutation.target._classmapProcessing) {
                        return;
                    }
                    clearTimeout(mutation.target._classmapTimeout);
                    mutation.target._classmapTimeout = setTimeout(() => {
                        mutation.target._classmapProcessing = true;
                        this.patchElement(mutation.target);
                        setTimeout(() => {
                            mutation.target._classmapProcessing = false;
                        });
                    });
                }
            });
        };

        // observe for classes changes to path them live
        const observer = new MutationObserver(patchDomLiveCallback);
        observer.observe($rootNode, {
            attributeFilter: ['class'],
            attributeOldValue: true,
            childList: true,
            subtree: true,
        });
    }

    patchDom($rootNode: HTMLElement): void {
        const $elms = Array.from($rootNode.querySelectorAll('[class]') ?? []);
        for (let [idx, $elm] of $elms.entries()) {
            this.patchElement($elm);
        }
    }

    patchHtml(html: string): string {
        const classesMatches = html.match(/class="([a-zA-Z0-9_-\s]+)"/gm);
        if (classesMatches?.length) {
            classesMatches.forEach((clsStatement) => {
                let sels = clsStatement
                    .replace('class="', '')
                    .replace(/\"$/, '')
                    .split(' ');

                sels = sels.map((sel) => {
                    return this.resolve(sel);
                });

                html = html.replace(clsStatement, `class="${sels.join(' ')}"`);
            });
        }

        return html;
    }

    patchSelector(sel) {
        const newSel = sel
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
        return newSel;
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
