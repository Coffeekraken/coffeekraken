// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import type { ISClassmapBaseSettings } from '../shared/SClassmapBase.js';

import { __toBase } from '@coffeekraken/sugar/number';

import __fs from 'fs';
import __SClassmapBase from '../shared/SClassmapBase.js';

/**
 * @name                SClassmap
 * @namespace           node
 * @extends             SClass
 * @type                Class
 * @platform            node
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
    path: string;
}

export default class SClassmap extends __SClassmapBase {
    /**
     * @name      map
     * @type        Object
     *
     * Store the actual classes map
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    map = {};

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
            path: __SSugarConfig.get('classmap.path'),
            ...(settings ?? {}),
        });
        // read the docmap file if no map is provided
        // in the settings
        if (!this.settings.map && this.settings.path) {
            this.readSync();
        }
    }

    /**
     * @name      readSync
     * @type        Function
     *
     * This method simply load the classmap.json file at the root of your project
     *
     * @return      {Object}               The classmap json
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    readSync(): any {
        if (!__fs.existsSync(this.settings.path)) {
            return this.map;
        }
        this.map = JSON.parse(__fs.readFileSync(this.settings.path));
        return this.map;
    }

    /**
     * @name      saveSync
     * @type        Function
     *
     * This method simply save the classmap.json file at the root of your project
     *
     * @return      {Promise<Object>}               The classmap json
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    saveSync(incremental = false): void {
        if (!this.settings.path) {
            throw new Error(
                `<red>[SClassmap]</red> To save your classmap.json file, you MUST specify a settings.path`,
            );
        }

        let mapToSave = this.map;

        if (incremental) {
            const actualMap = this.map ?? {};
            let savedMap = this.readSync();
            const newMap = {
                ...savedMap,
                ...actualMap,
            };
            mapToSave = newMap;
        }

        __fs.writeFileSync(
            this.settings.path,
            JSON.stringify(mapToSave, null, 4),
        );
    }

    /**
     * @name        applyOnAst
     * @type        function
     *
     * This method simply apply the classmap on an postcss AST
     *
     * @param       {Node}      node        The postcss AST node on which to apply the classmap
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    applyOnAst(node, map = this.map) {
        function getToken(name: string): string {
            if (name.match(/(--)?s[0-9]+/)) {
                return name.replace(/^--/, '');
            }
            if (map[name]) {
                return map[name];
            }
            map[name] = `s${__toBase(Object.keys(map).length, 62)}`;
            return map[name];
        }

        // console.log(a(203));

        // // --s-color-accent-olivier
        // // --s-color-accent-tania
        // // --sab

        // if (!map?.['s-lod-0']) {
        //     map['s-lod-0'] = 's0';
        //     map['s-lod-1'] = 's1';
        //     map['s-lod-2'] = 's2';
        //     map['s-lod-3'] = 's3';
        //     map['s-lod-4'] = 's4';
        //     map['s-lod-5'] = 's5';
        //     map['s-lod-6'] = 's6';
        //     map['s-lod-7'] = 's7';
        //     map['s-lod-8'] = 's8';
        //     map['s-lod-9'] = 's9';
        //     map['s-lod-10'] = 's10';
        // }

        node.walkDecls((decl) => {
            if (decl.variable) {
                // get the variable token and replace it's prop
                const token = `--${getToken(decl.prop)}`;
                decl.prop = token;
            }

            // replace variables in value
            const varsMatches = decl.value.match(/\-\-[a-zA-Z0-9_-]+/gm);
            if (varsMatches) {
                varsMatches.forEach((varName) => {
                    const varToken = getToken(varName);
                    decl.value = decl.value.replace(varName, `--${varToken}`);
                });
            }
        });

        node.walkRules((rule) => {
            if (!rule.selectors) {
                return;
            }
            rule.selectors = rule.selectors.map((sel) => {
                sel = sel
                    .split(' ')
                    .map((part) => {
                        const classMatches = part.match(/\.[a-zA-Z0-9_-]+/gm);
                        if (classMatches) {
                            classMatches.forEach((cls) => {
                                const clsWithoutDot = cls.slice(1);
                                let clsToken = getToken(clsWithoutDot);
                                part = part.replace(cls, `.${clsToken}`);
                            });
                        }
                        return part;
                    })
                    .join(' ');
                return sel;
            });
        });

        return map;
    }
}
