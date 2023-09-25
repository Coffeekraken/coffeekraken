"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const __prettier = __importStar(require("prettier"));
/**
 * @name                SCodeFormatterPrettier
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 * @private
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
        // 'shell',
        // 'sh',
        // 'bash',
    ],
    languagesToExtensionsMap: {
    // shell: 'sh',
    // bash: 'sh',
    },
    format(code, metas) {
        const prettierConfig = s_sugar_config_1.default.get('prettier');
        let filePathForPrettier = metas.filePath;
        if (this.languagesToExtensionsMap[metas.extension]) {
            filePathForPrettier = filePathForPrettier.replace(/\.[a-zA-Z0-9]+$/, `.${this.languagesToExtensionsMap[metas.extension]}`);
        }
        const formattedCode = __prettier.format(code, Object.assign(Object.assign({}, prettierConfig), { filepath: filePathForPrettier }));
        return {
            code: formattedCode,
        };
    },
};
exports.default = formatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxrRkFBMEQ7QUFDMUQscURBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLFNBQVMsR0FBNkI7SUFDeEMsRUFBRSxFQUFFLFVBQVU7SUFDZCxVQUFVLEVBQUU7UUFDUixJQUFJO1FBQ0osS0FBSztRQUNMLElBQUk7UUFDSixLQUFLO1FBQ0wsTUFBTTtRQUNOLEtBQUs7UUFDTCxNQUFNO1FBQ04sTUFBTTtRQUNOLElBQUk7UUFDSixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxNQUFNO1FBQ04sV0FBVztRQUNYLFFBQVE7UUFDUixVQUFVO0tBQ2I7SUFDRCx3QkFBd0IsRUFBRTtJQUN0QixlQUFlO0lBQ2YsY0FBYztLQUNqQjtJQUNELE1BQU0sQ0FDRixJQUFZLEVBQ1osS0FBb0M7UUFFcEMsTUFBTSxjQUFjLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEQsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoRCxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQzdDLGlCQUFpQixFQUNqQixJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FDdkQsQ0FBQztTQUNMO1FBRUQsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGtDQUNyQyxjQUFjLEtBQ2pCLFFBQVEsRUFBRSxtQkFBbUIsSUFDL0IsQ0FBQztRQUNILE9BQU87WUFDSCxJQUFJLEVBQUUsYUFBYTtTQUN0QixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUM7QUFDRixrQkFBZSxTQUFTLENBQUMifQ==