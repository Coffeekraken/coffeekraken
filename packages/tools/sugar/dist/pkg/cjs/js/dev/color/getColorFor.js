"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pickRandom_1 = __importDefault(require("../../../shared/array/pickRandom"));
const md5_1 = __importDefault(require("../../../shared/crypto/md5"));
const availableColors_1 = __importDefault(require("../../../shared/dev/color/availableColors"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
let _colorsStack = {};
let _colorUsedByScope = {};
function getColorFor(ref, settings) {
    settings = (0, deepMerge_1.default)({
        scope: 'default',
        excludeBasics: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    const availableColors = (0, availableColors_1.default)(settings);
    const scopeId = md5_1.default.encrypt(settings.scope);
    const refId = md5_1.default.encrypt(ref);
    // get from cache
    if (_colorsStack[`${scopeId}.${refId}`]) {
        return _colorsStack[`${scopeId}.${refId}`];
    }
    // make sure some stack are ok
    if (!_colorUsedByScope[scopeId])
        _colorUsedByScope[scopeId] = [];
    // if we already have taken all the available colors for this scope
    // simply get a color randomly
    if (_colorUsedByScope[scopeId].length >= availableColors.length) {
        // fully random
        const color = (0, pickRandom_1.default)(availableColors);
        _colorsStack[`${scopeId}.${refId}`] = color;
        return color;
    }
    else {
        for (let i = 0; i < availableColors.length; i++) {
            if (_colorUsedByScope[scopeId].indexOf(availableColors[i]) === -1) {
                _colorUsedByScope[scopeId].push(availableColors[i]);
                _colorsStack[`${scopeId}.${refId}`] = availableColors[i];
                return availableColors[i];
            }
        }
    }
}
exports.default = getColorFor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTREO0FBQzVELHFFQUErQztBQUUvQyxnR0FBMEU7QUFDMUUsaUZBQTJEO0FBbUMzRCxJQUFJLFlBQVksR0FBMkIsRUFBRSxDQUFDO0FBQzlDLElBQUksaUJBQWlCLEdBQTZCLEVBQUUsQ0FBQztBQUVyRCxTQUF3QixXQUFXLENBQy9CLEdBQVEsRUFDUixRQUF3QztJQUV4QyxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUNsQjtRQUNJLEtBQUssRUFBRSxTQUFTO1FBQ2hCLGFBQWEsRUFBRSxJQUFJO0tBQ3RCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUVwRCxNQUFNLE9BQU8sR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLEtBQUssR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLGlCQUFpQjtJQUNqQixJQUFJLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDOUM7SUFFRCw4QkFBOEI7SUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVqRSxtRUFBbUU7SUFDbkUsOEJBQThCO0lBQzlCLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7UUFDN0QsZUFBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQyxlQUFlLENBQUMsQ0FBQztRQUM1QyxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUMsT0FBTyxLQUFLLENBQUM7S0FDaEI7U0FBTTtRQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvRCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDSjtLQUNKO0FBQ0wsQ0FBQztBQXpDRCw4QkF5Q0MifQ==