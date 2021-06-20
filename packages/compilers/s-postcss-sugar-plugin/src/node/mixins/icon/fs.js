import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __path from 'path';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
class postcssSugarPluginIconFsMixinInterface extends __SInterface {
}
postcssSugarPluginIconFsMixinInterface.definition = {
    path: {
        type: 'String',
        required: true
    },
    as: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginIconFsMixinInterface as interface };
export default function ({ params, atRule, replaceWith, sourcePath, sharedData }) {
    const finalParams = Object.assign({ path: '', as: '' }, params);
    const tmpDirPath = `${__packageTmpDir()}/postcss/icons`;
    if (!sharedData.iconsSourcePaths) {
        sharedData.iconsSourcePaths = [];
    }
    if (!sharedData.iconsInputDir) {
        sharedData.iconsInputDir = tmpDirPath;
        try {
            __fs.rmdirSync(tmpDirPath, { recursive: true });
        }
        catch (e) { }
    }
    // const dirName =
    //   typeof atRule.source.input.file === 'string'
    //     ? __path.dirname(atRule.source.input.file)
    //     : __dirname;
    if (sharedData.iconsSourcePaths.indexOf(sourcePath) === -1) {
        sharedData.iconsSourcePaths.push(sourcePath);
    }
    // reading the icon file
    const potentialFilePathFromRoot = __path.resolve(__packageRootDir(), finalParams.path);
    const potentialFilePathFromFile = __path.resolve(sourcePath, finalParams.path);
    let svgStr;
    if (__fs.existsSync(potentialFilePathFromFile)) {
        svgStr = __fs.readFileSync(potentialFilePathFromFile, 'utf8');
    }
    else if (__fs.existsSync(potentialFilePathFromRoot)) {
        svgStr = __fs.readFileSync(potentialFilePathFromRoot, 'utf8');
    }
    else {
        throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`);
    }
    const tmpFilePath = `${tmpDirPath}/${finalParams.as}.svg`;
    // write the svg into the temp postcss icons folder
    // that will be handled by the "fonticon" postProcessor
    __writeFileSync(tmpFilePath, svgStr);
    replaceWith([]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sZ0JBQWdCLE1BQU0sOENBQThDLENBQUM7QUFFNUUsT0FBTyxlQUFlLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFFeEUsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQVFKLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixVQUFVLEVBT1g7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsSUFBSSxFQUFFLEVBQUUsRUFDUixFQUFFLEVBQUUsRUFBRSxJQUNILE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUcsR0FBRyxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7SUFFeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtRQUNoQyxVQUFVLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQ2xDO0lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7UUFDN0IsVUFBVSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7UUFDdEMsSUFBSTtZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0tBQ2Y7SUFFRCxrQkFBa0I7SUFDbEIsaURBQWlEO0lBQ2pELGlEQUFpRDtJQUNqRCxtQkFBbUI7SUFFbkIsSUFBSSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUM7SUFFRCx3QkFBd0I7SUFDeEIsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZGLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9FLElBQUksTUFBTSxDQUFDO0lBRVgsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDOUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDL0Q7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUNyRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUMvRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywyRkFBMkYsV0FBVyxDQUFDLElBQUksNENBQTRDLENBQUMsQ0FBQztLQUM1SztJQUVELE1BQU0sV0FBVyxHQUFHLEdBQUcsVUFBVSxJQUFJLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQztJQUUxRCxtREFBbUQ7SUFDbkQsdURBQXVEO0lBQ3ZELGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFckMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xCLENBQUMifQ==