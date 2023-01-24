import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import {
    __ensureDirSync,
    __extension,
    __folderHash,
    __writeFileSync,
} from '@coffeekraken/sugar/fs';
import {
    __packageCacheDir,
    __packageRootDir,
    __srcCssDir,
} from '@coffeekraken/sugar/path';
import { generateFonts } from 'fantasticon';
import __fs from 'fs';
import __svgFixer from 'oslllo-svg-fixer';
import __path from 'path';
import __postcss from 'postcss';

export default async function ({ root, sharedData, settings }) {
    const duration = new __SDuration();
    const fantasticonConfig = __SSugarConfig.get('icons.fantasticon');
    const sourceStr = root.toString();

    function injectIconsCss() {
        const iconsCss = __fs
            .readFileSync(
                `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`,
            )
            .toString();

        const iconsAst = __postcss.parse(`
            ${iconsCss ?? ''}
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
            console.log(
                '<yellow>[FontAwesome]</yellow> Fontawesome has been addedd <green>successfully</green>',
            );
        }
        root.nodes.unshift(
            __postcss.parse(`
                @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
            `),
        );
    }

    // make sure we have icons to generate
    if (!sourceStr.match(/S-SUGAR-FS-ICON:/)) {
        return;
    }

    // prepend the icons import
    const importFontUrl = __path.relative(
        __srcCssDir(),
        fantasticonConfig.outputDir,
    );

    if (!sharedData.icons || !sharedData.icons.length) return;

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
            if (__SEnv.is('verbose')) {
                console.log(
                    `<green>[fonticons]</green> Fonticons are up to date`,
                );
            }

            // inject css
            injectIconsCss();

            // stop here
            return;
        }
    }
    // }

    console.log(`<yellow>[fonticons]</yellow> Generate fonticons...`);

    await __svgFixer(inputDir, inputDir).fix();

    const result = await generateFonts({
        inputDir,
        outputDir: fantasticonConfig.outputDir,
        fontsUrl: `/${__path.relative(
            __packageRootDir(),
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

    // adding font-display: swap;
    cssStr = cssStr.replace(
        /@font-face\s?\{/,
        '@font-face {\nfont-display: swap;\n',
    );

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

    // inject css
    injectIconsCss();

    console.log(
        `<green>[fonticons]</green> Fonticons generated <green>successfully</green> in <cyan>${
            duration.end().formatedDuration
        }</cyan>`,
    );
}
