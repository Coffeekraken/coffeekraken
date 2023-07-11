import __pickRandom from '../../../shared/array/pickRandom.js';
import __md5 from '../../../shared/crypto/md5.js';
import __availableColors from '../../../shared/dev/color/availableColors.js';
import __deepMerge from '../../../shared/object/deepMerge.js';
let _colorsStack = {};
let _colorUsedByScope = {};
export default function getColorFor(ref, settings) {
    settings = __deepMerge({
        scope: 'default',
        excludeBasics: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    const availableColors = __availableColors(settings);
    const scopeId = __md5.encrypt(settings.scope);
    const refId = __md5.encrypt(ref);
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
        const color = __pickRandom(availableColors);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLHFDQUFxQyxDQUFDO0FBQy9ELE9BQU8sS0FBSyxNQUFNLCtCQUErQixDQUFDO0FBRWxELE9BQU8saUJBQWlCLE1BQU0sOENBQThDLENBQUM7QUFDN0UsT0FBTyxXQUFXLE1BQU0scUNBQXFDLENBQUM7QUFtQzlELElBQUksWUFBWSxHQUEyQixFQUFFLENBQUM7QUFDOUMsSUFBSSxpQkFBaUIsR0FBNkIsRUFBRSxDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixHQUFRLEVBQ1IsUUFBd0M7SUFFeEMsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxLQUFLLEVBQUUsU0FBUztRQUNoQixhQUFhLEVBQUUsSUFBSTtLQUN0QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXBELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakMsaUJBQWlCO0lBQ2pCLElBQUksWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLEVBQUU7UUFDckMsT0FBTyxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQztLQUM5QztJQUVELDhCQUE4QjtJQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRWpFLG1FQUFtRTtJQUNuRSw4QkFBOEI7SUFDOUIsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRTtRQUM3RCxlQUFlO1FBQ2YsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQztLQUNoQjtTQUFNO1FBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9ELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNKO0tBQ0o7QUFDTCxDQUFDIn0=