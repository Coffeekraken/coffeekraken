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
        define(["require", "exports", "../value/validateValueOutputString", "../../console/parseHtml", "../../string/trimLines"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validateValueOutputString_1 = __importDefault(require("../value/validateValueOutputString"));
    var parseHtml_1 = __importDefault(require("../../console/parseHtml"));
    var trimLines_1 = __importDefault(require("../../string/trimLines"));
    /**
     * @name                validateObjectOutputString
     * @namespace           sugar.js.validation.object
     * @type                Function
     * @status              wip
     *
     * This function take the resulting object of the ```validateObject``` one and transform it into
     * a nice human readable string.
     *
     * @param         {Object}          validateObjectResultObj           The validateObject resulting object
     * @return        {String}                                        A human readable string of the resulting object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import validateObjectOutputString from '@coffeekraken/sugar/js/validation/object/validateObjectOutputString';
     * import validateObject from '@coffeekraken/sugar/js/validation/object/validateObject';
     * const resultObj = validateObject({
     *    plop: true,
     *    hello: 'world'
     * }, {
     *    plop: {
     *      type: 'String',
     *      required: true
     *    },
     *    hello: {
     *      type: 'String',
     *      required: true
     *    }
     * });
     * validateObjectOutputString(resultObj);
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function validateObjectOutputString(validateObjectResultObj, settings) {
        if (settings === void 0) { settings = {}; }
        var stringsArray = [];
        stringsArray.push(trimLines_1.default("\n  <underline><green>Object validation</green></underline>\n\n  " + (validateObjectResultObj.interface
            ? "- Interface:  <cyan>" + validateObjectResultObj.interface + "</cyan>"
            : '') + "\n  - Name:       <yellow>" + (validateObjectResultObj.name || 'unnamed') + "</yellow>\n  - Error" + (validateObjectResultObj.issues.length > 1 ? 's' : '') + ":" + (validateObjectResultObj.issues.length > 1 ? '' : ' ') + "     <red>" + validateObjectResultObj.issues.length + "</red>\n  - Propert" + (validateObjectResultObj.issues.length > 1 ? 'ies' : 'y') + ":" + (validateObjectResultObj.issues.length > 1 ? '' : '  ') + " " + validateObjectResultObj.issues
            .map(function (v) {
            return "<magenta>" + v + "</magenta>";
        })
            .join(', ')));
        validateObjectResultObj.issues.forEach(function (attrName) {
            var attrIssueObj = validateObjectResultObj[attrName];
            var string = validateValueOutputString_1.default(attrIssueObj, {
                interface: validateObjectResultObj.interface,
                name: "<yellow>" + validateObjectResultObj.name + "</yellow>.<magenta>" + attrName + "</magenta>"
            });
            stringsArray.push(string);
        });
        return parseHtml_1.default(stringsArray.join('\n\n'));
    }
    exports.default = validateObjectOutputString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVPYmplY3RPdXRwdXRTdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZU9iamVjdE91dHB1dFN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxpR0FBNkU7SUFDN0Usc0VBQWtEO0lBQ2xELHFFQUFpRDtJQUdqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0NHO0lBQ0gsU0FBUywwQkFBMEIsQ0FBQyx1QkFBdUIsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ3hFLElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV4QixZQUFZLENBQUMsSUFBSSxDQUNmLG1CQUFXLENBQUMsdUVBSVosdUJBQXVCLENBQUMsU0FBUztZQUMvQixDQUFDLENBQUMseUJBQXVCLHVCQUF1QixDQUFDLFNBQVMsWUFBUztZQUNuRSxDQUFDLENBQUMsRUFBRSxvQ0FFZ0IsdUJBQXVCLENBQUMsSUFBSSxJQUFJLFNBQVMsOEJBQ3hELHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FDekQsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFDekMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE1BQU0sNEJBQ3pDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FDOUQsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUNuRCx1QkFBdUIsQ0FBQyxNQUFNO2FBQy9CLEdBQUcsQ0FBQyxVQUFDLENBQUM7WUFDTCxPQUFPLGNBQVksQ0FBQyxlQUFZLENBQUM7UUFDbkMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDLENBQ2pCLENBQUM7UUFFRix1QkFBdUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUM5QyxJQUFNLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RCxJQUFNLE1BQU0sR0FBRyxtQ0FBMkIsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZELFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxTQUFTO2dCQUM1QyxJQUFJLEVBQUUsYUFBVyx1QkFBdUIsQ0FBQyxJQUFJLDJCQUFzQixRQUFRLGVBQVk7YUFDeEYsQ0FBQyxDQUFDO1lBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sbUJBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELGtCQUFlLDBCQUEwQixDQUFDIn0=