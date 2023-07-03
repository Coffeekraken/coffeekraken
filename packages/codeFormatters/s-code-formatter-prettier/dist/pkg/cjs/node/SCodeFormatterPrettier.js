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
        'shell',
        'sh',
        'bash',
    ],
    languagesToExtensionsMap: {
        shell: 'sh',
        bash: 'sh',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxrRkFBMEQ7QUFDMUQscURBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLFNBQVMsR0FBNkI7SUFDeEMsRUFBRSxFQUFFLFVBQVU7SUFDZCxVQUFVLEVBQUU7UUFDUixJQUFJO1FBQ0osS0FBSztRQUNMLElBQUk7UUFDSixLQUFLO1FBQ0wsTUFBTTtRQUNOLEtBQUs7UUFDTCxNQUFNO1FBQ04sTUFBTTtRQUNOLElBQUk7UUFDSixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxNQUFNO1FBQ04sT0FBTztRQUNQLElBQUk7UUFDSixNQUFNO0tBQ1Q7SUFDRCx3QkFBd0IsRUFBRTtRQUN0QixLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxJQUFJO0tBQ2I7SUFDRCxNQUFNLENBQ0YsSUFBWSxFQUNaLEtBQW9DO1FBRXBDLE1BQU0sY0FBYyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDaEQsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUM3QyxpQkFBaUIsRUFDakIsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ3ZELENBQUM7U0FDTDtRQUVELE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxrQ0FDckMsY0FBYyxLQUNqQixRQUFRLEVBQUUsbUJBQW1CLElBQy9CLENBQUM7UUFDSCxPQUFPO1lBQ0gsSUFBSSxFQUFFLGFBQWE7U0FDdEIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDO0FBQ0Ysa0JBQWUsU0FBUyxDQUFDIn0=