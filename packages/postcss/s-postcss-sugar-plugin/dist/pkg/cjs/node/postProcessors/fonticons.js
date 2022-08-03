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
const ensureDirSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/ensureDirSync"));
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const folderHash_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderHash"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const packageCacheDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageCacheDir"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const srcCssDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/srcCssDir"));
const fantasticon_1 = require("fantasticon");
const fs_1 = __importDefault(require("fs"));
const oslllo_svg_fixer_1 = __importDefault(require("oslllo-svg-fixer"));
const path_1 = __importDefault(require("path"));
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
        const importFontUrl = path_1.default.relative((0, srcCssDir_1.default)(), fantasticonConfig.outputDir);
        root.nodes.unshift(postcss_1.default.parse(`
        @import url(${importFontUrl}/${fantasticonConfig.name}.css);
    `));
        const inputDir = `${(0, packageCacheDir_1.default)()}/icons/sugarIcons`;
        // delete input folder
        try {
            fs_1.default.rmSync(inputDir, { recursive: true });
        }
        catch (e) { }
        (0, ensureDirSync_1.default)(inputDir);
        (0, ensureDirSync_1.default)(fantasticonConfig.outputDir);
        // copy icons inside folder
        sharedData.icons.forEach((iconObj) => {
            fs_1.default.copyFileSync(iconObj.path, `${inputDir}/${iconObj.as}.${(0, extension_1.default)(iconObj.path)}`);
        });
        // get actual folder hash
        const folderHash = (0, folderHash_1.default)(inputDir);
        // use cache only if the target is  "vite"
        const hashCacheFilePath = `${(0, packageCacheDir_1.default)()}/postcss/iconsFolderHash.txt`;
        // if (settings.target === 'vite') {
        // handle cached hash
        if (fs_1.default.existsSync(hashCacheFilePath)) {
            const cachedFolderHash = fs_1.default
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
        // fix svg's just to be sure
        const fixResult = yield (0, oslllo_svg_fixer_1.default)(inputDir, inputDir).fix();
        const result = yield (0, fantasticon_1.generateFonts)({
            inputDir,
            outputDir: fantasticonConfig.outputDir,
            fontsUrl: `/${path_1.default.relative((0, packageRoot_1.default)(), fantasticonConfig.serveFontsDir)}`,
            name: fantasticonConfig.name,
            normalize: true,
            selector: '.s-icon',
            prefix: '--',
        });
        // read folder icons
        const iconsFilenames = fs_1.default.readdirSync(inputDir);
        if (!iconsFilenames.length)
            return;
        // generate the scoped icons selector
        const iconsSelectorsArrayBefore = [], iconsSelectorsArray = [];
        iconsFilenames.forEach((filename) => {
            iconsSelectorsArrayBefore.push(`.s-icon--${filename.replace(/\.svg$/, '')}:before`);
            iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, '')}`);
        });
        const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
        let cssStr = fs_1.default.readFileSync(cssPath, 'utf8').toString();
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
        fs_1.default.writeFileSync(cssPath, cssStr);
        // saving folder hash
        if (settings.target === 'vite') {
            (0, writeFileSync_1.default)(hashCacheFilePath, folderHash);
        }
        console.log(`<green>[fonticons]</green> Fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGtGQUEwRDtBQUMxRCw4RkFBd0U7QUFDeEUsc0ZBQWdFO0FBQ2hFLHdGQUFrRTtBQUNsRSw4RkFBd0U7QUFDeEUsb0dBQThFO0FBQzlFLDRGQUFzRTtBQUN0RSx3RkFBa0U7QUFDbEUsNkNBQTRDO0FBQzVDLDRDQUFzQjtBQUN0Qix3RUFBMEM7QUFDMUMsZ0RBQTBCO0FBQzFCLHNEQUFnQztBQUVoQyxtQkFBK0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTs7UUFDekQsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFFbkMsY0FBYztRQUNkLElBQUksVUFBVSxDQUFDLG1CQUFtQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNkLGlCQUFTLENBQUMsS0FBSyxDQUFDOytCQUNHLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQzdELENBQUMsQ0FDTCxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFMUQsTUFBTSxpQkFBaUIsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWxFLDJCQUEyQjtRQUMzQixNQUFNLGFBQWEsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUNqQyxJQUFBLG1CQUFXLEdBQUUsRUFDYixpQkFBaUIsQ0FBQyxTQUFTLENBQzlCLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDZCxpQkFBUyxDQUFDLEtBQUssQ0FBQztzQkFDRixhQUFhLElBQUksaUJBQWlCLENBQUMsSUFBSTtLQUN4RCxDQUFDLENBQ0QsQ0FBQztRQUVG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