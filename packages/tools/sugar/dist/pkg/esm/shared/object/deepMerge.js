// @ts-nocheck
import __isPlainObject from '../is/isPlainObject';
export default function __deepMerge(...args) {
    var _a;
    let settings = {}, hasSettings = false;
    const potentialSettings = (_a = args[args.length - 1]) !== null && _a !== void 0 ? _a : {};
    if (potentialSettings &&
        Object.keys(potentialSettings).length <= 2 &&
        (potentialSettings.array !== undefined ||
            potentialSettings.clone !== undefined)) {
        hasSettings = true;
        settings = potentialSettings;
    }
    let finalSettings = Object.assign({ array: false, clone: true }, settings);
    function merge(firstObj, secondObj) {
        const newObj = finalSettings.clone ? {} : firstObj;
        if (!secondObj)
            return firstObj;
        const firstProps = Object.getOwnPropertyNames(firstObj);
        firstProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(firstObj, key);
            if (desc.set || desc.get) {
                Object.defineProperty(newObj, key, desc);
            }
            else {
                newObj[key] = firstObj[key];
            }
        });
        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            const secondObjDesc = Object.getOwnPropertyDescriptor(secondObj, key);
            if (secondObjDesc.set || secondObjDesc.get) {
                Object.defineProperty(newObj, key, secondObjDesc);
            }
            else if (finalSettings.array &&
                Array.isArray(firstObj[key]) &&
                Array.isArray(secondObj[key])) {
                newObj[key] = [...firstObj[key], ...secondObj[key]];
            }
            else if (__isPlainObject(newObj[key]) &&
                __isPlainObject(secondObj[key])) {
                newObj[key] = merge(newObj[key], secondObj[key]);
            }
            else {
                newObj[key] = secondObj[key];
            }
        });
        return newObj;
    }
    if (hasSettings) {
        args.pop();
    }
    let currentObj = finalSettings.clone ? {} : args[0];
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQTZDbEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsR0FBRyxJQUFXOztJQUM5QyxJQUFJLFFBQVEsR0FBdUIsRUFBRSxFQUNqQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLE1BQU0saUJBQWlCLEdBQUcsTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBQ3RELElBQ0ksaUJBQWlCO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztRQUMxQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssS0FBSyxTQUFTO1lBQ2xDLGlCQUFpQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsRUFDNUM7UUFDRSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQztLQUNoQztJQUVELElBQUksYUFBYSxtQkFDYixLQUFLLEVBQUUsS0FBSyxFQUNaLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFFRixTQUFTLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUztRQUM5QixNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sUUFBUSxDQUFDO1FBRWhDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1RCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUNqRCxTQUFTLEVBQ1QsR0FBRyxDQUNOLENBQUM7WUFFRixJQUFJLGFBQWEsQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNLElBQ0gsYUFBYSxDQUFDLEtBQUs7Z0JBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUMvQjtnQkFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNLElBQ0gsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNqQztnQkFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNwRDtpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxXQUFXLEVBQUU7UUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDZDtJQUVELElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUMifQ==