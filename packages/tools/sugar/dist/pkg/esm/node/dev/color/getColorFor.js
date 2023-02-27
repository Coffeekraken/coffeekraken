import { __sharedContext } from '@coffeekraken/sugar/process';
import __pickRandom from '../../../shared/array/pickRandom';
import __md5 from '../../../shared/crypto/md5';
import __availableColors from '../../../shared/dev/color/availableColors';
import __deepMerge from '../../../shared/object/deepMerge';
let _colorsStack = {};
let _colorUsedByScope = {};
export default function getColorFor(ref, settings) {
    settings = __deepMerge({
        scope: 'default',
        excludeBasics: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    const ctx = __sharedContext();
    if (ctx.colorUsedByScope) {
        _colorUsedByScope = ctx.colorUsedByScope;
    }
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
                __sharedContext(Object.assign(Object.assign({}, ctx), { colorUsedByScope: _colorUsedByScope }));
                return availableColors[i];
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLFlBQVksTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RCxPQUFPLEtBQUssTUFBTSw0QkFBNEIsQ0FBQztBQUUvQyxPQUFPLGlCQUFpQixNQUFNLDJDQUEyQyxDQUFDO0FBQzFFLE9BQU8sV0FBVyxNQUFNLGtDQUFrQyxDQUFDO0FBbUMzRCxJQUFJLFlBQVksR0FBMkIsRUFBRSxDQUFDO0FBQzlDLElBQUksaUJBQWlCLEdBQTZCLEVBQUUsQ0FBQztBQUVyRCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsR0FBUSxFQUNSLFFBQXdDO0lBRXhDLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksS0FBSyxFQUFFLFNBQVM7UUFDaEIsYUFBYSxFQUFFLElBQUk7S0FDdEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyxlQUFlLEVBQUUsQ0FBQztJQUM5QixJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN0QixpQkFBaUIsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7S0FDNUM7SUFFRCxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVwRCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLGlCQUFpQjtJQUNqQixJQUFJLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDOUM7SUFFRCw4QkFBOEI7SUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVqRSxtRUFBbUU7SUFDbkUsOEJBQThCO0lBQzlCLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7UUFDN0QsZUFBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1QyxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUMsT0FBTyxLQUFLLENBQUM7S0FDaEI7U0FBTTtRQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvRCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsZUFBZSxpQ0FDUixHQUFHLEtBQ04sZ0JBQWdCLEVBQUUsaUJBQWlCLElBQ3JDLENBQUM7Z0JBQ0gsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDSjtLQUNKO0FBQ0wsQ0FBQyJ9