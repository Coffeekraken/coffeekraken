// @ts-nocheck

import { __querySelectorLive, __whenInViewport } from '@coffeekraken/sugar/dom';

/**
 * @name 		videoLazySrcAttribute
 * @namespace            js.feature
 * @type      Feature
 * @platform          js
 * @status      beta
 *
 * Add support for the `lazy-src` attribute on `video` elements.
 * The video `src` attribute will be populated when the `video` element enter the viewport
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
 *
 * @todo            interface
 * @todo            doc
 * @todo            tests
 *
 * @example     js
 * import { __videoLazySrcAttribute } from '@coffeekraken/sugar/feature';
 * __videoLazySrcAttribute();
 *
 * @example    html
 * <video lazy-src="my-cool-video.mp4"></video>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IVideoLazySrcAttributeSettings {
    offset: number;
}

export default function __videoLazySrcAttribute(
    settings: Partial<IVideoLazySrcAttributeSettings> = {},
): void {
    settings = {
        offset: 50,
        ...settings,
    };
    __querySelectorLive('video[lazy-src]:not([is])', ($videoElm) => {
        __whenInViewport($videoElm, settings.offset).then(() => {
            $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
        });
    });
}
