// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../string/parse", "../../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parse_1 = __importDefault(require("../../string/parse"));
    var upperFirst_1 = __importDefault(require("../../string/upperFirst"));
    /**
     * @name              param
     * @namespace           sugar.js.docblock.tags
     * @type              Function
     * @status              wip
     *
     * Parse the param tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @param      {Object}                      The formated object
     *
     * @todo      interface
     * @todo      doc
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function param(data) {
        if (!Array.isArray(data))
            data = [data];
        var res = {};
        data.forEach(function (param) {
            if (typeof param !== 'object' ||
                !param.value ||
                typeof param.value !== 'string')
                return;
            var parts = param.value.split(/\s{2,20000}/).map(function (l) { return l.trim(); });
            var type = parts && parts[0]
                ? upperFirst_1.default(parts[0].replace('{', '').replace('}', ''))
                : null;
            var variable = parts && parts[1] ? parts[1] : null;
            var description = parts && parts[2] ? parts[2] : null;
            var name = variable;
            var defaultValue = undefined;
            var variableMatch = null;
            if (variable && typeof variable === 'string')
                variableMatch = variable.match(/^\[(.*)\]$/);
            if (type && type.includes('|')) {
                type = type.split('|').map(function (l) { return upperFirst_1.default(l.trim()); });
            }
            if (variableMatch) {
                var variableParts = variableMatch[1].split('=');
                if (variableParts.length === 2) {
                    name = variableParts[0].trim();
                    defaultValue = parse_1.default(variableParts[1].trim());
                }
            }
            res[name] = {
                name: name,
                type: type,
                description: description,
                default: defaultValue
            };
            if (param.content)
                res[name].content = param.content.join('\n');
        });
        return res;
    }
    exports.default = param;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsNkRBQXlDO0lBQ3pDLHVFQUFtRDtJQUVuRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDakIsSUFDRSxPQUFPLEtBQUssS0FBSyxRQUFRO2dCQUN6QixDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUNaLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRO2dCQUUvQixPQUFPO1lBQ1QsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFSLENBQVEsQ0FBQyxDQUFDO1lBQ3BFLElBQUksSUFBSSxHQUNOLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxvQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDWCxJQUFNLFFBQVEsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyRCxJQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4RCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUM7WUFDcEIsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBQzdCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztZQUV6QixJQUFJLFFBQVEsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRO2dCQUMxQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUvQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxvQkFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7YUFDM0Q7WUFFRCxJQUFJLGFBQWEsRUFBRTtnQkFDakIsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDOUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDL0IsWUFBWSxHQUFHLGVBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDakQ7YUFDRjtZQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDVixJQUFJLE1BQUE7Z0JBQ0osSUFBSSxNQUFBO2dCQUNKLFdBQVcsYUFBQTtnQkFDWCxPQUFPLEVBQUUsWUFBWTthQUN0QixDQUFDO1lBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTztnQkFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=