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
export default function ({ root, sharedData }) {
    const duration = new __SDuration();
    const dirName = typeof root.source.input.file === 'string'
        ? __path.dirname(root.source.input.file)
        : __dirname;
    if (!sharedData.iconsSourcePaths || sharedData.iconsSourcePaths.indexOf(dirName) === -1)
        return;
    if (!sharedData.iconsInputDir)
        return;
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
                __fs.rmdirSync(sharedData.iconsInputDir, { recursive: true });
            }
            catch (e) { }
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
    }
    catch (e) {
        throw new Error(e);
    }
    // read folder icons
    const iconsFilenames = __fs.readdirSync(sharedData.iconsInputDir);
    if (!iconsFilenames.length)
        return;
    // generate the scoped icons selector
    const iconsSelectorsArray = [];
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
        __fs.rmdirSync(sharedData.iconsInputDir, { recursive: true });
    }
    catch (e) { }
    console.log(`<green>[fonticons]</green> Sugar fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udGljb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9udGljb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8saUJBQWlCLE1BQU0sK0NBQStDLENBQUM7QUFDOUUsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLFdBQVcsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFFaEMsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7SUFFekMsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUVuQyxNQUFNLE9BQU8sR0FDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN4QyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRWhCLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLElBQUksVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBRSxPQUFPO0lBQ2hHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYTtRQUFFLE9B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