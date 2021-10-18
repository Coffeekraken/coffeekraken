import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __path from 'path';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
class postcssSugarPluginIconFsMixinInterface extends __SInterface {
}
postcssSugarPluginIconFsMixinInterface.definition = {
    path: {
        type: 'String',
        required: true,
    },
    as: {
        type: 'String',
        required: false,
    },
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sZ0JBQWdCLE1BQU0sOENBQThDLENBQUM7QUFJNUUsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFFOUQsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN0RCxpREFBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixVQUFVLEdBT2I7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixFQUFFLEVBQUUsRUFBRSxJQUNILE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDbkIsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDekI7SUFFRCxzQkFBc0I7SUFDdEIsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQztJQUN4QixJQUFJLENBQUMsRUFBRTtRQUNILEVBQUUsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRXhFLHdCQUF3QjtJQUN4QixNQUFNLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQzVDLGdCQUFnQixFQUFFLEVBQ2xCLFdBQVcsQ0FBQyxJQUFJLENBQ25CLENBQUM7SUFDRixNQUFNLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQzVDLFVBQVUsRUFDVixXQUFXLENBQUMsSUFBSSxDQUNuQixDQUFDO0lBRUYsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDNUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDbEIsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixFQUFFO1NBQ0wsQ0FBQyxDQUFDO0tBQ047U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUNuRCxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNsQixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLEVBQUU7U0FDTCxDQUFDLENBQUM7S0FDTjtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FDWCwyRkFBMkYsV0FBVyxDQUFDLElBQUksNENBQTRDLENBQzFKLENBQUM7S0FDTDtJQUVELFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=