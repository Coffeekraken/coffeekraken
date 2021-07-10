import __SDuration from '@coffeekraken/s-duration';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __srcCssDir from '@coffeekraken/sugar/node/path/srcCssDir';
import __childProcess from 'child_process';
import __fs from 'fs';
import __path from 'path';
import __postcss from 'postcss';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default function ({ root, sharedData }) {
    
    const duration = new __SDuration();

    const dirName =
        typeof root.source.input.file === 'string'
        ? __path.dirname(root.source.input.file)
        : __dirname();

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
    if (__fs.existsSync(hashCacheFilePath) && __fs.existsSync(sharedData.iconsInputDir)) {
        const hash = __folderHash(sharedData.iconsInputDir);
        const cachedHash = __fs.readFileSync(hashCacheFilePath, 'utf8').toString();
        // console.log('Dirname', dirName);
        // console.log('Hash', hash, 'Cached Hash', cachedHash);

        if (hash === cachedHash) {
            // delete the temp icons folder for fresh new compilation
            try {
                __fs.rmSync(sharedData.iconsInputDir, { recursive: true});
            } catch(e) {}
            // console.log(`<cyan>[fonticons]</cyan> No need to regenerate icons font`);            
            return;
        }
    }

    __ensureDirSync(fantasticonConfig.outputDir);

    try {

        console.log(`<yellow>[fonticons]</yellow> Generate icons font...`);

        __childProcess.execSync(`npx fantasticon -o ${fantasticonConfig.outputDir} -n ${fantasticonConfig.name} --normalize --selector .s-icon --prefix '--' ${sharedData.iconsInputDir}`, {
            stdio: 'pipe',
            cwd: __packageRootDir()
        });
    } catch(e) {
        throw new Error(e);
    }

    // read folder icons
    const iconsFilenames = __fs.readdirSync(sharedData.iconsInputDir);

    if (!iconsFilenames.length) return;

    // generate the scoped icons selector
    const iconsSelectorsArray: string[] = [];
    iconsFilenames.forEach(filename => {
        iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, '')}:before`);
    });

    const cssPath = `${fantasticonConfig.outputDir}/${fantasticonConfig.name}.css`;
    let cssStr = __fs.readFileSync(cssPath, 'utf8').toString();

    // replace some parts in the output css
    cssStr = cssStr.replace(/\.s-icon\.--/gm, '.s-icon-');
    cssStr = cssStr.replace(/\.s-icon:before\s?{/, `${iconsSelectorsArray.join(',')} {\nposition: relative;\ntop: 0.1em;`);

    // rewrite the css file
    __fs.writeFileSync(cssPath, cssStr);

    // saving folder hash
    const folderHash = __folderHash(sharedData.iconsInputDir);
    __writeFileSync(hashCacheFilePath, folderHash);

    // delete the temp icons folder for fresh new compilation
    try {
        __fs.rmSync(sharedData.iconsInputDir, { recursive: true});
    } catch(e) {}

    console.log(`<green>[fonticons]</green> Sugar fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);

}
