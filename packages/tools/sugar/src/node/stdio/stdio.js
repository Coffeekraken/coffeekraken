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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsY0FBYztBQUNkLDRFQUFzRDtBQUN0RCwrRUFBeUQ7QUFDekQsd0RBQW9DO0FBOEJwQyxpQkFBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFakQsSUFBSSxhQUFrQixDQUFDO0lBRXZCLElBQUksZUFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM3QixhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDN0Q7U0FBTSxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUMsUUFBUSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ3JCLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxVQUFVO2dCQUNiLGFBQWEsR0FBRyxJQUFJLHdCQUFnQixDQUFDLE9BQU8sb0JBQ3ZDLFFBQVEsRUFDWCxDQUFDO2dCQUNILE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osYUFBYSxHQUFHLElBQUksdUJBQWUsQ0FBQyxPQUFPLGtDQUN0QyxRQUFRLEtBQ1gsTUFBTSxFQUFFLElBQUksSUFDWixDQUFDO2dCQUNILE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7S0FDRjtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyJ9