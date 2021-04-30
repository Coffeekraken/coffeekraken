"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
exports.default = {
    css: {
        main: {
            id: 'main',
            defer: true,
            path: `${s_sugar_config_1.default('storage.distDir')}/css/index.css`
        }
    },
    js: {
        main: {
            type: 'module',
            id: 'main',
            defer: true,
            path: `${s_sugar_config_1.default('storage.distDir')}/js/index.bundle.js`
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFzc2V0cy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRkFBeUQ7QUFFekQsa0JBQWU7SUFDYixHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDSixFQUFFLEVBQUUsTUFBTTtZQUNWLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLEdBQUcsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0I7U0FDMUQ7S0FDRjtJQUNELEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsRUFBRSxFQUFFLE1BQU07WUFDVixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxHQUFHLHdCQUFhLENBQUMsaUJBQWlCLENBQUMscUJBQXFCO1NBQy9EO0tBQ0Y7Q0FDRixDQUFDIn0=