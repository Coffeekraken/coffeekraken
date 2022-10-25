// @ts-nocheck
import __isPlainObject from '../is/isPlainObject';
export default function __deepMerge(...args) {
    let finalSettings = {
        mergeArray: false,
    };
    // const potentialSettings = args[args.length - 1];
    // if (
    //     potentialSettings?.mergeArray !== undefined ||
    //     potentialSettings?.mergeGetterSource !== undefined
    // ) {
    //     finalSettings = {
    //         ...finalSettings,
    //         ...potentialSettings,
    //     };
    //     // remove the settings object from the merge process
    //     args = args.slice(0, -1);
    // }
    function merge(firstObj, secondObj) {
        const newObj = {};
        if (!firstObj && secondObj)
            return secondObj;
        if (!secondObj && firstObj)
            return firstObj;
        if (!firstObj && !secondObj)
            return {};
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
        // delete newObj.$source;
        // if (!newObj.$source) {
        //     Object.defineProperty(newObj, '$source', {
        //         enumerable: false,
        //         configurable: false,
        //         value: firstObj,
        //     });
        // }
        // Object.defineProperty(secondObj, 'plop', {
        //     value: 'yop',
        // });
        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            // if (finalSettings.mergeGetterSource && key === '$source') {
            //     return;
            // }
            const secondObjDesc = Object.getOwnPropertyDescriptor(secondObj, key);
            // const secondObjValue = secondObj[key];
            // delete secondObj[key];
            // Object.defineProperty(secondObj, key, {
            //     configurable: true,
            //     writable: true,
            //     value: secondObjValue,
            //     // get() {
            //     //     console.log('GET', key);
            //     //     return secondObjValue;
            //     // },
            // });
            // secondObjDesc.$source = secondObj.$source;
            if (secondObjDesc.set || secondObjDesc.get) {
                // const v = secondObj[key];
                // Object.defineProperty(newObj, key, {
                //     enumerable: true,
                //     writable: true,
                //     get() {
                //         console.log('GET', key, v);
                //         return v;
                //     },
                // });
                // if (finalSettings.mergeGetterSource) {
                //     Object.defineProperty(newObj, '$source', {
                //         enumerable: false,
                //         value: firstObj,
                //     });
                // }
                Object.defineProperty(newObj, key, secondObjDesc);
            }
            else if (finalSettings.mergeArray &&
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
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQXdDbEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsR0FBRyxJQUFJO0lBQ3ZDLElBQUksYUFBYSxHQUF1QjtRQUNwQyxVQUFVLEVBQUUsS0FBSztLQUNwQixDQUFDO0lBQ0YsbURBQW1EO0lBQ25ELE9BQU87SUFDUCxxREFBcUQ7SUFDckQseURBQXlEO0lBQ3pELE1BQU07SUFDTix3QkFBd0I7SUFDeEIsNEJBQTRCO0lBQzVCLGdDQUFnQztJQUNoQyxTQUFTO0lBQ1QsMkRBQTJEO0lBQzNELGdDQUFnQztJQUNoQyxJQUFJO0lBRUosU0FBUyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVM7UUFDOUIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUztZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFdkMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN2QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMvQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6QixpREFBaUQ7UUFDakQsNkJBQTZCO1FBQzdCLCtCQUErQjtRQUMvQiwyQkFBMkI7UUFDM0IsVUFBVTtRQUNWLElBQUk7UUFDSiw2Q0FBNkM7UUFDN0Msb0JBQW9CO1FBQ3BCLE1BQU07UUFFTixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3hCLDhEQUE4RDtZQUM5RCxjQUFjO1lBQ2QsSUFBSTtZQUVKLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FDakQsU0FBUyxFQUNULEdBQUcsQ0FDTixDQUFDO1lBRUYseUNBQXlDO1lBRXpDLHlCQUF5QjtZQUN6QiwwQ0FBMEM7WUFDMUMsMEJBQTBCO1lBQzFCLHNCQUFzQjtZQUN0Qiw2QkFBNkI7WUFDN0IsaUJBQWlCO1lBQ2pCLHNDQUFzQztZQUN0QyxvQ0FBb0M7WUFDcEMsWUFBWTtZQUNaLE1BQU07WUFFTiw2Q0FBNkM7WUFFN0MsSUFBSSxhQUFhLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3hDLDRCQUE0QjtnQkFDNUIsdUNBQXVDO2dCQUN2Qyx3QkFBd0I7Z0JBQ3hCLHNCQUFzQjtnQkFDdEIsY0FBYztnQkFDZCxzQ0FBc0M7Z0JBQ3RDLG9CQUFvQjtnQkFDcEIsU0FBUztnQkFDVCxNQUFNO2dCQUVOLHlDQUF5QztnQkFDekMsaURBQWlEO2dCQUNqRCw2QkFBNkI7Z0JBQzdCLDJCQUEyQjtnQkFDM0IsVUFBVTtnQkFDVixJQUFJO2dCQUVKLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUNyRDtpQkFBTSxJQUNILGFBQWEsQ0FBQyxVQUFVO2dCQUN4QixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDL0I7Z0JBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RDtpQkFBTSxJQUNILGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDakM7Z0JBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDOUM7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDIn0=