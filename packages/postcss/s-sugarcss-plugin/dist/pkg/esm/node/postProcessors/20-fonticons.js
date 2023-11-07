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
import { __ensureDirSync, __extension, __folderHashSync, __writeFileSync, } from '@coffeekraken/sugar/fs';
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
        // if (sourceStr.match(/Font Awesome/)) {
        if (__SEnv.is('verbose')) {
            console.log('<yellow>[FontAwesome]</yellow> Fontawesome has been addedd <green>successfully</green>');
        }
        root.nodes.unshift(__postcss.parse(`
                @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
            `));
        // }
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
        const folderHash = __folderHashSync(inputDir);
        // use cache only if the target is  "vite"
        const hashCacheFilePath = `${__packageCacheDir()}/postcss/iconsFolderHash.txt`;
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
        yield __svgFixer(inputDir, inputDir).fix();
        const result = yield generateFonts({
            inputDir,
            outputDir: fantasticonConfig.outputDir,
            fontsUrl: `/${__path.relative(__packageRootDir(), fantasticonConfig.serveFontsDir)}`,
            name: fantasticonConfig.name,
            normalize: true,
            selector: '.s-icon',
            prefix: '-',
        });
        // read folder icons
        const iconsFilenames = __fs.readdirSync(inputDir);
        if (!iconsFilenames.length)
            return;
        // generate the scoped icons selector
        const iconsSelectorsArrayBefore = [], iconsSelectorsArray = [];
        iconsFilenames.forEach((filename) => {
            iconsSelectorsArrayBefore.push(`.s-icon-${filename.replace(/\.svg$/, '')}:before`);
            iconsSelectorsArray.push(`.s-icon-${filename.replace(/\.svg$/, '')}`);
        });
        const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
        let cssStr = __fs.readFileSync(cssPath, 'utf8').toString();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFDSCxlQUFlLEVBQ2YsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixlQUFlLEdBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNILGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsV0FBVyxHQUNkLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxVQUFVLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxNQUFNLENBQUMsT0FBTyxXQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOztRQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ25DLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVsQyxTQUFTLGNBQWM7WUFDbkIsTUFBTSxRQUFRLEdBQUcsSUFBSTtpQkFDaEIsWUFBWSxDQUNULEdBQUcsaUJBQWlCLENBQUMsU0FBUyxJQUFJLGlCQUFpQixDQUFDLElBQUksTUFBTSxDQUNqRTtpQkFDQSxRQUFRLEVBQUUsQ0FBQztZQUVoQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFD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