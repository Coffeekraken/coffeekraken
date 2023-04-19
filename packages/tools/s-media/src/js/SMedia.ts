// @ts-nocheck

import __SFrontspec from '@coffeekraken/s-frontspec';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SMedia from '../shared/SMedia';

/**
 * @name                SMedia
 * @namespace           js
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status             beta
 *
 * A simple class to handle the media (queries) like methods like buildQuery, layoutCss, etc... All of this on top of the @specimen/types ISMedia type and the @coffeekraken/s-frontspec package
 *
 * @param       {String|Object}             [media='frontspec']                      Either an ISMedia object, or 'frontspec' if you want them to be loaded from your frontspec.json file
 * @param       {Object|Array}              [settings=[]]              Some settings to configure your SMedia instance
 *
 * @example         php
 * const media = new SMedia();
 * const query = media.buildQuery('desktop');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SMedia extends __SMedia {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(media = 'frontspec', settings = {}) {
        super(__deepMerge({}, settings));

        if (media === 'frontspec') {
            this._media = __SFrontspec.get('media');
        } else if (media) {
            this._media = media;
        } else {
            this._media = {
                defaultAction: '<=',
                defaultMedia: 'desktop',
                method: 'media',
                containerName: 'viewport',
                queries: {
                    mobile: {
                        minWidth: 0,
                        maxWidth: 639,
                    },
                    tablet: {
                        minWidth: 640,
                        maxWidth: 1279,
                    },
                    desktop: {
                        minWidth: 1280,
                        maxWidth: 2047,
                    },
                    wide: {
                        minWidth: 2048,
                        maxWidth: null,
                    },
                },
            };
        }

        // sort media
        this._media = this.sortQueries(this._media);
    }
}
