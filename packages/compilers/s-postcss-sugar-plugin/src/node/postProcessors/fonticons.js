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
    const dirName = typeof root.source.input.file === 'string'
        ? __path.dirname(root.source.input.file)
        : __dirname();
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
                __fs.rmSync(sharedData.iconsInputDir, { recursive: true });
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
        __fs.rmSync(sharedData.iconsInputDir, { recursive: true });
    }
    catch (e) { }
    console.log(`<green>[fonticons]</green> Sugar fonticons generated <green>successfully</green> in <cyan>${duration.end().formatedDuration}</cyan>`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udGljb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9udGljb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8saUJBQWlCLE1BQU0sK0NBQStDLENBQUM7QUFDOUUsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLFdBQVcsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7SUFFekMsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUVuQyxNQUFNLE9BQU8sR0FDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN4QyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsSUFBSSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFFLE9BQU87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