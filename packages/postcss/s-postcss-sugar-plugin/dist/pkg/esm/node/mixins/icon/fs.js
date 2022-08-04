import __SInterface from '@coffeekraken/s-interface';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtRQUNuQixVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUN6QjtJQUVELElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNMLEVBQUUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7SUFFRCx3QkFBd0I7SUFDeEIsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUM1QyxhQUFhLEVBQUUsRUFDZixXQUFXLENBQUMsSUFBSSxDQUNuQixDQUFDO0lBQ0YsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUM1QyxVQUFVLEVBQ1YsV0FBVyxDQUFDLElBQUksQ0FDbkIsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1FBQzVDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsRUFBRTtTQUNMLENBQUMsQ0FBQztLQUNOO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDbkQsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDbEIsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixFQUFFO1NBQ0wsQ0FBQyxDQUFDO0tBQ047U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQ1gsMkZBQTJGLFdBQVcsQ0FBQyxJQUFJLDRDQUE0QyxDQUMxSixDQUFDO0tBQ0w7SUFFRCxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9