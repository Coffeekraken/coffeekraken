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
import __prependToFileSync from '@coffeekraken/sugar/node/fs/prependToFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __detectProjectType from '@coffeekraken/sugar/node/project/detectType';
import __fs from 'fs';
import __SSugarToolkitParamsInterface from './interface/SSugarToolkitParamsInterface';
export default (stringArgs = '') => {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = __SSugarToolkitParamsInterface.apply(stringArgs);
        const rootPath = __packageRoot(process.cwd());
        const projectType = __detectProjectType(rootPath);
        emit('log', {
            value: `<yellow>${projectType.type}</yellow> project detected in version <cyan>${projectType.version}</cyan>`,
        });
        // installing the actual package
        emit('log', {
            value: `Installing the actual <cyan>@coffeekraken/sugar</cyan>...`,
        });
        try {
            yield pipe(__npmInstall('@coffeekraken/sugar'));
        }
        catch (e) {
            emit('log', {
                value: `Something went wrong when installing the @coffeekraken/sugar package. Please try to install it manually.`,
            });
        }
        // pleasant css syntax
        if (yield emit('ask', {
            type: 'confirm',
            message: `Add the <yellow>pleasant css syntax</yellow> support`,
            default: true,
        })) {
            switch (projectType.type) {
                case 'next':
                    console.log('adding to next');
                    // adding the js needed
                    __fs.writeFileSync(`${rootPath}/pages/_sugar.ts`, [
                        `import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';`,
                        `if (typeof window === 'object') {`,
                        `   __expandPleasantCssClassnamesLive();`,
                        `}`,
                    ].join('\n'));
                    // adding the≤ import in the _app.tsx file
                    __prependToFileSync(`${rootPath}/pages/_app.tsx`, ["import './_sugar';"].join('\n'));
                    break;
            }
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLG1CQUFtQixNQUFNLCtDQUErQyxDQUFDO0FBQ2hGLE9BQU8sWUFBWSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sbUJBQW1CLE1BQU0sNkNBQTZDLENBQUM7QUFDOUUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sOEJBQThCLE1BQU0sMENBQTBDLENBQUM7QUFFdEYsZUFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELE1BQU0sV0FBVyxHQUFHLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyRSxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDOUMsTUFBTSxXQUFXLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSxXQUFXLFdBQVcsQ0FBQyxJQUFJLCtDQUErQyxXQUFXLENBQUMsT0FBTyxTQUFTO1NBQ2hILENBQUMsQ0FBQztRQUVILGdDQUFnQztRQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLDJEQUEyRDtTQUNyRSxDQUFDLENBQUM7UUFDSCxJQUFJO1lBQ0EsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztTQUNuRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsMEdBQTBHO2FBQ3BILENBQUMsQ0FBQztTQUNOO1FBRUQsc0JBQXNCO1FBQ3RCLElBQ0ksTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUsc0RBQXNEO1lBQy9ELE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUMsRUFDSjtZQUNFLFFBQVEsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDdEIsS0FBSyxNQUFNO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDOUIsdUJBQXVCO29CQUN2QixJQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsUUFBUSxrQkFBa0IsRUFDN0I7d0JBQ0ksOEdBQThHO3dCQUM5RyxtQ0FBbUM7d0JBQ25DLHlDQUF5Qzt3QkFDekMsR0FBRztxQkFDTixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZixDQUFDO29CQUNGLDBDQUEwQztvQkFDMUMsbUJBQW1CLENBQ2YsR0FBRyxRQUFRLGlCQUFpQixFQUM1QixDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNwQyxDQUFDO29CQUNGLE1BQU07YUFDYjtTQUNKO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDIn0=