// @ts-nocheck
import __upperFirst from '../../string/upperFirst';
/**
 * @name              parseTypeDefinitionString
 * @namespace           sugar.js.validation.utils
 * @type              Function
 * @status              wip
 *
 * Thia function take an argument type definition string like "String", "Array<String>", "Array|String", etc... and return an object that represent this.
 *
 * @param       {String}        argTypeString         The argument type definition string
 * @return      {Object}                              The argument type definition string in object format
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import parseTypeDefinitionString from '@coffeekraken/sugar/js/parse/parseTypeDefinitionString';
 * parseTypeDefinitionString('Array'); // => [{ type: 'array', of: null }] }
 * parseTypeDefinitionString('Array<String>'); // => [{ type: 'array', of: [{ type: 'string' }] }]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseTypeDefinitionString(argTypeString) {
    // split the string by |
    let inDepth = 0;
    let currentPart = '', typesArray = [];
    argTypeString.split('').forEach((character) => {
        if (character === '>') {
            if (inDepth <= 0) {
                throw new Error(`It seems that your argument type definition string "${argTypeString}" is invalid...`);
            }
            inDepth--;
            currentPart += character;
            return;
        }
        if (character === '<') {
            inDepth++;
            currentPart += character;
            return;
        }
        if (character === '|') {
            if (inDepth > 0) {
                currentPart += character;
                return;
            }
            typesArray.push(currentPart);
            currentPart = '';
            return;
        }
        currentPart += character;
    });
    typesArray.push(currentPart);
    // init the return array
    const returnArray = [];
    // loop on each types array
    typesArray.forEach((typeDefinitionString) => {
        // split the string by <
        const parts = typeDefinitionString.split('<');
        // get the "type"
        const type = __upperFirst(parts[0]);
        // process the "of" part if exist
        let ofArray = null;
        if (parts[1]) {
            const ofPart = parts[1].slice(0, -1);
            ofArray = parseTypeDefinitionString(ofPart);
        }
        // build the type object and add it the the returnArray
        returnArray.push({
            type,
            of: ofArray
        });
    });
    return returnArray;
}
export default parseTypeDefinitionString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VUeXBlRGVmaW5pdGlvblN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhcnNlVHlwZURlZmluaXRpb25TdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLHlCQUF5QixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyx5QkFBeUIsQ0FBQyxhQUFhO0lBQzlDLHdCQUF3QjtJQUN4QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDaEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUNsQixVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO1lBQ3JCLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYix1REFBdUQsYUFBYSxpQkFBaUIsQ0FDdEYsQ0FBQzthQUNIO1lBQ0QsT0FBTyxFQUFFLENBQUM7WUFDVixXQUFXLElBQUksU0FBUyxDQUFDO1lBQ3pCLE9BQU87U0FDUjtRQUNELElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtZQUNyQixPQUFPLEVBQUUsQ0FBQztZQUNWLFdBQVcsSUFBSSxTQUFTLENBQUM7WUFDekIsT0FBTztTQUNSO1FBQ0QsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO1lBQ3JCLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDZixXQUFXLElBQUksU0FBUyxDQUFDO2dCQUN6QixPQUFPO2FBQ1I7WUFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdCLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDakIsT0FBTztTQUNSO1FBQ0QsV0FBVyxJQUFJLFNBQVMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFN0Isd0JBQXdCO0lBQ3hCLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUV2QiwyQkFBMkI7SUFDM0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixFQUFFLEVBQUU7UUFDMUMsd0JBQXdCO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QyxpQkFBaUI7UUFDakIsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLGlDQUFpQztRQUNqQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QztRQUVELHVEQUF1RDtRQUN2RCxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSTtZQUNKLEVBQUUsRUFBRSxPQUFPO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBQ0QsZUFBZSx5QkFBeUIsQ0FBQyJ9