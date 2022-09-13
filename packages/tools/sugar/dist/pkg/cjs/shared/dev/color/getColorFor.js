"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pickRandom_1 = __importDefault(require("../../array/pickRandom"));
const md5_1 = __importDefault(require("../../crypto/md5"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const availableColors_1 = __importDefault(require("./availableColors"));
const _colorUsedByScope = {};
const _colorsStack = {};
function getColorFor(ref, settings) {
    settings = (0, deepMerge_1.default)({
        scope: 'default',
        excludeBasics: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    const availableColors = (0, availableColors_1.default)(settings);
    const scopeId = md5_1.default.encrypt(settings.scope);
    const refId = md5_1.default.encrypt(ref);
    // get from cache
    if (_colorsStack[`${scopeId}.${refId}`])
        return _colorsStack[`${scopeId}.${refId}`];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWtEO0FBQ2xELDJEQUFxQztBQUNyQyx1RUFBaUQ7QUFFakQsd0VBQWtEO0FBaUNsRCxNQUFNLGlCQUFpQixHQUE2QixFQUFFLENBQUM7QUFDdkQsTUFBTSxZQUFZLEdBQTJCLEVBQUUsQ0FBQztBQUVoRCxTQUF3QixXQUFXLENBQy9CLEdBQVEsRUFDUixRQUF3QztJQUV4QyxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUNsQjtRQUNJLEtBQUssRUFBRSxTQUFTO1FBQ2hCLGFBQWEsRUFBRSxJQUFJO0tBQ3RCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsSUFBQSx5QkFBaUIsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUVwRCxNQUFNLE9BQU8sR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLEtBQUssR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLGlCQUFpQjtJQUNqQixJQUFJLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNuQyxPQUFPLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRS9DLDhCQUE4QjtJQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRWpFLG1FQUFtRTtJQUNuRSw4QkFBOEI7SUFDOUIsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRTtRQUM3RCxlQUFlO1FBQ2YsTUFBTSxLQUFLLEdBQUcsSUFBQSxvQkFBWSxFQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQztLQUNoQjtTQUFNO1FBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9ELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNKO0tBQ0o7QUFDTCxDQUFDO0FBeENELDhCQXdDQyJ9