import __packageJson from './jsonSync';
import __flatten from '../../shared/object/flatten';
export default function replacePackageJsonTokens(string, settings) {
    const set = Object.assign({}, settings);
    // search for tokens
    const tokensMatches = string.match(/%packageJson\.[a-zA-Z0-9\.]+;?/gm);
    if (!tokensMatches)
        return string;
    const packageJson = __packageJson();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhY2thZ2VKc29uVG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVwbGFjZVBhY2thZ2VKc29uVG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLFlBQVksQ0FBQztBQUN2QyxPQUFPLFNBQVMsTUFBTSw2QkFBNkIsQ0FBQztBQXdCcEQsTUFBTSxDQUFDLE9BQU8sVUFBVSx3QkFBd0IsQ0FDNUMsTUFBYyxFQUNkLFFBQXFEO0lBRXJELE1BQU0sR0FBRyxHQUFHLGtCQUNMLFFBQVEsQ0FDZCxDQUFDO0lBRUYsb0JBQW9CO0lBQ3BCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUV2RSxJQUFJLENBQUMsYUFBYTtRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRWxDLE1BQU0sV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUU7UUFDM0MsS0FBSyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7SUFFSCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQUUsT0FBTztRQUNoQyxhQUFhO1FBQ2IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9