"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const SScssCompiler_1 = __importDefault(require("../../../../scss/SScssCompiler"));
const tmpDir_1 = __importDefault(require("../../../../fs/tmpDir"));
exports.default = {
    name: 'esbuildScssLoaderPlugin',
    setup(build) {
        // Load ".txt" files and return an array of words
        build.onLoad({ filter: /\.scss$/ }, async (args) => {
            let text = await fs_1.default.promises.readFile(args.path, 'utf8');
            const filePath = `${tmpDir_1.default()}/esbuildScssLoaderPlugin.scss`;
            fs_1.default.writeFileSync(filePath, text);
            const compiler = new SScssCompiler_1.default({
                sharedResources: [],
                prod: true
            });
            const resultObj = await compiler.compile(filePath);
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
        });
    }
};
