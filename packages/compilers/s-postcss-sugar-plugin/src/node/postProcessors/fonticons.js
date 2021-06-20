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
import __srcCssDir from '@coffeekraken/sugar/node/path/srcCssDir';
export default function ({ root, sharedData }) {
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
    if (__fs.existsSync(hashCacheFilePath)) {
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
    }
    catch (e) {
        throw new Error(e);
    }
    // read folder icons
    const iconsFilenames = __fs.readdirSync(sharedData.iconsInputDir);
    // generate the scoped icons selector
    const iconsSelectorsArray = [];
    iconsFilenames.forEach(filename => {
        iconsSelectorsArray.push(`.s-icon--${filename.replace(/\.svg$/, '')}:before`);
    });
    // delete the temp icons folder for fresh new compilation
    try {
        __fs.rmdirSync(sharedData.iconsInputDir, { recursive: true });
    }
    catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udGljb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9udGljb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxZQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxpQkFBaUIsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RSxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFFaEMsT0FBTyxXQUFXLE1BQU0seUNBQXlDLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7SUFFekMsTUFBTSxPQUFPLEdBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtRQUMxQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDeEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUVoQixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixJQUFJLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQUUsT0FBTztJQUNoRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7UUFBRSxPQUFPO0lBRXRDLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRWxFLDJCQUEy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