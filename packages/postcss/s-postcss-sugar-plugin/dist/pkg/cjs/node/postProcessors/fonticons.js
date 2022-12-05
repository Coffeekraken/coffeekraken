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
            console.log('<yellow>[FontAwesome]</yellow> Fontawesome has been addedd <green>successfully</green>');
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
                console.log(`<green>[fonticons]</green> Fonticons are up to date`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGtGQUEwRDtBQUMxRCwrQ0FLZ0M7QUFDaEMsbURBSWtDO0FBQ2xDLDZDQUE0QztBQUM1Qyw0Q0FBc0I7QUFDdEIsd0VBQTBDO0FBQzFDLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFFaEMsbUJBQStCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7O1FBQ3pELE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1FBQ25DLE1BQU0saUJBQWlCLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNsRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFbEMsY0FBYztRQUNkLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUNQLHdGQUF3RixDQUMzRixDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ2QsaUJBQVMsQ0FBQyxLQUFLLENBQUM7K0JBQ0csd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDN0QsQ0FBQyxDQUNMLENBQUM7U0FDTDtRQUVELDJCQUEyQjtRQUMzQixNQUFNLGFBQWEsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUNqQyxJQUFBLGtCQUFXLEdBQUUsRUFDYixpQkFBaUIsQ0FBQyxTQUFTLENBQzlCLENBQUM7UUFFRixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDZCxpQkFBUyxDQUFDLEtBQUssQ0FBQzswQkFDRixhQUFhLElBQUksaUJBQWlCLENBQUMsSUFBSTtTQUN4RCxDQUFDLENBQ0Qs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