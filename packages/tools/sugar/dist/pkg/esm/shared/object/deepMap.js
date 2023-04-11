// @ts-nocheck
import __isClassInstance from '../is/isClassInstance';
import __isPlainObject from '../is/isPlainObject';
import __deepMerge from '../object/deepMerge';
export default function __deepMap(objectOrArray, processor, settings, _path = []) {
    settings = __deepMerge({
        classInstances: false,
        array: true,
        cloneFirst: false,
        privateProps: true,
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : settings.cloneFirst
            ? Object.assign({}, objectOrArray)
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if (__isPlainObject(objectOrArray[prop]) ||
            (__isClassInstance(objectOrArray[prop]) &&
                settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = __deepMap(objectOrArray[prop], processor, settings, [
                ..._path,
                prop,
            ]);
            if (isArray) {
                newObject.push(res);
            }
            else {
                if (prop === '...' && __isPlainObject(res)) {
                    newObject = Object.assign(Object.assign({}, newObject), res);
                }
                else {
                    newObject[prop] = res;
                }
            }
            return;
        }
        const res = processor({
            object: objectOrArray,
            prop,
            value: objectOrArray[prop],
            path: [..._path, prop].join('.'),
        });
        if (res === -1) {
            delete newObject[prop];
            return;
        }
        if (isArray) {
            newObject.push(res);
        }
        else {
            if (prop === '...' && __isPlainObject(res)) {
                // console.log('DEFEF', res);
                newObject = Object.assign(Object.assign({}, newObject), res);
            }
            else {
                newObject[prop] = res;
            }
        }
    });
    return newObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGlCQUFpQixNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sZUFBZSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBaUQ5QyxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FDN0IsYUFBa0IsRUFDbEIsU0FBb0IsRUFDcEIsUUFBNkIsRUFDN0IsS0FBSyxHQUFHLEVBQUU7SUFFVixRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLGNBQWMsRUFBRSxLQUFLO1FBQ3JCLEtBQUssRUFBRSxJQUFJO1FBQ1gsVUFBVSxFQUFFLEtBQUs7UUFDakIsWUFBWSxFQUFFLElBQUk7S0FDckIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFN0MsSUFBSSxTQUFTLEdBQUcsT0FBTztRQUNuQixDQUFDLENBQUMsRUFBRTtRQUNKLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVTtZQUNyQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFFcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU87UUFFdkQsSUFDSSxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQzVCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ3hEO1lBQ0UsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO2dCQUM1RCxHQUFHLEtBQUs7Z0JBQ1IsSUFBSTthQUNQLENBQUMsQ0FBQztZQUVILElBQUksT0FBTyxFQUFFO2dCQUNULFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDeEMsU0FBUyxtQ0FDRixTQUFTLEdBQ1QsR0FBRyxDQUNULENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztpQkFDekI7YUFDSjtZQUNELE9BQU87U0FDVjtRQUVELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNsQixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJO1lBQ0osS0FBSyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDMUIsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuQyxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNaLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0gsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDeEMsNkJBQTZCO2dCQUM3QixTQUFTLG1DQUNGLFNBQVMsR0FDVCxHQUFHLENBQ1QsQ0FBQzthQUNMO2lCQUFNO2dCQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9