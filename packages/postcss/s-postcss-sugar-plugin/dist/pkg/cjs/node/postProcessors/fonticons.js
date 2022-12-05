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
        // fontawesome
        if (sourceStr.match(/Font Awesome/)) {
            if (s_env_1.default.is('verbose')) {
                console.log('<yellow>[FontAwesome]</yellow> Fontawesome has been addedd <green>successfully</green>');
            }
            root.nodes.unshift(postcss_1.default.parse(`
                @import url('${s_sugar_config_1.default.get('icons.fontawesome.url')}');
            `));
        }
        // prepend the icons import
        const importFontUrl = path_2.default.relative((0, path_1.__srcCssDir)(), fantasticonConfig.outputDir);
        if (sourceStr.match(/S-SUGAR-FS-ICON:/)) {
            root.nodes.unshift(postcss_1.default.parse(`
            @import url(${importFontUrl}/${fantasticonConfig.name}.css);
        `));
        }
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
        const folderHash = (0, fs_1.__folderHash)(inputDir);
        // use cache only if the target is  "vite"
        const hashCacheFilePath = `${(0, path_1.__packageCacheDir)()}/postcss/iconsFolderHash.txt`;
        // if (settings.target === 'vite') {
        // handle cached hash
        if (fs_2.default.existsSync(hashCacheFilePath)) {
            const cachedFolderHash = fs_2.default
                .readFileSync(hashCacheFilePath, 'utf8')
                .toString();
            if (cachedFolderHash === folderHash) {
                // same icons, nothing to generate again
                if (s_env_1.default.is('verbose')) {
                    console.log(`<green>[fonticons]</green> Fonticons are up to date`);
                }
                return;
            }
        }
        // }
        console.log(`<yellow>[fonticons]</yellow> Generate fonticons...`);
        yield (0, oslllo_svg_fixer_1.default)(inputDir, inputDir).fix();
        const result = yield (0, fantasticon_1.generateFonts)({
            inputDir,
            outputDir: fantasticonConfig.outputDir,
            fontsUrl: `/${path_2.default.relative((0, path_1.__packageRootDir)(), fantasticonConfig.serveFontsDir)}`,
            name: fantasticonConfig.name,
            normalize: true,
            selector: '.s-icon',
            prefix: '--',
        });
        // read folder icons
        const iconsFilenames = fs_2.default.readdirSync(inputDir);
        if (!iconsFilenames.length)
            return;
        // generate the scoped icons selector
        const iconsSelectorsArrayBefore = [], iconsSelectorsArray = [];
        iconsFilenames.forEach((filename) => {
            iconsSelectorsArrayBefore.push(`.s-icon--${filename.replace(/\.svg$/, '')}:before`);
            iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, '')}`);
        });
        const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
        let cssStr = fs_2.default.readFileSync(cssPath, 'utf8').toString();
        // adding font-display: swap;
        cssStr = cssStr.replace(/@font-face\s?\{/, '@font-face {\nfont-display: swap;\n');
        // replace some parts in the output css
        cssStr = cssStr.replace(/\.s-icon\.--/gm, '.s-icon-');
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
        console.log(`<green>[fonticons]</green> Fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGdFQUF5QztBQUN6QyxrRkFBMEQ7QUFDMUQsK0NBS2dDO0FBQ2hDLG1EQUlrQztBQUNsQyw2Q0FBNEM7QUFDNUMsNENBQXNCO0FBQ3RCLHdFQUEwQztBQUMxQyxnREFBMEI7QUFDMUIsc0RBQWdDO0FBRWhDLG1CQUErQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOztRQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztRQUNuQyxNQUFNLGlCQUFpQixHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWxDLGNBQWM7UUFDZCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDakMsSUFBSSxlQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUNQLHdGQUF3RixDQUMzRixDQUFDO2FBQ0w7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDZCxpQkFBUyxDQUFDLEtBQUssQ0FBQzsrQkFDRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUM3RCxDQUFDLENBQ0wsQ0FBQztTQUNMO1FBRUQsMkJBQTJCO1FBQzNCLE1BQU0sYUFBYSxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQ2pDLElBQUEsa0JBQVcsR0FBRSxFQUNiLGlCQUFpQixDQUFDLFNBQVMsQ0FDOUIsQ0FBQztRQUVGLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNkLGlCQUFT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