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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @status              wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */
const fs_1 = __importDefault(require("fs"));
const SScssCompiler_1 = __importDefault(require("../../../../scss/SScssCompiler"));
const tmpDir_1 = __importDefault(require("../../../../fs/tmpDir"));
exports.default = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNidWlsZFNjc3NMb2FkZXJQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlc2J1aWxkU2Nzc0xvYWRlclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZDs7Ozs7R0FLRztBQUVILDRDQUFzQjtBQUN0QixtRkFBNkQ7QUFDN0QsbUVBQTZDO0FBRTdDLGtCQUFlO0lBQ2IsSUFBSSxFQUFFLHlCQUF5QjtJQUMvQixLQUFLLENBQUMsS0FBSztRQUNULGlEQUFpRDtRQUNqRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7WUFDakQsSUFBSSxJQUFJLEdBQUcsTUFBTSxZQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNELE1BQU0sUUFBUSxHQUFHLEdBQUcsZ0JBQVEsRUFBRSwrQkFBK0IsQ0FBQztZQUM5RCxZQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVuQyxNQUFNLFFBQVEsR0FBRyxJQUFJLHVCQUFlLENBQUM7Z0JBQ25DLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixJQUFJLEVBQUUsSUFBSTthQUNYLENBQUMsQ0FBQztZQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRCxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1lBRWhDLE1BQU0sTUFBTSxHQUFHO2dCQUNiLGFBQWEsR0FBRyxTQUFTLEdBQUcsSUFBSTtnQkFDaEMsdUVBQXVFO2dCQUN2RSw4Q0FBOEM7Z0JBQzlDLDRCQUE0QjtnQkFDNUIseUJBQXlCO2dCQUN6QixxQ0FBcUM7Z0JBQ3JDLFVBQVU7Z0JBQ1Ysc0RBQXNEO2dCQUN0RCxHQUFHO2FBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFYixPQUFPO2dCQUNMLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixNQUFNLEVBQUUsSUFBSTthQUNiLENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMifQ==