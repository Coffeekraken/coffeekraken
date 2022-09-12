import __SInterface from '@coffeekraken/s-interface';
import { __fileName } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
class postcssSugarPluginIconFsMixinInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                type: 'String',
                required: true,
            },
            as: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginIconFsMixinInterface as interface };
export default function ({ params, atRule, replaceWith, sourcePath, sharedData, }) {
    const finalParams = Object.assign({ path: '', as: '' }, params);
    if (!sharedData.icons) {
        sharedData.icons = [];
    }
    let as = finalParams.as;
    if (!as) {
        as = __fileName(iconPath.split('.').slice(0, -1).join('.'));
    }
    // reading the icon file
    const potentialFilePathFromRoot = __path.resolve(__packageRootDir(), finalParams.path);
    const potentialFilePathFromFile = __path.resolve(sourcePath, finalParams.path);
    if (__fs.existsSync(potentialFilePathFromFile)) {
        sharedData.icons.push({
            path: potentialFilePathFromFile,
            as,
        });
    }
    else if (__fs.existsSync(potentialFilePathFromRoot)) {
        sharedData.icons.push({
            path: potentialFilePathFromRoot,
            as,
        });
    }
    else {
        throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`);
    }
    replaceWith([]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixVQUFVLEdBT2I7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixFQUFFLEVBQUUsRUFBRSxJQUNILE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDbkIsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDekI7SUFFRCxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDTCxFQUFFLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsd0JBQXdCO0lBQ3hCLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDNUMsZ0JBQWdCLEVBQUUsRUFDbEIsV0FBVyxDQUFDLElBQUksQ0FDbkIsQ0FBQztJQUNGLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDNUMsVUFBVSxFQUNWLFdBQVcsQ0FBQyxJQUFJLENBQ25CLENBQUM7SUFFRixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUM1QyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNsQixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLEVBQUU7U0FDTCxDQUFDLENBQUM7S0FDTjtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQ25ELFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsRUFBRTtTQUNMLENBQUMsQ0FBQztLQUNOO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDJGQUEyRixXQUFXLENBQUMsSUFBSSw0Q0FBNEMsQ0FDMUosQ0FBQztLQUNMO0lBRUQsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==