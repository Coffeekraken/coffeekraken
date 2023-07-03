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
 * A simple class to handle the media (queries) like methods like buildQuery, layoutCss, etc... All of this on top of the @specim3n/types ISMedia type and the @coffeekraken/s-frontspec package
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
        }
        else if (media) {
            this._media = media;
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxRQUFRLE1BQU0sa0JBQWtCLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBQ3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBSyxHQUFHLFdBQVcsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMxQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWpDLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNWLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixZQUFZLEVBQUUsU0FBUztnQkFDdkIsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsYUFBYSxFQUFFLFVBQVU7Z0JBQ3pCLE9BQU8sRUFBRTtvQkFDTCxNQUFNLEVBQUU7d0JBQ0osUUFBUSxFQUFFLENBQUM7d0JBQ1gsUUFBUSxFQUFFLEdBQUc7cUJBQ2hCO29CQUNELE1BQU0sRUFBRTt3QkFDSixRQUFRLEVBQUUsR0FBRzt3QkFDYixRQUFRLEVBQUUsSUFBSTtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFFBQVEsRUFBRSxJQUFJO3FCQUNqQjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsUUFBUSxFQUFFLElBQUk7d0JBQ2QsUUFBUSxFQUFFLElBQUk7cUJBQ2pCO2lCQUNKO2FBQ0osQ0FBQztTQUNMO1FBRUQsYUFBYTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNKIn0=