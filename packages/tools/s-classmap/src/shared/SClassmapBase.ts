// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                SClassmapBase
 * @namespace           shared
 * @extends             SClass
 * @type                Class
 * @platform            node
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
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISClassmapBaseSettings {
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
    constructor(settings?: Partial<ISClassmapBaseSettings>) {
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
    // patchHtml(html: string): string {
    //     console.log('patch', html);
    // }

    /**
     * @name            patchHtml
     * @type            Function
     * @platform        php
     * @status          beta
     *
     * This method allows you to patch the passed html and replace in it all the available
     * classes in the map
     *
     * @param       {String}            $html           The html to patch
     * @return      {String}                            The patched html
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    patchHtml(html: string): string {
        let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm,
            needClassAttr = true;
        if (html.trim().match(/class="[a-zA-Z0-9_\-:@\s]+$/)) {
            reg = /class="[a-zA-Z0-9_\-:@\s]+"?/gm;
        } else if (html.trim().match(/^[a-zA-Z0-9_\-:@\s]+$/)) {
            reg = /[a-zA-Z0-9_\-:@\s]+/gm;
            needClassAttr = false;
        }

        const matches = html.match(reg);
        if (!matches) return html;

        // @ts-ignore
        matches.forEach((match) => {
            const endQuote = match.match(/"$/) ? '"' : '';
            const classesStr = match
                // .trim()
                .replace('class="', '')
                .replace('"', '');

            const newClassesNames = classesStr.split(' ').map((cls) => {
                return this.map[cls] ?? cls;
            });

            if (needClassAttr) {
                html = html.replace(
                    match,
                    `class="${newClassesNames.join(' ')}${endQuote}`,
                );
            } else {
                html = html.replace(
                    match,
                    `${newClassesNames.join(' ')}${endQuote}`,
                );
            }
        });

        return html;
    }
}
