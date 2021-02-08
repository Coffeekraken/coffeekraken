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
    return parseAndFormatLog;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBbmRGb3JtYXRMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUFuZEZvcm1hdExvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDQSwrREFBMkM7SUFDM0MsbUVBQStDO0lBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FDeEIsSUFBMkM7UUFFM0MsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRCxJQUFNLFdBQVcsR0FBVSxFQUFFLENBQUM7UUFFOUIsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNmLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUMzQiwyQkFBMkI7Z0JBQzNCLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDN0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN6QyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFNLE9BQU8sR0FBRyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQyxXQUFXLENBQUMsSUFBSSxZQUNkLEtBQUssRUFBRSxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxFQUN2QixJQUFJLEVBQUUsU0FBUyxJQUNaLE9BQU8sRUFDVixDQUFDO2lCQUNKO3FCQUFNO29CQUNMLFdBQVcsQ0FBQyxJQUFJLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLG1CQUFXLENBQUMsR0FBRyxDQUFDO3FCQUN4QixDQUFDLENBQUM7aUJBQ0o7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7b0JBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxTQUFTO29CQUN6QixHQUFHLENBQUMsS0FBSyxHQUFHLG1CQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sS0FBSyxJQUFJO1lBQUUsT0FBTyxXQUFXLENBQUM7UUFDekMsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNELE9BQVMsaUJBQWlCLENBQUMifQ==