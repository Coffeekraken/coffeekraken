// @ts-nocheck

import { __whenImageLoaded } from '@coffeekraken/sugar/dom';
import __fastdom from 'fastdom';

/**
 * @name 		imagesLoadedAttribute
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add on every images the attribute "loaded" when it has been fully loaded. This is useful
 * for styling purposes and for others thinks as well.
 *
 * @param     {Object}        [settings={}]       An object of settings to configure your feature
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example 	js
 * import { __imagesLoadedAttribute } from '@coffeekraken/sugar/feature';
 *  __imagesLoadedAttribute();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __imagesLoadedAttribute(): void {
    document.addEventListener(
        'load',
        (e) => {
            if (!e.target.tagName) return;
            if (e.target.tagName.toLowerCase() !== 'img') return;
            if (e.target.hasAttribute('loaded')) return;
            e.target.setAttribute('loaded', true);
        },
        true,
    );
    [].forEach.call(document.querySelectorAll('img'), (img) => {
        __whenImageLoaded(img).then((img) => {
            __fastdom.mutate(() => {
                if (img.hasAttribute('loaded')) return;
                img.setAttribute('loaded', true);
            });
        });
    });
}
