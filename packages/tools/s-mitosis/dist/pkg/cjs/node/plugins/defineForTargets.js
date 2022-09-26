"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
exports.default = (cb, targets) => {
    let finalConfig = {};
    targets.forEach((target) => {
        finalConfig = (0, object_1.__deepMerge)(finalConfig, {
            [target]: cb(target),
        });
    });
    console.log(finalConfig);
    return finalConfig;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQXlEO0FBRXpELGtCQUFlLENBQUMsRUFBWSxFQUFFLE9BQWlCLEVBQU8sRUFBRTtJQUNwRCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3ZCLFdBQVcsR0FBRyxJQUFBLG9CQUFXLEVBQUMsV0FBVyxFQUFFO1lBQ25DLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUN2QixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFekIsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQyxDQUFDIn0=