// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/string/parse", "@coffeekraken/sugar/shared/string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parse_1 = __importDefault(require("@coffeekraken/sugar/shared/string/parse"));
    const upperFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/upperFirst"));
    /**
     * @name              param
     * @namespace           shared.tags
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
        const res = {};
        data.forEach((param) => {
            if (typeof param !== 'object' ||
                !param.value ||
                typeof param.value !== 'string')
                return;
            const parts = param.value.split(/\s{2,20000}/).map((l) => l.trim());
            let type = parts && parts[0]
                ? upperFirst_1.default(parts[0].replace('{', '').replace('}', ''))
                : null;
            const variable = parts && parts[1] ? parts[1] : null;
            const description = parts && parts[2] ? parts[2] : null;
            let name = variable;
            let defaultValue = undefined;
            let variableMatch = null;
            if (variable && typeof variable === 'string')
                variableMatch = variable.match(/^\[(.*)\]$/);
            if (type && type.includes('|')) {
                type = type.split('|').map((l) => upperFirst_1.default(l.trim()));
            }
            if (variableMatch) {
                const variableParts = variableMatch[1].split('=');
                if (variableParts.length === 2) {
                    name = variableParts[0].trim();
                    defaultValue = parse_1.default(variableParts[1].trim());
                }
            }
            res[name] = {
                name,
                type,
                description,
                default: defaultValue
            };
            if (param.content)
                res[name].content = param.content.join('\n');
        });
        return res;
    }
    exports.default = param;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxvRkFBOEQ7SUFDOUQsOEZBQXdFO0lBRXhFOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckIsSUFDRSxPQUFPLEtBQUssS0FBSyxRQUFRO2dCQUN6QixDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUNaLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRO2dCQUUvQixPQUFPO1lBQ1QsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwRSxJQUFJLElBQUksR0FDTixLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixDQUFDLENBQUMsb0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ1gsTUFBTSxRQUFRLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckQsTUFBTSxXQUFXLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ3BCLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUM3QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFFekIsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUTtnQkFDMUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFL0MsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxvQkFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7WUFFRCxJQUFJLGFBQWEsRUFBRTtnQkFDakIsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDOUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDL0IsWUFBWSxHQUFHLGVBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDakQ7YUFDRjtZQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDVixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osV0FBVztnQkFDWCxPQUFPLEVBQUUsWUFBWTthQUN0QixDQUFDO1lBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTztnQkFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=