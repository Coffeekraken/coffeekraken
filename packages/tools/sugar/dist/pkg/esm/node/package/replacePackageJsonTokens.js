import __flatten from '../../shared/object/flatten';
import __packageJsonSync from './packageJsonSync';
export default function __replacePackageJsonTokens(string, settings) {
    const set = Object.assign({}, settings);
    // search for tokens
    const tokensMatches = string.match(/%packageJson\.[a-zA-Z0-9\.]+;?/gm);
    if (!tokensMatches)
        return string;
    const packageJson = __packageJsonSync();
    const flatPackageJson = __flatten(packageJson, {
        array: true,
    });
    tokensMatches.forEach((match) => {
        const dotPath = match.replace(/^%packageJson\./, '').replace(/;$/, '');
        const value = flatPackageJson[dotPath];
        if (value === undefined)
            return;
        // @ts-ignore
        string = string.replaceAll(match, value);
    });
    return string;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLDZCQUE2QixDQUFDO0FBQ3BELE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUEwQmxELE1BQU0sQ0FBQyxPQUFPLFVBQVUsMEJBQTBCLENBQzlDLE1BQWMsRUFDZCxRQUFxRDtJQUVyRCxNQUFNLEdBQUcsR0FBRyxrQkFDTCxRQUFRLENBQ2QsQ0FBQztJQUVGLG9CQUFvQjtJQUNwQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFFdkUsSUFBSSxDQUFDLGFBQWE7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUVsQyxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUU7UUFDM0MsS0FBSyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7SUFFSCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQUUsT0FBTztRQUNoQyxhQUFhO1FBQ2IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9