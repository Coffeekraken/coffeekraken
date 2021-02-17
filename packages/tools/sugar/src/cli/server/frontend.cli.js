"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SFrontendServerProcess_1 = __importDefault(require("../../node/server/frontend/SFrontendServerProcess"));
exports.default = (stringArgs = '') => {
    // const manager = new __SProcessManager(, {
    //   autoRun: true,
    //   processSettings: {
    //     runAsChild: true
    //   }
    // });
    const pro = new SFrontendServerProcess_1.default({}, {
        process: {
            runAsChild: false,
            stdio: 'inherit'
        }
    });
    pro.run();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtHQUF5RjtBQUd6RixrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNqQyw0Q0FBNEM7SUFDNUMsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2Qix1QkFBdUI7SUFDdkIsTUFBTTtJQUNOLE1BQU07SUFFTixNQUFNLEdBQUcsR0FBRyxJQUFJLGdDQUF3QixDQUN0QyxFQUFFLEVBQ0Y7UUFDRSxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsS0FBSztZQUNqQixLQUFLLEVBQUUsU0FBUztTQUNqQjtLQUNGLENBQ0YsQ0FBQztJQUNGLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQyJ9