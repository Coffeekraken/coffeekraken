import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __path from 'path';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
class postcssSugarPluginIconFsMixinInterface extends __SInterface {
}
postcssSugarPluginIconFsMixinInterface.definition = {
    path: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginIconFsMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ path: '' }, params);
    const dirName = typeof atRule.source.input.file === 'string'
        ? __path.dirname(atRule.source.input.file)
        : __dirname;
    // reading the icon file
    const potentialFilePathFromRoot = __path.resolve(__packageRoot(), finalParams.path);
    const potentialFilePathFromFile = __path.resolve(dirName, finalParams.path);
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
    //   svgStr = svgStr.replace('</svg>', `<style> path { fill: currentColor; }</style></svg>`)
    //   console.log(svgStr);
    const vars = [];
    //   vars.push(`
    //     background-image: url("data:image/svg+xml;base64,${__base64.encrypt(svgStr)}");
    //     background-size: contain;
    //     background-position: center;
    //     width: 1em; height: 1em;
    //     display: inline-block;
    //     -webkit-filter: invert(100%) brightness(50%) sepia(1) hue-rotate(132deg) saturate(103.2%) brightness(91.2%);
    //     filter: invert(100%) brightness(50%) sepia(1) hue-rotate(132deg) saturate(103.2%) brightness(91.2%);
    //   `)
    const pathD = svgStr.match(/\sd=".*"/);
    if (!pathD) {
        throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" is not compatible with the icon system. It MUST be a file with a unique <path d="..." /> inside`);
    }
    const path = pathD[0].replace(/\sd=/, '');
    vars.push(`
    clip-path: path(${path});
    display: inline-block;
    background: currentColor;
    width: 1em; height: 1em;
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBR3RFLE1BQU0sc0NBQXVDLFNBQVEsWUFBWTs7QUFDeEQsaURBQVUsR0FBRztJQUNoQixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQU9KLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxFQUFFLElBQ0wsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLE9BQU8sR0FDWCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMxQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRWhCLHdCQUF3QjtJQUN4QixNQUFNLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BGLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVFLElBQUksTUFBTSxDQUFDO0lBRVgsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7UUFDOUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDL0Q7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFBRTtRQUNyRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUMvRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywyRkFBMkYsV0FBVyxDQUFDLElBQUksNENBQTRDLENBQUMsQ0FBQztLQUM1SztJQUVILDRGQUE0RjtJQUU1Rix5QkFBeUI7SUFFdkIsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTVCLGdCQUFnQjtJQUNoQixzRkFBc0Y7SUFDdEYsZ0NBQWdDO0lBQ2hDLG1DQUFtQztJQUNuQywrQkFBK0I7SUFDL0IsNkJBQTZCO0lBQzdCLG1IQUFtSDtJQUNuSCwyR0FBMkc7SUFDM0csT0FBTztJQUVMLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFdkMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsMkZBQTJGLFdBQVcsQ0FBQyxJQUFJLDBHQUEwRyxDQUFDLENBQUM7S0FDeE87SUFFRCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUcxQyxJQUFJLENBQUMsSUFBSSxDQUFDO3NCQUNVLElBQUk7Ozs7R0FJdkIsQ0FBQyxDQUFDO0lBR0gsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==