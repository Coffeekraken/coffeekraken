"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = parseAndFormatLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBbmRGb3JtYXRMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFuZEZvcm1hdExvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGlFQUEyQztBQUMzQyxxRUFBK0M7QUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUFTLGlCQUFpQixDQUN4QixJQUEyQztJQUUzQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3JELE1BQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQztJQUU5QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNuQixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQiwyQkFBMkI7WUFDM0IsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzNELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxPQUFPLEdBQUcsbUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakMsV0FBVyxDQUFDLElBQUksaUJBQ2QsS0FBSyxFQUFFLG1CQUFXLENBQUMsR0FBRyxDQUFDLEVBQ3ZCLElBQUksRUFBRSxTQUFTLElBQ1osT0FBTyxFQUNWLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxtQkFBVyxDQUFDLEdBQUcsQ0FBQztpQkFDeEIsQ0FBQyxDQUFDO2FBQ0o7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ3BDLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxTQUFTO2dCQUN6QixHQUFHLENBQUMsS0FBSyxHQUFHLG1CQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksT0FBTyxLQUFLLElBQUk7UUFBRSxPQUFPLFdBQVcsQ0FBQztJQUN6QyxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==