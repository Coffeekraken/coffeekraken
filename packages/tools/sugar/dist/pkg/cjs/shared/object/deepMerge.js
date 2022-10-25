"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __importDefault(require("../is/isPlainObject"));
function __deepMerge(...args) {
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
            else if ((0, isPlainObject_1.default)(newObj[key]) &&
                (0, isPlainObject_1.default)(secondObj[key])) {
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
exports.default = __deepMerge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFrRDtBQXdDbEQsU0FBd0IsV0FBVyxDQUFDLEdBQUcsSUFBSTtJQUN2QyxJQUFJLGFBQWEsR0FBdUI7UUFDcEMsVUFBVSxFQUFFLEtBQUs7S0FDcEIsQ0FBQztJQUNGLG1EQUFtRDtJQUNuRCxPQUFPO0lBQ1AscURBQXFEO0lBQ3JELHlEQUF5RDtJQUN6RCxNQUFNO0lBQ04sd0JBQXdCO0lBQ3hCLDRCQUE0QjtJQUM1QixnQ0FBZ0M7SUFDaEMsU0FBUztJQUNULDJEQUEyRDtJQUMzRCxnQ0FBZ0M7SUFDaEMsSUFBSTtJQUVKLFNBQVMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTO1FBQzlCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVM7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVE7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXZDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1RCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMs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