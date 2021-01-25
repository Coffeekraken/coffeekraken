"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// @ts-nocheck
const SBlessedStdio_1 = __importDefault(require("./blessed/SBlessedStdio"));
const STerminalStdio_1 = __importDefault(require("./terminal/STerminalStdio"));
const class_1 = __importDefault(require("../is/class"));
module.exports = (sources, settings = {}) => {
    if (!Array.isArray(sources))
        sources = [sources];
    let stdioInstance;
    if (class_1.default(settings.class)) {
        stdioInstance = new settings.class(this._sources, settings);
    }
    else if (typeof settings.type === 'string') {
        switch (settings.type) {
            case 'inherit':
            case 'terminal':
                stdioInstance = new STerminalStdio_1.default(sources, Object.assign({}, settings));
                break;
            case 'blessed':
                stdioInstance = new SBlessedStdio_1.default(sources, Object.assign(Object.assign({}, settings), { attach: true }));
                break;
            default:
                break;
        }
    }
    return stdioInstance;
    if (type === 'inherit') {
        // source.forEach((s) => {
        //   s.on(
        //     'log,*.log,warn,*.warn,error,*.error,reject,*.reject',
        //     (data, metas) => {
        //       if (!data) return;
        //       if (data.type) {
        //         let value = data.value;
        //         if (typeof value === 'string') {
        //           value = __parseHtml(value);
        //         } else if (value) {
        //           value = __toString(value);
        //         }
        //         switch (data.type) {
        //           case 'separator':
        //             const separator = data.separator
        //               ? data.separator.slice(0, 1)
        //               : '-';
        //             if (value) {
        //               console.log(
        //                 '\n' +
        //                   __parseHtml(
        //                     `${value} ${separator.repeat(
        //                       process.stdout.columns - __countLine(value) - 1
        //                     )}`
        //                   )
        //               );
        //             } else {
        //               console.log(
        //                 '\n' + __parseHtml(separator.repeat(process.stdout.columns))
        //               );
        //             }
        //             break;
        //         }
        //       } else {
        //         let value = data.value !== undefined ? data.value : data;
        //         if (typeof value === 'string') {
        //           value = __parseHtml(value);
        //         } else {
        //           value = __toString(value);
        //         }
        //         console.log(value);
        //       }
        //     }
        //   );
        // });
        // return undefined;
    }
    else if (class_1.default(stdio)) {
        // @ts-ignore
        return new stdio(source, settings);
    }
    else if (type === 'blessed') {
        return new SBlessedStdio_1.default(source, settings);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsY0FBYztBQUNkLDRFQUFzRDtBQUN0RCwrRUFBeUQ7QUFDekQsd0RBQW9DO0FBOEJwQyxpQkFBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFakQsSUFBSSxhQUFrQixDQUFDO0lBRXZCLElBQUksZUFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM3QixhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDN0Q7U0FBTSxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUMsUUFBUSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ3JCLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxVQUFVO2dCQUNiLGFBQWEsR0FBRyxJQUFJLHdCQUFnQixDQUFDLE9BQU8sb0JBQ3ZDLFFBQVEsRUFDWCxDQUFDO2dCQUNILE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osYUFBYSxHQUFHLElBQUksdUJBQWUsQ0FBQyxPQUFPLGtDQUN0QyxRQUFRLEtBQ1gsTUFBTSxFQUFFLElBQUksSUFDWixDQUFDO2dCQUNILE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7S0FDRjtJQUVELE9BQU8sYUFBYSxDQUFDO0lBRXJCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QiwwQkFBMEI7UUFDMUIsVUFBVTtRQUNWLDZEQUE2RDtRQUM3RCx5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUN6QixrQ0FBa0M7UUFDbEMsMkNBQTJDO1FBQzNDLHdDQUF3QztRQUN4Qyw4QkFBOEI7UUFDOUIsdUNBQXVDO1FBQ3ZDLFlBQVk7UUFDWiwrQkFBK0I7UUFDL0IsOEJBQThCO1FBQzlCLCtDQUErQztRQUMvQyw2Q0FBNkM7UUFDN0MsdUJBQXVCO1FBQ3ZCLDJCQUEyQjtRQUMzQiw2QkFBNkI7UUFDN0IseUJBQXlCO1FBQ3pCLGlDQUFpQztRQUNqQyxvREFBb0Q7UUFDcEQsd0VBQXdFO1FBQ3hFLDBCQUEwQjtRQUMxQixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsK0VBQStFO1FBQy9FLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsb0VBQW9FO1FBQ3BFLDJDQUEyQztRQUMzQyx3Q0FBd0M7UUFDeEMsbUJBQW1CO1FBQ25CLHVDQUF1QztRQUN2QyxZQUFZO1FBQ1osOEJBQThCO1FBQzlCLFVBQVU7UUFDVixRQUFRO1FBQ1IsT0FBTztRQUNQLE1BQU07UUFDTixvQkFBb0I7S0FDckI7U0FBTSxJQUFJLGVBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixhQUFhO1FBQ2IsT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDN0IsT0FBTyxJQUFJLHVCQUFlLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzlDO0FBQ0gsQ0FBQyxDQUFDIn0=