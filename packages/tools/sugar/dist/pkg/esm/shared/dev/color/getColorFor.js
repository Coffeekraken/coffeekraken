import __md5 from '../../crypt/md5';
import __availableColors from './availableColors';
import __pickRandom from '../../array/pickRandom';
import __deepMerge from '../../object/deepMerge';
const _colorUsedByScope = {};
const _colorsStack = {};
export default function getColorFor(ref, settings) {
    settings = __deepMerge({
        scope: 'default',
        excludeBasics: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    const availableColors = __availableColors(settings);
    const scopeId = __md5.encrypt(settings.scope);
    const refId = __md5.encrypt(ref);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLGlCQUFpQixDQUFDO0FBRXBDLE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxZQUFZLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFpQ2pELE1BQU0saUJBQWlCLEdBQTZCLEVBQUUsQ0FBQztBQUN2RCxNQUFNLFlBQVksR0FBMkIsRUFBRSxDQUFDO0FBRWhELE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixHQUFRLEVBQ1IsUUFBd0M7SUFFeEMsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxLQUFLLEVBQUUsU0FBUztRQUNoQixhQUFhLEVBQUUsSUFBSTtLQUN0QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXBELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakMsaUJBQWlCO0lBQ2pCLElBQUksWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ25DLE9BQU8sWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFL0MsOEJBQThCO0lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFakUsbUVBQW1FO0lBQ25FLDhCQUE4QjtJQUM5QixJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFO1FBQzdELGVBQWU7UUFDZixNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVDLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO1NBQU07UUFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDL0QsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELE9BQU8sZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7S0FDSjtBQUNMLENBQUMifQ==