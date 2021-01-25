"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseArgs_1 = __importDefault(require("../cli/parseArgs"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
/**
 * @name                parseAndFormatLog
 * @namespace           sugar.node
 * @type                Function
 * @state               beta
 *
 * This function take as input either a string with some arguments like "--type group --title 'hello world'", etc... or directly an object
 * with arguments as properties and format that into a valid ILog formated object
 *
 * @param       {String|String[]|Object|Object[]}          log          The log(s) to parse and format
 * @return      {ILog}                                                  An ILog complient object
 *
 * @example         js
 * import parseAndFormatLog from '@coffeekraken/sugar/js/log/parseAndFormatLog';
 * parseAndFormatLog('[--type group --title "hello world"] Daily daily day');
 * parseAndFormatLog({
 *   type: 'group',
 *   title: 'hello world',
 *   value: 'Daily daily day'
 * });
 * // {
 * //   type: 'group',
 * //   title: 'hello world',
 * //   value: 'Daily daily day'
 * // }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseAndFormatLog(logs) {
    const isArray = Array.isArray(logs);
    logs = Array.isArray(logs) === false ? [logs] : logs;
    const logObjArray = [];
    // loop on each log
    // @ts-ignore
    logs.forEach((log) => {
        if (typeof log === 'string') {
            // search for log arguments
            const matches = log.match(/\[--?[a-zA-Z0-9-_]+[^\]]+\]/gm);
            if (matches && matches.length) {
                log = log.replace(matches[0], '').trim();
                const cli = matches[0].slice(1, -1);
                const argsObj = parseArgs_1.default(cli);
                logObjArray.push(Object.assign({ value: parseHtml_1.default(log), type: 'default' }, argsObj));
            }
            else {
                logObjArray.push({
                    type: 'default',
                    value: parseHtml_1.default(log)
                });
            }
        }
        else {
            if (!log.type)
                log.type = 'default';
            if (log.value !== undefined)
                log.value = parseHtml_1.default(log.value.toString());
            logObjArray.push(log);
        }
    });
    if (isArray === true)
        return logObjArray;
    return logObjArray[0];
}
module.exports = parseAndFormatLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBbmRGb3JtYXRMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFuZEZvcm1hdExvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsaUVBQTJDO0FBQzNDLHFFQUErQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsaUJBQWlCLENBQ3hCLElBQTJDO0lBRTNDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckQsTUFBTSxXQUFXLEdBQVUsRUFBRSxDQUFDO0lBRTlCLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ25CLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLDJCQUEyQjtZQUMzQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDM0QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLE9BQU8sR0FBRyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxXQUFXLENBQUMsSUFBSSxpQkFDZCxLQUFLLEVBQUUsbUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFDdkIsSUFBSSxFQUFFLFNBQVMsSUFDWixPQUFPLEVBQ1YsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ2YsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsS0FBSyxFQUFFLG1CQUFXLENBQUMsR0FBRyxDQUFDO2lCQUN4QixDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7WUFDcEMsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQ3pCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDaEQsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPLEtBQUssSUFBSTtRQUFFLE9BQU8sV0FBVyxDQUFDO0lBQ3pDLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFDRCxpQkFBUyxpQkFBaUIsQ0FBQyJ9