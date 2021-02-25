import __parseArgs from '../cli/parseArgs';
import __parseHtml from '../console/parseHtml';
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
                const argsObj = __parseArgs(cli);
                logObjArray.push(Object.assign({ value: __parseHtml(log), type: 'default' }, argsObj));
            }
            else {
                logObjArray.push({
                    type: 'default',
                    value: __parseHtml(log)
                });
            }
        }
        else {
            if (!log.type)
                log.type = 'default';
            if (log.value !== undefined)
                log.value = __parseHtml(log.value.toString());
            logObjArray.push(log);
        }
    });
    if (isArray === true)
        return logObjArray;
    return logObjArray[0];
}
export default parseAndFormatLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBbmRGb3JtYXRMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFuZEZvcm1hdExvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFdBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsaUJBQWlCLENBQ3hCLElBQTJDO0lBRTNDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckQsTUFBTSxXQUFXLEdBQVUsRUFBRSxDQUFDO0lBRTlCLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ25CLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLDJCQUEyQjtZQUMzQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDM0QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pDLFdBQVcsQ0FBQyxJQUFJLGlCQUNkLEtBQUssRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQ3ZCLElBQUksRUFBRSxTQUFTLElBQ1osT0FBTyxFQUNWLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNmLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDO2lCQUN4QixDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7WUFDcEMsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQ3pCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNoRCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU8sS0FBSyxJQUFJO1FBQUUsT0FBTyxXQUFXLENBQUM7SUFDekMsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUNELGVBQWUsaUJBQWlCLENBQUMifQ==