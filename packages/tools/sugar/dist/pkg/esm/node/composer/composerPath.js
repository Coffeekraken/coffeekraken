import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge.js';
import __packageRootDir from '../path/packageRootDir.js';
export default function composerPath(name, settings) {
    const set = __deepMerge({
        cwd: process.cwd(),
        monorepo: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    let monoDir;
    monoDir = `${__packageRootDir(set.cwd, {
        highest: true,
    })}/vendor`;
    // if the package.json exists in rootDir node_modules folder
    if (__fs.existsSync(`${set.cwd}/vendor/${name}/composer.json`)) {
        return __fs.realpathSync(`${set.cwd}/vendor/${name}`);
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.cwd) &&
        __fs.existsSync(`${monoDir}/${name}/composer.json`)) {
        return __fs.realpathSync(`${monoDir}/${name}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLGdCQUFnQixNQUFNLDJCQUEyQixDQUFDO0FBOEJ6RCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FDaEMsSUFBWSxFQUNaLFFBQXlDO0lBRXpDLE1BQU0sR0FBRyxHQUEwQixXQUFXLENBQzFDO1FBQ0ksR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDakIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sQ0FBQztJQUVaLE9BQU8sR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDbkMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxTQUFTLENBQUM7SUFFWiw0REFBNEQ7SUFDNUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsV0FBVyxJQUFJLGdCQUFnQixDQUFDLEVBQUU7UUFDNUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQsSUFDSSxHQUFHLENBQUMsUUFBUTtRQUNaLE9BQU8sTUFBSyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsR0FBRyxDQUFBO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxFQUNyRDtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2xEO0FBQ0wsQ0FBQyJ9