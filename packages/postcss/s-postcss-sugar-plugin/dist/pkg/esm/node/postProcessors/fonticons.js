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
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __srcCssDir from '@coffeekraken/sugar/node/path/srcCssDir';
import { generateFonts } from 'fantasticon';
import __fs from 'fs';
import __svgFixer from 'oslllo-svg-fixer';
import __path from 'path';
import __postcss from 'postcss';
export default function ({ root, sharedData, settings }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new __SDuration();
        // fontawesome
        if (sharedData.isFontawesomeNeeded) {
            root.nodes.unshift(__postcss.parse(`
                @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
            `));
        }
        if (!sharedData.icons || !sharedData.icons.length)
            return;
        const fantasticonConfig = __SSugarConfig.get('icons.fantasticon');
        // prepend the icons import
        const importFontUrl = __path.relative(__srcCssDir(), fantasticonConfig.outputDir);
        root.nodes.unshift(__postcss.parse(`
        @import url(${importFontUrl}/${fantasticonConfig.name}.css);
    `));
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
        // fix svg's just to be sure
        const fixResult = yield __svgFixer(inputDir, inputDir).fix();
        const result = yield generateFonts({
            inputDir,
            outputDir: fantasticonConfig.outputDir,
            fontsUrl: `/${__path.relative(__packageRoot(), fantasticonConfig.serveFontsDir)}`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8saUJBQWlCLE1BQU0sK0NBQStDLENBQUM7QUFDOUUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0seUNBQXlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxVQUFVLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOztRQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRW5DLGNBQWM7UUFDZCxJQUFJLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDZCxTQUFTLENBQUMsS0FBSyxDQUFDOytCQUNHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDN0QsQ0FBQyxDQUNMLENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFN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