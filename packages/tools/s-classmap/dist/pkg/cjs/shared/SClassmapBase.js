"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
class SClassmapBase extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({
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
exports.default = SClassmapBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyx1REFBeUQ7QUE2QnpELE1BQXFCLGFBQWMsU0FBUSxpQkFBUTtJQVkvQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTBDO1FBQ2xELEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxJQUFJLEVBQUUsU0FBUztZQUNmLEdBQUcsRUFBRSxTQUFTO1NBQ2pCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRix3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsb0NBQW9DO0lBQ3BDLGtDQUFrQztJQUNsQyxJQUFJO0lBRUo7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxTQUFTLENBQUMsSUFBWTtRQUNsQixJQUFJLEdBQUcsR0FBRywrQkFBK0IsRUFDckMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsRUFBRTtZQUNsRCxHQUFHLEdBQUcsZ0NBQWdDLENBQUM7U0FDMUM7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsRUFBRTtZQUNuRCxHQUFHLEdBQUcsdUJBQXVCLENBQUM7WUFDOUIsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUN6QjtRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPLElBQUksQ0FBQztRQUUxQixhQUFhO1FBQ2IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzlDLE1BQU0sVUFBVSxHQUFHLEtBQUs7Z0JBQ3BCLFVBQVU7aUJBQ1QsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdEIsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7Z0JBQ3RELE9BQU8sTUFBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLGFBQWEsRUFBRTtnQkFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDZixLQUFLLEVBQ0wsVUFBVSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUNuRCxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2YsS0FBSyxFQUNMLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FDNUMsQ0FBQzthQUNMO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUE5R0QsZ0NBOEdDIn0=