import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
class postcssSugarPluginAssetPlatformInterface extends __SInterface {
}
postcssSugarPluginAssetPlatformInterface.definition = {
    platform: {
        type: 'String',
        values: ['js', 'node', 'ts'],
        required: true
    }
};
export { postcssSugarPluginAssetPlatformInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ platform: '' }, params);
    const vars = [];
    if (!__fs.readFileSync(`${__dirname}/platforms/${finalParams.platform}.svg`)) {
        throw new Error(`<red>[s-postcss-sugar-plugin]</red> Sorry but the requested platform "<yellow>${finalParams.platform}</yellow>" does not exists...`);
    }
    const svgStr = __fs.readFileSync(`${__dirname}/platforms/${finalParams.platform}.svg`, 'utf8');
    vars.push(`
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,${__base64.encrypt(svgStr)}");
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUlyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFFL0QsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHO0lBQ2hCLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLENBQUM7UUFDNUIsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNKLENBQUM7QUFPSixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixRQUFRLEVBQUUsRUFBRSxJQUNULE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxjQUFjLFdBQVcsQ0FBQyxRQUFRLE1BQU0sQ0FBQyxFQUFFO1FBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUZBQWlGLFdBQVcsQ0FBQyxRQUFRLCtCQUErQixDQUFDLENBQUM7S0FDeko7SUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxjQUFjLFdBQVcsQ0FBQyxRQUFRLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUUvRixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7dURBTTJDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0dBQzVFLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=