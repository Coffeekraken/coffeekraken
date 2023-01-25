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
 * @example         js
 * import { __compressVarName } from '@coffeekraken/sugar/css';
 * __compressVarName('--something-long-that-you-want-to-compress');
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __compressVarName(name) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FBQyxJQUFJO0lBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztJQUV0QixTQUFTLFFBQVEsQ0FBQyxPQUFPO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sSUFBSSxHQUFHLHlDQUF5QyxDQUFDO1FBQ3ZELE1BQU0sR0FBRyxHQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEIsTUFBTSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUMxQixNQUFNLFVBQVUsR0FBRyxNQUFNO2FBQ3BCLEtBQUssQ0FBQyxFQUFFLENBQUM7YUFDVCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzdCLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDUixXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLFNBQVMsR0FBRyxHQUFHLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLElBQUksTUFBTSxFQUFFO1lBQ1IsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsaURBQWlEO1FBRWpELE9BQU8sS0FBSyxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1YsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRTtZQUFFLE9BQU87UUFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9