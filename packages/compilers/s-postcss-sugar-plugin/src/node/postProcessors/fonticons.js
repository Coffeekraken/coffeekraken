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
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __srcCssDir from '@coffeekraken/sugar/node/path/srcCssDir';
import { generateFonts } from 'fantasticon';
import __svgFixer from 'oslllo-svg-fixer';
import __fs from 'fs';
import __path from 'path';
import __postcss from 'postcss';
export default function ({ root, sharedData }) {
    return __awaiter(this, void 0, void 0, function* () {
        const duration = new __SDuration();
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
        // handle cached hash
        const hashCacheFilePath = `${__packageCacheDir()}/postcss/iconsFolderHash.txt`;
        if (__fs.existsSync(hashCacheFilePath)) {
            const cachedFolderHash = __fs
                .readFileSync(hashCacheFilePath, 'utf8')
                .toString();
            if (cachedFolderHash === folderHash) {
                // same icons, nothing to generate again
                console.log(`<green>[fonticons]</green> All icon(s) are up to date`);
                return;
            }
        }
        console.log(`<yellow>[fonticons]</yellow> Generate icons font...`);
        // fix svg's just to be sure
        const fixResult = yield __svgFixer(inputDir, inputDir).fix();
        const result = yield generateFonts({
            inputDir,
            outputDir: fantasticonConfig.outputDir,
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
        __writeFileSync(hashCacheFilePath, folderHash);
        console.log(`<green>[fonticons]</green> Sugar fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udGljb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9udGljb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBRWhFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8saUJBQWlCLE1BQU0sK0NBQStDLENBQUM7QUFFOUUsT0FBTyxXQUFXLE1BQU0seUNBQXlDLENBQUM7QUFFbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLFVBQVUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7O1FBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxPQUFPO1FBRTFELE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWxFLDJCQUEyQjtRQUMzQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUNqQyxXQUFXLEVBQUUsRUFDYixpQkFBaUIsQ0FBQyxTQUFTLENBQzlCLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8s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