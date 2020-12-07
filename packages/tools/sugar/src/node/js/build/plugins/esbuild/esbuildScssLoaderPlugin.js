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
 * @wip
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
//# sourceMappingURL=esbuildScssLoaderPlugin.js.map