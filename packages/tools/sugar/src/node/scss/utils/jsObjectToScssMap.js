"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const plainObject_1 = __importDefault(require("../../is/plainObject"));
/**
 * @wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */
function jsObjectToScssMap(value, settings = {}) {
    settings = deepMerge_1.default({
        quoteKeys: ['src', 'import', 'font-family', 'defaultAction']
    }, settings);
    function _jsObjectToScssMap(value, initialIndentLevel = 0) {
        let indentLevel = initialIndentLevel;
        switch (typeof value) {
            case 'boolean':
            case 'number':
                return value.toString();
            case 'string':
                if (value.slice(0, 1) === '#') {
                    return `"${value}"`;
                }
                return value;
            case 'object':
                if (plainObject_1.default(value)) {
                    indentLevel += 1;
                    let indent = indentsToSpaces(indentLevel);
                    let jsObj = value;
                    let sassKeyValPairs = [];
                    sassKeyValPairs = Object.keys(jsObj).reduce((result, key) => {
                        let jsVal = jsObj[key];
                        let sassVal = _jsObjectToScssMap(jsVal, indentLevel);
                        if (isNotUndefined(sassVal)) {
                            if (settings.quoteKeys.indexOf(key) !== -1) {
                                result.push(`${key}: "${sassVal}"`);
                            }
                            else {
                                result.push(`${key}: ${sassVal}`);
                            }
                        }
                        return result;
                    }, []);
                    let result = `(\n${indent + sassKeyValPairs.join(',\n' + indent)}\n${indentsToSpaces(indentLevel - 1)})`;
                    indentLevel -= 1;
                    return result;
                }
                else if (Array.isArray(value)) {
                    let sassVals = [];
                    value.forEach((v) => {
                        if (isNotUndefined(v)) {
                            sassVals.push(_jsObjectToScssMap(v, indentLevel));
                        }
                    });
                    return '(' + sassVals.join(', ') + ')';
                }
                else if (isNull(value))
                    return 'null';
                else {
                    return value.toString();
                }
            default:
                return;
        }
    }
    let res = _jsObjectToScssMap(value);
    res = res.replace(/\s["'](#[a-zA-Z0-9]{3,6})["']/gm, ' $1');
    return res;
}
function indentsToSpaces(indentCount) {
    return Array(indentCount + 1).join('  ');
}
function isNull(value) {
    return value === null;
}
function isNotUndefined(value) {
    return typeof value !== 'undefined';
}
module.exports = jsObjectToScssMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNPYmplY3RUb1Njc3NNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc09iamVjdFRvU2Nzc01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUdkLHVFQUFpRDtBQUNqRCx1RUFBbUQ7QUFFbkQ7Ozs7O0dBS0c7QUFFSCxTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM3QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUM7S0FDN0QsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLFNBQVMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLGtCQUFrQixHQUFHLENBQUM7UUFDdkQsSUFBSSxXQUFXLEdBQUcsa0JBQWtCLENBQUM7UUFFckMsUUFBUSxPQUFPLEtBQUssRUFBRTtZQUNwQixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssUUFBUTtnQkFDWCxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMxQixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQzdCLE9BQU8sSUFBSSxLQUFLLEdBQUcsQ0FBQztpQkFDckI7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDZixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMxQixXQUFXLElBQUksQ0FBQyxDQUFDO29CQUNqQixJQUFJLE1BQU0sR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRTFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbEIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO29CQUV6QixlQUFlLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFN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