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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29sb3JGb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRDb2xvckZvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxpQkFBaUIsQ0FBQztBQUNwQyxPQUFPLGlCQUErQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2hGLE9BQU8sWUFBWSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBaUNqRCxNQUFNLGlCQUFpQixHQUE2QixFQUFFLENBQUM7QUFDdkQsTUFBTSxZQUFZLEdBQTJCLEVBQUUsQ0FBQztBQUVoRCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsR0FBUSxFQUNSLFFBQXdDO0lBRXhDLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksS0FBSyxFQUFFLFNBQVM7UUFDaEIsYUFBYSxFQUFFLElBQUk7S0FDdEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVwRCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLGlCQUFpQjtJQUNqQixJQUFJLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNuQyxPQUFPLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRS9DLDhCQUE4QjtJQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRWpFLG1FQUFtRTtJQUNuRSw4QkFBOEI7SUFDOUIsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRTtRQUM3RCxlQUFlO1FBQ2YsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxHQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQztLQUNoQjtTQUFNO1FBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQy9ELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNKO0tBQ0o7QUFDTCxDQUFDIn0=