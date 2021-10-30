import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default function configValue(path) {
    if (typeof path !== 'string')
        return path;
    return path.replace(`${__packageRoot()}/`, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWdWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUV0RSxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FBQyxJQUFZO0lBQzVDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLGFBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkQsQ0FBQyJ9