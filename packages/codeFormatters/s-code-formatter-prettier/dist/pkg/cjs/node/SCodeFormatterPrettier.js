"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const prettier_1 = __importDefault(require("prettier"));
/**
 * @name                SCodeFormatterPrettier
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @status              wip
 *
 * This represent the prettier code formatter. It will format things like js, jsx, ts, tsx, json, css, less, scss, md, vue, hbs, php and html
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const formatter = {
    id: 'prettier',
    extensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'css',
        'less',
        'scss',
        'md',
        'vue',
        'hbs',
        'php',
        'html',
    ],
    format(code, metas) {
        const prettierConfig = s_sugar_config_1.default.get('prettier');
        const formattedCode = prettier_1.default.format(code, Object.assign(Object.assign({}, prettierConfig), { filepath: metas.filePath }));
        return {
            code: formattedCode,
        };
    },
};
exports.default = formatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0Esa0ZBQTBEO0FBQzFELHdEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sU0FBUyxHQUE2QjtJQUN4QyxFQUFFLEVBQUUsVUFBVTtJQUNkLFVBQVUsRUFBRTtRQUNSLElBQUk7UUFDSixLQUFLO1FBQ0wsSUFBSTtRQUNKLEtBQUs7UUFDTCxNQUFNO1FBQ04sS0FBSztRQUNMLE1BQU07UUFDTixNQUFNO1FBQ04sSUFBSTtRQUNKLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLE1BQU07S0FDVDtJQUNELE1BQU0sQ0FDRixJQUFZLEVBQ1osS0FBb0M7UUFFcEMsTUFBTSxjQUFjLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEQsTUFBTSxhQUFhLEdBQUcsa0JBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxrQ0FDckMsY0FBYyxLQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFDMUIsQ0FBQztRQUNILE9BQU87WUFDSCxJQUFJLEVBQUUsYUFBYTtTQUN0QixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUM7QUFDRixrQkFBZSxTQUFTLENBQUMifQ==