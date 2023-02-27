/**
 * @name            compressVarName
 * @namespace       shared.css
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function allows you to compress a css variable name only when the environment is production
 *
 * @param       {String}         name       The name to compress
 * @return      {String}                The compressed variable name
 *
 * @snippet         __compressCssVarName
 *
 * @example         js
 * import { __compressCssVarName } from '@coffeekraken/sugar/css';
 * __compressCssVarName('--something-long-that-you-want-to-compress');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __compressCssVarName(name) {
    const original = name;
    function compress(varName) {
        const base64 = varName.toLowerCase().replace(/\-/gm, '');
        const dict = 'abcdefghijklmnopqrstuvwxyz0123456789=- ';
        const sum = base64.split('').reduce((a, b) => {
            return a + dict.indexOf(b);
        }, 0) + name.length;
        const invert = sum <= 250;
        const compressed = base64
            .split('')
            .filter((char, i) => !(i % 5))
            .join('')
            .toLowerCase();
        let finalHash = `${compressed}`;
        if (invert) {
            finalHash = finalHash.split('').reverse().join('');
        }
        // console.log(original, `--${finalHash}${sum}`);
        return `--${finalHash}${sum}`;
    }
    const matches = name.match(/(--[a-zA-Z0-9_-]+)/gm);
    if (!matches) {
        return name;
    }
    matches.forEach((varName) => {
        if (varName.length <= 13)
            return;
        name = name.replace(varName, compress(varName));
    });
    return name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQixDQUFDLElBQUk7SUFDN0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBRXRCLFNBQVMsUUFBUSxDQUFDLE9BQU87UUFDckIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekQsTUFBTSxJQUFJLEdBQUcseUNBQXlDLENBQUM7UUFDdkQsTUFBTSxHQUFHLEdBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixNQUFNLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO1FBQzFCLE1BQU0sVUFBVSxHQUFHLE1BQU07YUFDcEIsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNULE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUNSLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksU0FBUyxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUM7UUFDaEMsSUFBSSxNQUFNLEVBQUU7WUFDUixTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxpREFBaUQ7UUFFakQsT0FBTyxLQUFLLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDVixPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3hCLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFO1lBQUUsT0FBTztRQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=