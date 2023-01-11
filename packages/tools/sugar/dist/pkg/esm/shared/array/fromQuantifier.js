// @ts-nocheck
export default function __fromQuantifier(quantifier, settings) {
    const finalSettings = Object.assign({ action: '<=' }, (settings !== null && settings !== void 0 ? settings : {}));
    let action = finalSettings.action;
    const finalArray = [];
    if (typeof quantifier === 'number') {
        quantifier = `${action}${quantifier}`;
    }
    if (action.startsWith('>') && finalSettings.max === undefined) {
        throw new Error(`<red>[fromQuantifier]</red> When using the action ">" or ">=", you MUST specify a settings.max value`);
    }
    const actionMatch = quantifier.match(/^((>|<)?\=?)/);
    if (actionMatch[0]) {
        action = actionMatch[0];
    }
    let startLevel, endLevel, levelInt = parseInt(quantifier.replace(/^(>|<)?\=?/, ''));
    if (quantifier.match(/[0-9]+\-[0-9]+/)) {
        const parts = quantifier.split('-');
        startLevel = parseInt(parts[0]);
        endLevel = parseInt(parts[1]);
    }
    else if (action === '>=') {
        startLevel = levelInt;
        endLevel = finalSettings.max;
    }
    else if (action === '<=') {
        startLevel = 0;
        endLevel = levelInt;
    }
    else if (action === '=') {
        startLevel = levelInt;
        endLevel = levelInt;
    }
    else if (action === '<') {
        startLevel = 0;
        endLevel = levelInt - 1;
    }
    else if (action === '>') {
        startLevel = levelInt + 1;
        endLevel = finalSettings.max;
    }
    // add the wanted level(s) in the stack
    for (let i = startLevel; i <= endLevel; i++) {
        if (finalSettings.value) {
            finalArray.push(finalSettings.value(i));
        }
        else {
            finalArray.push(i);
        }
    }
    return finalArray;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFzQ2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FDcEMsVUFBMkIsRUFDM0IsUUFBMkM7SUFFM0MsTUFBTSxhQUFhLG1CQUNmLE1BQU0sRUFBRSxJQUFJLElBQ1QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUNGLElBQUksTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFFbEMsTUFBTSxVQUFVLEdBQVUsRUFBRSxDQUFDO0lBRTdCLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQ2hDLFVBQVUsR0FBRyxHQUFHLE1BQU0sR0FBRyxVQUFVLEVBQUUsQ0FBQztLQUN6QztJQUVELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxhQUFhLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtRQUMzRCxNQUFNLElBQUksS0FBSyxDQUNYLHNHQUFzRyxDQUN6RyxDQUFDO0tBQ0w7SUFFRCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3JELElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0I7SUFFRCxJQUFJLFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlELElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pDO1NBQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ3hCLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDdEIsUUFBUSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7S0FDaEM7U0FBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDeEIsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDdkI7U0FBTSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7UUFDdkIsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUN0QixRQUFRLEdBQUcsUUFBUSxDQUFDO0tBQ3ZCO1NBQU0sSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO1FBQ3ZCLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixRQUFRLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztLQUMzQjtTQUFNLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtRQUN2QixVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUMxQixRQUFRLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQztLQUNoQztJQUVELHVDQUF1QztJQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRTtZQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtLQUNKO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQyJ9