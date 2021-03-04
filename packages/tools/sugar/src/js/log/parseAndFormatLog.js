var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var parseArgs_1 = __importDefault(require("../cli/parseArgs"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
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
        var isArray = Array.isArray(logs);
        logs = Array.isArray(logs) === false ? [logs] : logs;
        var logObjArray = [];
        // loop on each log
        // @ts-ignore
        logs.forEach(function (log) {
            if (typeof log === 'string') {
                // search for log arguments
                var matches = log.match(/\[--?[a-zA-Z0-9-_]+[^\]]+\]/gm);
                if (matches && matches.length) {
                    log = log.replace(matches[0], '').trim();
                    var cli = matches[0].slice(1, -1);
                    var argsObj = parseArgs_1.default(cli);
                    logObjArray.push(__assign({ value: parseHtml_1.default(log), type: 'default' }, argsObj));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBbmRGb3JtYXRMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFuZEZvcm1hdExvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ0EsK0RBQTJDO0lBQzNDLG1FQUErQztJQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRCRztJQUNILFNBQVMsaUJBQWlCLENBQ3hCLElBQTJDO1FBRTNDLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckQsSUFBTSxXQUFXLEdBQVUsRUFBRSxDQUFDO1FBRTlCLG1CQUFtQjtRQUNuQixhQUFhO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDZixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsMkJBQTJCO2dCQUMzQixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQzNELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7b0JBQzdCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBTSxPQUFPLEdBQUcsbUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakMsV0FBVyxDQUFDLElBQUksWUFDZCxLQUFLLEVBQUUsbUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFDdkIsSUFBSSxFQUFFLFNBQVMsSUFDWixPQUFPLEVBQ1YsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxXQUFXLENBQUMsSUFBSSxDQUFDO3dCQUNmLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxtQkFBVyxDQUFDLEdBQUcsQ0FBQztxQkFDeEIsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO29CQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssU0FBUztvQkFDekIsR0FBRyxDQUFDLEtBQUssR0FBRyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEQsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLEtBQUssSUFBSTtZQUFFLE9BQU8sV0FBVyxDQUFDO1FBQ3pDLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9