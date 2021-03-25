var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../cli/parseArgs", "../console/parseHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBbmRGb3JtYXRMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFuZEZvcm1hdExvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUNBLGlFQUEyQztJQUMzQyxxRUFBK0M7SUFFL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Qkc7SUFDSCxTQUFTLGlCQUFpQixDQUN4QixJQUEyQztRQUUzQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3JELE1BQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQztRQUU5QixtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNuQixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsMkJBQTJCO2dCQUMzQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQzNELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7b0JBQzdCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxPQUFPLEdBQUcsbUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakMsV0FBVyxDQUFDLElBQUksaUJBQ2QsS0FBSyxFQUFFLG1CQUFXLENBQUMsR0FBRyxDQUFDLEVBQ3ZCLElBQUksRUFBRSxTQUFTLElBQ1osT0FBTyxFQUNWLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsV0FBVyxDQUFDLElBQUksQ0FBQzt3QkFDZixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsbUJBQVcsQ0FBQyxHQUFHLENBQUM7cUJBQ3hCLENBQUMsQ0FBQztpQkFDSjthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSTtvQkFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVM7b0JBQ3pCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2hELFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxLQUFLLElBQUk7WUFBRSxPQUFPLFdBQVcsQ0FBQztRQUN6QyxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==