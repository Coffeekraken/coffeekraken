var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDuration from '@coffeekraken/s-duration';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __ensureDirSync, __extension, __folderHash, __writeFileSync, } from '@coffeekraken/sugar/fs';
import { __packageCacheDir, __packageRootDir, __srcCssDir, } from '@coffeekraken/sugar/path';
import { generateFonts } from 'fantasticon';
import __fs from 'fs';
import __svgFixer from 'oslllo-svg-fixer';
import __path from 'path';
import __postcss from 'postcss';
export default function ({ root, sharedData, settings }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new __SDuration();
        const fantasticonConfig = __SSugarConfig.get('icons.fantasticon');
        const sourceStr = root.toString();
        // fontawesome
        if (sourceStr.match(/Font Awesome/)) {
            console.log('<yellow>[FontAwesome]</yellow> Fontawesome has been addedd <green>successfully</green>');
            root.nodes.unshift(__postcss.parse(`
                @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
            `));
        }
        // prepend the icons import
        const importFontUrl = __path.relative(__srcCssDir(), fantasticonConfig.outputDir);
        if (sourceStr.match(/S-SUGAR-FS-ICON:/)) {
            root.nodes.unshift(__postcss.parse(`
            @import url(${importFontUrl}/${fantasticonConfig.name}.css);
        `));
        }
        if (!sharedData.icons || !sharedData.icons.length)
            return;
        const inputDir = `${__packageCacheDir()}/icons/sugarIcons`;
        // delete input folder
        try {
            __fs.rmSync(inputDir, { recursive: true });
        }
        catch (e) { }
        __ensureDirSync(inputDir);
        __ensureDirSync(fantasticonConfig.outputDir);
        // copy icons inside folder
        sharedData.icons.forEach((iconObj) => {
            __fs.copyFileSync(iconObj.path, `${inputDir}/${iconObj.as}.${__extension(iconObj.path)}`);
        });
        // get actual folder hash
        const folderHash = __folderHash(inputDir);
        // use cache only if the target is  "vite"
        const hashCacheFilePath = `${__packageCacheDir()}/postcss/iconsFolderHash.txt`;
        // if (settings.target === 'vite') {
        // handle cached hash
        if (__fs.existsSync(hashCacheFilePath)) {
            const cachedFolderHash = __fs
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
        yield __svgFixer(inputDir, inputDir).fix();
        const result = yield generateFonts({
            inputDir,
            outputDir: fantasticonConfig.outputDir,
            fontsUrl: `/${__path.relative(__packageRootDir(), fantasticonConfig.serveFontsDir)}`,
            name: fantasticonConfig.name,
            normalize: true,
            selector: '.s-icon',
            prefix: '--',
        });
        // read folder icons
        const iconsFilenames = __fs.readdirSync(inputDir);
        if (!iconsFilenames.length)
            return;
        // generate the scoped icons selector
        const iconsSelectorsArrayBefore = [], iconsSelectorsArray = [];
        iconsFilenames.forEach((filename) => {
            iconsSelectorsArrayBefore.push(`.s-icon--${filename.replace(/\.svg$/, '')}:before`);
            iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, '')}`);
        });
        const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
        let cssStr = __fs.readFileSync(cssPath, 'utf8').toString();
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
        __fs.writeFileSync(cssPath, cssStr);
        // saving folder hash
        if (settings.target === 'vite') {
            __writeFileSync(hashCacheFilePath, folderHash);
        }
        console.log(`<green>[fonticons]</green> Fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFDSCxlQUFlLEVBQ2YsV0FBVyxFQUNYLFlBQVksRUFDWixlQUFlLEdBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNILGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsV0FBVyxHQUNkLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxVQUFVLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOztRQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ25DLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVsQyxjQUFjO1FBQ2QsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQ1Asd0ZBQXdGLENBQzNGLENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDZCxTQUFTLENBQUMsS0FBSyxDQUFDOytCQUNHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDN0QsQ0FBQyxDQUNMLENB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