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
// import __svgFixer from 'oslllo-svg-fixer';
import __path from 'path';
import __postcss from 'postcss';

export default async function ({ root, sharedData, settings }) {
    const duration = new __SDuration();

    // fontawesome
    if (sharedData.isFontawesomeNeeded) {
        root.nodes.unshift(
            __postcss.parse(`
                @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
            `),
        );
    }

    if (!sharedData.icons || !sharedData.icons.length) return;

    const fantasticonConfig = __SSugarConfig.get('icons.fantasticon');

    // prepend the icons import
    const importFontUrl = __path.relative(
        __srcCssDir(),
        fantasticonConfig.outputDir,
    );

    root.nodes.unshift(
        __postcss.parse(`
        @import url(${importFontUrl}/${fantasticonConfig.name}.css);
    `),
    );

    const inputDir = `${__packageCacheDir()}/icons/sugarIcons`;

    // delete input folder
    try {
        __fs.rmSync(inputDir, { recursive: true });
    } catch (e) {}

    __ensureDirSync(inputDir);
    __ensureDirSync(fantasticonConfig.outputDir);

    // copy icons inside folder
    sharedData.icons.forEach((iconObj) => {
        __fs.copyFileSync(
            iconObj.path,
            `${inputDir}/${iconObj.as}.${__extension(iconObj.path)}`,
        );
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

    // const fixResult = await __svgFixer(inputDir, inputDir).fix();

    const result = await generateFonts({
        inputDir,
        outputDir: fantasticonConfig.outputDir,
        fontsUrl: `/${__path.relative(
            __packageRoot(),
            fantasticonConfig.serveFontsDir,
        )}`,
        name: fantasticonConfig.name,
        normalize: true,
        selector: '.s-icon',
        prefix: '--',
    });

    // read folder icons
    const iconsFilenames = __fs.readdirSync(inputDir);

    if (!iconsFilenames.length) return;

    // generate the scoped icons selector
    const iconsSelectorsArrayBefore: string[] = [],
        iconsSelectorsArray: string[] = [];
    iconsFilenames.forEach((filename) => {
        iconsSelectorsArrayBefore.push(
            `.s-icon--${filename.replace(/\.svg$/, '')}:before`,
        );
        iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, '')}`);
    });

    const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
    let cssStr = __fs.readFileSync(cssPath, 'utf8').toString();

    // replace some parts in the output css
    cssStr = cssStr.replace(/\.s-icon\.--/gm, '.s-icon-');
    cssStr = cssStr.replace(
        /\.s-icon:before\s?{/,
        `${iconsSelectorsArrayBefore.join(',')} {\nposition: relative;\n`,
    );

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

    console.log(
        `<green>[fonticons]</green> Fonticons generated <green>successfully</green> in <cyan>${
            duration.end().formatedDuration
        }</cyan>`,
    );
}
