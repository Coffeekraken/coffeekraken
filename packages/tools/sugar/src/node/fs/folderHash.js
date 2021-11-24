import __fs from 'fs';
import __sha256 from '../../shared/crypt/sha256';
import __isDirectory from '../is/directory';
import __fileHash from './fileHash';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default function folderHash(folderPath, settings = {}) {
    settings = __deepMerge({
        recursive: true,
        algo: 'sha256',
        digest: 'base64',
        include: {
            ctime: false,
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    const paths = [];
    function readDir(dir) {
        const files = __fs.readdirSync(dir);
        files.forEach((filePath) => {
            if (settings.recursive && __isDirectory(`${dir}/${filePath}`)) {
                return readDir(`${dir}/${filePath}`);
            }
            paths.push(`${dir}/${filePath}`);
        });
    }
    readDir(folderPath);
    const filesHashes = [];
    paths.forEach((path) => {
        if (__isDirectory(path))
            return;
        filesHashes.push(__fileHash(path, settings));
    });
    return __sha256.encrypt(filesHashes.join('-'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVySGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbGRlckhhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sUUFBUSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQXlDdEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQzlCLFVBQWtCLEVBQ2xCLFdBQXlDLEVBQUU7SUFFM0MsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxTQUFTLEVBQUUsSUFBSTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLFFBQVE7UUFDaEIsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLEtBQUs7U0FDZjtLQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO0lBRTNCLFNBQVMsT0FBTyxDQUFDLEdBQUc7UUFDaEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxRQUFRLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUMzRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVwQixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFFakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25CLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU87UUFDaEMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUMifQ==