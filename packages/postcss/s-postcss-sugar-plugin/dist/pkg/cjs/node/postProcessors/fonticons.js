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
const path_2 = require("@coffeekraken/sugar/path");
const path_3 = require("@coffeekraken/sugar/path");
const fantasticon_1 = require("fantasticon");
const fs_2 = __importDefault(require("fs"));
const oslllo_svg_fixer_1 = __importDefault(require("oslllo-svg-fixer"));
const path_4 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
function default_1({ root, sharedData, settings }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new s_duration_1.default();
        // fontawesome
        if (sharedData.isFontawesomeNeeded) {
            root.nodes.unshift(postcss_1.default.parse(`
                @import url('${s_sugar_config_1.default.get('icons.fontawesome.url')}');
            `));
        }
        if (!sharedData.icons || !sharedData.icons.length)
            return;
        const fantasticonConfig = s_sugar_config_1.default.get('icons.fantasticon');
        // prepend the icons import
        const importFontUrl = path_4.default.relative((0, path_3.__srcCssDir)(), fantasticonConfig.outputDir);
        root.nodes.unshift(postcss_1.default.parse(`
        @import url(${importFontUrl}/${fantasticonConfig.name}.css);
    `));
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
        // // fix svg's just to be sure
        // const svgIcons = __fs.readdirSync(inputDir);
        // for (let i = 0; i < svgIcons.length; i++) {
        //     const fullSvgIconPath = `${inputDir}/${svgIcons[i]}`;
        //     const svgIconStr = __fs
        //         .readFileSync(fullSvgIconPath, 'utf-8')
        //         .toString();
        //     const outlinedSvgIconStr = await __svgOutlineStroke(svgIconStr);
        //     __fs.writeFileSync(fullSvgIconPath, outlinedSvgIconStr);
        // }
        const fixResult = yield (0, oslllo_svg_fixer_1.default)(inputDir, inputDir).fix();
        const result = yield (0, fantasticon_1.generateFonts)({
            inputDir,
            outputDir: fantasticonConfig.outputDir,
            fontsUrl: `/${path_4.default.relative((0, path_2.__packageRootDir)(), fantasticonConfig.serveFontsDir)}`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGtGQUEwRDtBQUMxRCwrQ0FLZ0M7QUFDaEMsbURBQTZEO0FBQzdELG1EQUE0RDtBQUM1RCxtREFBdUQ7QUFDdkQsNkNBQTRDO0FBQzVDLDRDQUFzQjtBQUN0Qix3RUFBMEM7QUFDMUMsZ0RBQTBCO0FBQzFCLHNEQUFnQztBQUVoQyxtQkFBK0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTs7UUFDekQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFFbkMsY0FBYztRQUNkLElBQUksVUFBVSxDQUFDLG1CQUFtQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNkLGlCQUFTLENBQUMsS0FBSyxDQUFDOytCQUNHLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQzdELENBQUMsQ0FDTCxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFMUQsTUFBTSxpQkFBaUIsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWxFLDJCQUEyQjtRQUMzQixNQUFNLGFBQWEsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUNqQyxJQUFBLGtCQUFXLEdBQUUsRUFDYixpQkFBaUIsQ0FBQyxTQUFTLENBQzlCLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDZCxpQkFBUyxDQUFDLEtBQUssQ0FBQztzQkFDRixhQUFhLElBQUksaUJBQWlCLENBQUMsSUFBSTtLQUN4RCxDQUFDLENBQ0QsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLEdBQUcsSUFBQSx3QkFBaUIsR0FBRSxt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