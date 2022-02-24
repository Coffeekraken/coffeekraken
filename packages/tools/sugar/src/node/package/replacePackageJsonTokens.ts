import __packageJson from './jsonSync';
import __flatten from '../../shared/object/flatten';

/**
 * @name            replacePackageJsonTokens
 * @namespace            node.path
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to replace packageJson tokens like %packageJson.name, etc... with
 * real package.json values
 *
 * @param       {String}                 string             The string you want to process
 * @param       {IReplacePackageJsonTokensSettings}            [settings={}]       Some settings to configure your tokens replacements
 * @return      {String}                                        The resulting string
 *
 * @example         js
 * import replacePackageJsonTokens from '@coffeekraken/sugar/node/path/replacePackageJsonTokens';
 * replacePackageJsonTokens('Hello %packageJson.name'); // => Hello @coffeekraken/sugar
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IReplacePackageJsonTokensSettings {}
export default function replacePackageJsonTokens(
    string: string,
    settings?: Partial<IReplacePackageJsonTokensSettings>,
): string {
    const set = <IReplacePackageJsonTokensSettings>{
        ...settings,
    };

    // search for tokens
    const tokensMatches = string.match(/%packageJson\.[a-zA-Z0-9\.]+;?/gm);

    if (!tokensMatches) return string;

    const packageJson = __packageJson();
    const flatPackageJson = __flatten(packageJson, {
        array: true,
    });

    tokensMatches.forEach((match) => {
        const dotPath = match.replace(/^%packageJson\./, '').replace(/;$/, '');
        const value = flatPackageJson[dotPath];
        if (value === undefined) return;
        // @ts-ignore
        string = string.replaceAll(match, value);
    });

    return string;
}
