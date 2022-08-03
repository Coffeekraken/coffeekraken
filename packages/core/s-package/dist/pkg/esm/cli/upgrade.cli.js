var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SCliMonoListParamsInterface from '../node/interface/SCliMonoListParamsInterface';
import __SGlob from '@coffeekraken/s-glob';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __fs from 'fs';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SCliMonoListParamsInterface.apply(stringArgs);
        const root = __packageRoot(process.cwd(), {
            highest: true,
        });
        const rootPackageJson = __readJsonSync(`${root}/package.json`);
        const files = __SGlob.resolve(finalParams.packagesGlobs, {
            cwd: root,
        });
        emit('log', {
            value: `Upgrading <cyan>${files.length}</cyan> packages with these informations:`,
        });
        emit('log', {
            marginBottom: 1,
            value: [
                `- <yellow>Version</yellow>: <cyan>${rootPackageJson.version}</cyan>`,
            ].join('\n'),
        });
        files.forEach((file) => {
            finalParams.filesToUpgrade.forEach((fileName) => {
                if (!fileName.match(/\.json$/)) {
                    throw new Error(`Only json files are supported for the upgrade process for now...`);
                }
                const filePath = `${file.dirPath}/${fileName}`;
                if (!__fs.existsSync(filePath))
                    return;
                const json = __readJsonSync(filePath);
                if (json.version === rootPackageJson.version) {
                    emit('log', {
                        value: `<yellow>${json.name}</yellow> <cyan>${fileName}</cyan> already up to date`,
                    });
                    return;
                }
                json.version = rootPackageJson.version;
                __writeJsonSync(filePath, json);
                emit('log', {
                    value: `<green>✓</green> <yellow>${json.name}</yellow> <cyan>${fileName}</cyan> upgraded <green>successfully</green>`,
                });
            });
        });
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLDZCQUE2QixNQUFNLCtDQUErQyxDQUFDO0FBQzFGLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxXQUFXLEdBQUcsNkJBQTZCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdEMsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQztRQUUvRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDckQsR0FBRyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLG1CQUFtQixLQUFLLENBQUMsTUFBTSwyQ0FBMkM7U0FDcEYsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLFlBQVksRUFBRSxDQUFDO1lBQ2YsS0FBSyxFQUFFO2dCQUNILHFDQUFxQyxlQUFlLENBQUMsT0FBTyxTQUFTO2FBQ3hFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNmLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQixXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrRUFBa0UsQ0FDckUsQ0FBQztpQkFDTDtnQkFDRCxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztvQkFBRSxPQUFPO2dCQUN2QyxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxlQUFlLENBQUMsT0FBTyxFQUFFO29CQUMxQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSxXQUFXLElBQUksQ0FBQyxJQUFJLG1CQUFtQixRQUFRLDRCQUE0QjtxQkFDckYsQ0FBQyxDQUFDO29CQUNILE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO2dCQUN2QyxlQUFlLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw0QkFBNEIsSUFBSSxDQUFDLElBQUksbUJBQW1CLFFBQVEsOENBQThDO2lCQUN4SCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=