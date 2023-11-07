"use strict";
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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fantasticon_1 = require("fantasticon");
const fs_2 = __importDefault(require("fs"));
const oslllo_svg_fixer_1 = __importDefault(require("oslllo-svg-fixer"));
const path_2 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
function default_1({ root, sharedData, settings }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new s_duration_1.default();
        const fantasticonConfig = s_sugar_config_1.default.get('icons.fantasticon');
        const sourceStr = root.toString();
        function injectIconsCss() {
            const iconsCss = fs_2.default
                .readFileSync(`${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`)
                .toString();
            const iconsAst = postcss_1.default.parse(`
            ${iconsCss !== null && iconsCss !== void 0 ? iconsCss : ''}
        `);
            iconsAst.walkRules((rule) => {
                // @ts-ignore
                rule._preventLod = true;
            });
            root.nodes.push(iconsAst);
        }
        // fontawesome
        // if (sourceStr.match(/Font Awesome/)) {
        if (s_env_1.default.is('verbose')) {
            console.log('<yellow>[FontAwesome]</yellow> Fontawesome has been addedd <green>successfully</green>');
        }
        root.nodes.unshift(postcss_1.default.parse(`
                @import url('${s_sugar_config_1.default.get('icons.fontawesome.url')}');
            `));
        // }
        // make sure we have icons to generate
        if (!sourceStr.match(/S-SUGAR-FS-ICON:/)) {
            return;
        }
        // prepend the icons import
        const importFontUrl = path_2.default.relative((0, path_1.__srcCssDir)(), fantasticonConfig.outputDir);
        if (!sharedData.icons || !sharedData.icons.length)
            return;
        const inputDir = `${(0, path_1.__packageCacheDir)()}/icons/sugarIcons`;
        // delete input folder
        try {
            fs_2.default.rmSync(inputDir, { recursive: true });
        }
        catch (e) { }
        (0, fs_1.__ensureDirSync)(inputDir);
        (0, fs_1.__ensureDirSync)(fantasticonConfig.outputDir);
        // copy icons inside folder
        sharedData.icons.forEach((iconObj) => {
            fs_2.default.copyFileSync(iconObj.path, `${inputDir}/${iconObj.as}.${(0, fs_1.__extension)(iconObj.path)}`);
        });
        // get actual folder hash
        const folderHash = (0, fs_1.__folderHashSync)(inputDir);
        // use cache only if the target is  "vite"
        const hashCacheFilePath = `${(0, path_1.__packageCacheDir)()}/postcss/iconsFolderHash.txt`;
        // // if (settings.target === 'vite') {
        // // handle cached hash
        // if (__fs.existsSync(hashCacheFilePath)) {
        //     const cachedFolderHash = __fs
        //         .readFileSync(hashCacheFilePath, 'utf8')
        //         .toString();
        //     if (cachedFolderHash === folderHash) {
        //         // same icons, nothing to generate again
        //         if (__SEnv.is('verbose')) {
        //             console.log(
        //                 `<green>[fonticons]</green> Fonticons are up to date`,
        //             );
        //         }
        //         // inject css
        //         injectIconsCss();
        //         // stop here
        //         return;
        //     }
        // }
        // // }
        console.log(`<yellow>[fonticons]</yellow> Generate fonticons...`);
        yield (0, oslllo_svg_fixer_1.default)(inputDir, inputDir).fix();
        const result = yield (0, fantasticon_1.generateFonts)({
            inputDir,
            outputDir: fantasticonConfig.outputDir,
            fontsUrl: `/${path_2.default.relative((0, path_1.__packageRootDir)(), fantasticonConfig.serveFontsDir)}`,
            name: fantasticonConfig.name,
            normalize: true,
            selector: '.s-icon',
            prefix: '-',
        });
        // read folder icons
        const iconsFilenames = fs_2.default.readdirSync(inputDir);
        if (!iconsFilenames.length)
            return;
        // generate the scoped icons selector
        const iconsSelectorsArrayBefore = [], iconsSelectorsArray = [];
        iconsFilenames.forEach((filename) => {
            iconsSelectorsArrayBefore.push(`.s-icon-${filename.replace(/\.svg$/, '')}:before`);
            iconsSelectorsArray.push(`.s-icon-${filename.replace(/\.svg$/, '')}`);
        });
        const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
        let cssStr = fs_2.default.readFileSync(cssPath, 'utf8').toString();
        // adding font-display: swap;
        cssStr = cssStr.replace(/@font-face\s?\{/, '@font-face {\nfont-display: swap;\n');
        // replace some parts in the output css
        cssStr = cssStr.replace(/\.s-icon\.-/gm, '.s-icon-');
        cssStr = cssStr.replace(/\.s-icon:before\s?{/, `${iconsSelectorsArrayBefore.join(',')} {\nposition: relative;\n`);
        cssStr += [
            `${iconsSelectorsArray.join(',')} {`,
            'display: inline-block;',
            'line-height: 1;',
            'width: 1em;',
            'height:1em;',
            'vertical-align: middle;',
            '}',
        ].join('\n');
        // rewrite the css file
        fs_2.default.writeFileSync(cssPath, cssStr);
        // saving folder hash
        if (settings.target === 'vite') {
            (0, fs_1.__writeFileSync)(hashCacheFilePath, folderHash);
        }
        // inject css
        injectIconsCss();
        console.log(`<green>[fonticons]</green> Fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGdFQUF5QztBQUN6QyxrRkFBMEQ7QUFDMUQsK0NBS2dDO0FBQ2hDLG1EQUlrQztBQUNsQyw2Q0FBNEM7QUFDNUMsNENBQXNCO0FBQ3RCLHdFQUEwQztBQUMxQyxnREFBMEI7QUFDMUIsc0RBQWdDO0FBRWhDLG1CQUErQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOztRQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztRQUNuQyxNQUFNLGlCQUFpQixHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWxDLFNBQVMsY0FBYztZQUNuQixNQUFNLFFBQVEsR0FBRyxZQUFJO2lCQUNoQixZQUFZLENBQ1QsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLElBQUksaUJBQWlCLENBQUMsSUFBSSxNQUFNLENBQ2pFO2lCQUNBLFFBQVEsRUFBRSxDQUFDO1lBRWhCLE1BQU0sUUFBUSxHQUFHLGlCQUFTLENBQUMsS0FBSyxDQUFDO2NBQzNCLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUU7U0FDbkIsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN4QixhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELGNBQWM7UUFDZCx5Q0FBeUM7UUFDekMsSUFBSSxlQUFNLENBQUMsRUFBRSxDQUFDLFNB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