"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBlessedStdio_1 = __importDefault(require("./blessed/SBlessedStdio"));
const STerminalStdio_1 = __importDefault(require("./terminal/STerminalStdio"));
const class_1 = __importDefault(require("../is/class"));
const path_1 = __importDefault(require("../is/path"));
module.exports = (sources, stdio, settings = {}) => {
    if (!Array.isArray(sources))
        sources = [sources];
    let stdioInstance;
    if (class_1.default(stdio)) {
        stdioInstance = new stdio(sources, settings);
    }
    else if (path_1.default(stdio, true)) {
        const Cls = require(stdio);
        stdioInstance = new Cls(sources, settings);
    }
    else if (typeof stdio === 'string') {
        switch (stdio) {
            case 'inherit':
            case 'terminal':
                stdioInstance = new STerminalStdio_1.default(sources, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNEVBQXNEO0FBQ3RELCtFQUF5RDtBQUN6RCx3REFBb0M7QUFDcEMsc0RBQWtDO0FBOEJsQyxpQkFBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpELElBQUksYUFBa0IsQ0FBQztJQUV2QixJQUFJLGVBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNwQixhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzlDO1NBQU0sSUFBSSxjQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzVDO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDcEMsUUFBUSxLQUFLLEVBQUU7WUFDYixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssVUFBVTtnQkFDYixhQUFhLEdBQUcsSUFBSSx3QkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3hELE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osYUFBYSxHQUFHLElBQUksdUJBQWUsQ0FBQyxPQUFPLGtDQUN0QyxRQUFRLEtBQ1gsTUFBTSxFQUFFLElBQUksSUFDWixDQUFDO2dCQUNILE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7S0FDRjtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyJ9