import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __path from 'path';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
class postcssSugarPluginIconFsMixinInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            path: {
                type: 'String',
                required: true,
            },
            as: {
                type: 'String',
                required: false,
            },
        }));
    }
}
export { postcssSugarPluginIconFsMixinInterface as interface };
export default function ({ params, atRule, replaceWith, sourcePath, sharedData, }) {
    const finalParams = Object.assign({ path: '', as: '' }, params);
    if (!sharedData.icons) {
        sharedData.icons = [];
    }
    // generating the "as"
    let as = finalParams.as;
    if (!as)
        as = __fileName(finalParams.path.split('.').slice(0, -1).join('.'));
    // reading the icon file
    const potentialFilePathFromRoot = __path.resolve(__packageRoot(), finalParams.path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBSXRFLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBRTlELE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssVUFBVTs7UUFDakIsT0FBTyxDQUNILE1BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQ0FDYixJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ1AsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsRUFBRSxFQUFFO2dCQUNBLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxLQUFLO2FBQ2xCO1NBQ0osQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQ1YsVUFBVSxHQU9iO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsRUFBRSxFQUFFLEVBQUUsSUFDSCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO1FBQ25CLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ3pCO0lBRUQsc0JBQXNCO0lBQ3RCLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLEVBQUU7UUFDSCxFQUFFLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV4RSx3QkFBd0I7SUFDeEIsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUM1QyxhQUFhLEVBQUUsRUFDZixXQUFXLENBQUMsSUFBSSxDQUNuQixDQUFDO0lBQ0YsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUM1QyxVQUFVLEVBQ1YsV0FBVyxDQUFDLElBQUksQ0FDbkIsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQzVDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsRUFBRTtTQUNMLENBQUMsQ0FBQztLQUNOO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDbkQsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDbEIsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixFQUFFO1NBQ0wsQ0FBQyxDQUFDO0tBQ047U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQ1gsMkZBQTJGLFdBQVcsQ0FBQyxJQUFJLDRDQUE0QyxDQUMxSixDQUFDO0tBQ0w7SUFFRCxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9