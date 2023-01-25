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
import __SEnv from '@coffeekraken/s-env';
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
        function injectIconsCss() {
            const iconsCss = __fs
                .readFileSync(`${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`)
                .toString();
            const iconsAst = __postcss.parse(`
            ${iconsCss !== null && iconsCss !== void 0 ? iconsCss : ''}
        `);
            iconsAst.walkRules((rule) => {
                // @ts-ignore
                rule._preventLod = true;
            });
            root.nodes.push(iconsAst);
        }
        // fontawesome
        if (sourceStr.match(/Font Awesome/)) {
            if (__SEnv.is('verbose')) {
                console.log('<yellow>[FontAwesome]</yellow> Fontawesome has been addedd <green>successfully</green>');
            }
            root.nodes.unshift(__postcss.parse(`
                @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
            `));
        }
        // make sure we have icons to generate
        if (!sourceStr.match(/S-SUGAR-FS-ICON:/)) {
            return;
        }
        // prepend the icons import
        const importFontUrl = __path.relative(__srcCssDir(), fantasticonConfig.outputDir);
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
                if (__SEnv.is('verbose')) {
                    console.log(`<green>[fonticons]</green> Fonticons are up to date`);
                }
                // inject css
                injectIconsCss();
                // stop here
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
        // inject css
        injectIconsCss();
        console.log(`<green>[fonticons]</green> Fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFDSCxlQUFlLEVBQ2YsV0FBVyxFQUNYLFlBQVksRUFDWixlQUFlLEdBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNILGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsV0FBVyxHQUNkLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxVQUFVLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOztRQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ25DLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVsQyxTQUFTLGNBQWM7WUFDbkIsTUFBTSxRQUFRLEdBQUcsSUFBSTtpQkFDaEIsWUFBWSxDQUNULEdBQUcsaUJBQWlCLENBQUMsU0FBUyxJQUFJLGlCQUFpQixDQUFDLElBQUksTUFBTSxDQUNqRTtpQkFDQSxRQUFRLEVBQUUsQ0FBQztZQUVoQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2NB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