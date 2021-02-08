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
    return param;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7SUFFViw2REFBeUM7SUFDekMsdUVBQW1EO0lBRW5EOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUNqQixJQUNFLE9BQU8sS0FBSyxLQUFLLFFBQVE7Z0JBQ3pCLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQ1osT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVE7Z0JBRS9CLE9BQU87WUFDVCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQVIsQ0FBUSxDQUFDLENBQUM7WUFDcEUsSUFBSSxJQUFJLEdBQ04sS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNYLElBQU0sUUFBUSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JELElBQU0sV0FBVyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUNwQixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUM7WUFDN0IsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBRXpCLElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVE7Z0JBQzFDLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRS9DLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLG9CQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQzthQUMzRDtZQUVELElBQUksYUFBYSxFQUFFO2dCQUNqQixJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUM5QixJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMvQixZQUFZLEdBQUcsZUFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUNqRDthQUNGO1lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNWLElBQUksTUFBQTtnQkFDSixJQUFJLE1BQUE7Z0JBQ0osV0FBVyxhQUFBO2dCQUNYLE9BQU8sRUFBRSxZQUFZO2FBQ3RCLENBQUM7WUFDRixJQUFJLEtBQUssQ0FBQyxPQUFPO2dCQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDRCxPQUFTLEtBQUssQ0FBQyJ9