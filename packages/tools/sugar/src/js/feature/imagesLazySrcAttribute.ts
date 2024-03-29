// @ts-nocheck

import __whenInViewport from '../dom/detect/whenInViewport.js';
import __querySelectorLive from '../dom/query/querySelectorLive.js';

import __fastdom from 'fastdom';
import deepMerge from '../../shared/object/deepMerge.js';

/**
 * @name 		imagesLazySrcAttribute
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add support for the `lazy-src` attribute on `img` elements.
 * The video `src` attribute will be populated when the `img` element enter the viewport
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @snippet         __imagesLazySrcAttribute()
 *
 * @example       js
 * import { __imagesLazySrcAttribute } from '@coffeekraken/sugar/feature';
 * __imagesLazySrcAttribute();
 *
 * @example    html
 * <img lazy-src="my-cool-image.jpg" />
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IImagesLazySrcAttributeSettings {
    offset: number;
}

export default function __imagesLazySrcAttribute(
    settings: Partial<IImagesLazySrcAttributeSettings> = {},
): void {
    settings = deepMerge(
        {
            offset: 50,
        },
        settings,
    );
    __querySelectorLive('img[lazy-src]:not([is])', ($imgElm) => {
        __whenInViewport($imgElm, settings.offset).then(() => {
            __fastdom.mutate(() => {
                $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
            });
        });
    });
}
