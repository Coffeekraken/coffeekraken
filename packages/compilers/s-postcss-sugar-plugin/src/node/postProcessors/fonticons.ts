import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __childProcess from 'child_process';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __fs from 'fs';
import __path from 'path';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __postcss from 'postcss';
import __distIconsDir from '@coffeekraken/sugar/node/path/distIconsDir';
import __srcCssDir from '@coffeekraken/sugar/node/path/srcCssDir';

export default function ({ root, sharedData }) {
    
    const dirName =
        typeof root.source.input.file === 'string'
        ? __path.dirname(root.source.input.file)
        : __dirname;

    if (!sharedData.iconsSourcePaths || sharedData.iconsSourcePaths.indexOf(dirName) === -1) return;
    if (!sharedData.iconsInputDir) return;
    
    const fantasticonConfig = __SSugarConfig.get('icons.fantasticon');

    // prepend the icons import
    const importFontUrl = __path.relative(__srcCssDir(), fantasticonConfig.outputDir);
    root.nodes.unshift(__postcss.parse(`
        @import url(${importFontUrl}/${fantasticonConfig.name}.css);
    `));

    // handle cached hash
    const hashCacheFilePath = `${__packageCacheDir()}/postcss/iconsFolderHash.txt`;
    if (__fs.existsSync(hashCacheFilePath)) {
        const hash = __folderHash(sharedData.iconsInputDir);
        const cachedHash = __fs.readFileSync(hashCacheFilePath, 'utf8').toString();
        // console.log('Dirname', dirName);
        // console.log('Hash', hash, 'Cached Hash', cachedHash);

        if (hash === cachedHash) {
            // delete the temp icons folder for fresh new compilation
            try {
                __fs.rmdirSync(sharedData.iconsInputDir, { recursive: true});
            } catch(e) {}
            console.log(`<cyan>[icons]</cyan> No need to regenerate icons font`);
            return;
        }
    }

    __ensureDirSync(fantasticonConfig.outputDir);

    try {

        console.log(`<yellow>[icons]</yellow> Generate icons font`);

        __childProcess.execSync(`npx fantasticon -o ${fantasticonConfig.outputDir} -n ${fantasticonConfig.name} --normalize --selector .s-icon --prefix '--' ${sharedData.iconsInputDir}`, {
            stdio: 'pipe',
            cwd: __packageRootDir()
        });
    } catch(e) {
        throw new Error(e);
    }

    // read folder icons
    const iconsFilenames = __fs.readdirSync(sharedData.iconsInputDir);

    // generate the scoped icons selector
    const iconsSelectorsArray: string[] = [];
    iconsFilenames.forEach(filename => {
        iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, '')}:before`);
    });

    // delete the temp icons folder for fresh new compilation
    try {
        __fs.rmdirSync(sharedData.iconsInputDir, { recursive: true});
    } catch(e) {}

    const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
    let cssStr = __fs.readFileSync(cssPath, 'utf8').toString();

    // replace some parts in the output css
    cssStr = cssStr.replace(/\.s-icon\.--/gm, '.s-icon-');
    cssStr = cssStr.replace('.s-icon:before', iconsSelectorsArray.join(','));

    // rewrite the css file
    __fs.writeFileSync(cssPath, cssStr);

    // saving folder hash
    const folderHash = __folderHash(sharedData.iconsInputDir);
    __writeFileSync(hashCacheFilePath, folderHash);

    // console.log('res', res);

}
