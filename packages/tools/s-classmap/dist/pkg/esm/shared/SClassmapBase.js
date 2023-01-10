// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
export default class SClassmapBase extends __SClass {
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
    constructor(settings) {
        super(__deepMerge({
            path: undefined,
            map: undefined,
        }, settings !== null && settings !== void 0 ? settings : {}));
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
    patchHtml(html) {
        let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm, needClassAttr = true;
        if (html.trim().match(/class="[a-zA-Z0-9_\-:@\s]+$/)) {
            reg = /class="[a-zA-Z0-9_\-:@\s]+"?/gm;
        }
        else if (html.trim().match(/^[a-zA-Z0-9_\-:@\s]+$/)) {
            reg = /[a-zA-Z0-9_\-:@\s]+/gm;
            needClassAttr = false;
        }
        const matches = html.match(reg);
        if (!matches)
            return html;
        // @ts-ignore
        matches.forEach((match) => {
            const endQuote = match.match(/"$/) ? '"' : '';
            const classesStr = match
                // .trim()
                .replace('class="', '')
                .replace('"', '');
            const newClassesNames = classesStr.split(' ').map((cls) => {
                var _a;
                return (_a = this.map[cls]) !== null && _a !== void 0 ? _a : cls;
            });
            if (needClassAttr) {
                html = html.replace(match, `class="${newClassesNames.join(' ')}${endQuote}`);
            }
            else {
                html = html.replace(match, `${newClassesNames.join(' ')}${endQuote}`);
            }
        });
        return html;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUEyQnpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLFFBQVE7SUFZL0M7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzQztRQUM5QyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsU0FBUztTQUNqQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILG9DQUFvQztJQUNwQyxrQ0FBa0M7SUFDbEMsSUFBSTtJQUVKOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsU0FBUyxDQUFDLElBQVk7UUFDbEIsSUFBSSxHQUFHLEdBQUcsK0JBQStCLEVBQ3JDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLEVBQUU7WUFDbEQsR0FBRyxHQUFHLGdDQUFnQyxDQUFDO1NBQzFDO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7WUFDbkQsR0FBRyxHQUFHLHVCQUF1QixDQUFDO1lBQzlCLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDekI7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFMUIsYUFBYTtRQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN0QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM5QyxNQUFNLFVBQVUsR0FBRyxLQUFLO2dCQUNwQixVQUFVO2lCQUNULE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO2lCQUN0QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXRCLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O2dCQUN0RCxPQUFPLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUNBQUksR0FBRyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2YsS0FBSyxFQUNMLFVBQVUsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FDbkQsQ0FBQzthQUNMO2lCQUFNO2dCQUNILElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNmLEtBQUssRUFDTCxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQzVDLENBQUM7YUFDTDtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKIn0=