"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 * @status              wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */
const fs_1 = __importDefault(require("fs"));
const SScssCompiler_1 = __importDefault(require("../../../../scss/SScssCompiler"));
const tmpDir_1 = __importDefault(require("../../../../fs/tmpDir"));
module.exports = {
    name: 'esbuildScssLoaderPlugin',
    setup(build) {
        // Load ".txt" files and return an array of words
        build.onLoad({ filter: /\.scss$/ }, (args) => __awaiter(this, void 0, void 0, function* () {
            let text = yield fs_1.default.promises.readFile(args.path, 'utf8');
            const filePath = `${tmpDir_1.default()}/esbuildScssLoaderPlugin.scss`;
            fs_1.default.writeFileSync(filePath, text);
            const compiler = new SScssCompiler_1.default({
                sharedResources: [],
                prod: true
            });
            const resultObj = yield compiler.compile(filePath);
            const outputCss = resultObj.css;
            const script = [
                'var css = `' + outputCss + '`,',
                `   $head = document.head || document.getElementsByTagName('head')[0],`,
                `   $style = document.createElement('style');`,
                `$head.appendChild($style);`,
                `if ($style.styleSheet){`,
                `   $style.styleSheet.cssText = css;`,
                `} else {`,
                `   $style.appendChild(document.createTextNode(css));`,
                `}`
            ].join('\n');
            return {
                contents: script,
                loader: 'js'
            };
        }));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNidWlsZFNjc3NMb2FkZXJQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlc2J1aWxkU2Nzc0xvYWRlclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUVkOzs7OztHQUtHO0FBRUgsNENBQXNCO0FBQ3RCLG1GQUE2RDtBQUM3RCxtRUFBNkM7QUFFN0MsaUJBQVM7SUFDUCxJQUFJLEVBQUUseUJBQXlCO0lBQy9CLEtBQUssQ0FBQyxLQUFLO1FBQ1QsaURBQWlEO1FBQ2pELEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtZQUNqRCxJQUFJLElBQUksR0FBRyxNQUFNLFlBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDM0QsTUFBTSxRQUFRLEdBQUcsR0FBRyxnQkFBUSxFQUFFLCtCQUErQixDQUFDO1lBQzlELFlBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRW5DLE1BQU0sUUFBUSxHQUFHLElBQUksdUJBQWUsQ0FBQztnQkFDbkMsZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFFaEMsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsYUFBYSxHQUFHLFNBQVMsR0FBRyxJQUFJO2dCQUNoQyx1RUFBdUU7Z0JBQ3ZFLDhDQUE4QztnQkFDOUMsNEJBQTRCO2dCQUM1Qix5QkFBeUI7Z0JBQ3pCLHFDQUFxQztnQkFDckMsVUFBVTtnQkFDVixzREFBc0Q7Z0JBQ3RELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUViLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2FBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyJ9