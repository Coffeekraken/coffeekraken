// @ts-nocheck
import __isClassInstance from '../is/isClassInstance';
import __isPlainObject from '../is/isPlainObject';
import __deepMerge from '../object/deepMerge';
import __clone from './clone';
export default function __deepMap(objectOrArray, processor, settings, _path = []) {
    settings = __deepMerge({
        classInstances: false,
        array: true,
        clone: false,
        privateProps: true,
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : settings.clone
            ? __clone(objectOrArray, { deep: true })
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if (__isPlainObject(objectOrArray[prop]) ||
            (__isClassInstance(objectOrArray[prop]) &&
                settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = __deepMap(objectOrArray[prop], processor, Object.assign(Object.assign({}, settings), { clone: false }), [..._path, prop]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGlCQUFpQixNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sZUFBZSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQWlEOUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQzdCLGFBQWtCLEVBQ2xCLFNBQW9CLEVBQ3BCLFFBQTZCLEVBQzdCLEtBQUssR0FBRyxFQUFFO0lBRVYsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxjQUFjLEVBQUUsS0FBSztRQUNyQixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxLQUFLO1FBQ1osWUFBWSxFQUFFLElBQUk7S0FDckIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFN0MsSUFBSSxTQUFTLEdBQUcsT0FBTztRQUNuQixDQUFDLENBQUMsRUFBRTtRQUNKLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSztZQUNoQixDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN4QyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBRXBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBRXZELElBQ0ksZUFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUM1QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUN4RDtZQUNFLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FDakIsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUNuQixTQUFTLGtDQUVGLFFBQVEsS0FDWCxLQUFLLEVBQUUsS0FBSyxLQUVoQixDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUNuQixDQUFDO1lBRUYsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QyxTQUFTLG1DQUNGLFNBQVMsR0FDVCxHQUFHLENBQ1QsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUN6QjthQUNKO1lBQ0QsT0FBTztTQUNWO1FBRUQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUk7WUFDSixLQUFLLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQztZQUMxQixJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ25DLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ1osT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO2FBQU07WUFDSCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4Qyw2QkFBNkI7Z0JBQzdCLFNBQVMsbUNBQ0YsU0FBUyxHQUNULEdBQUcsQ0FDVCxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=