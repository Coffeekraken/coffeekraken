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
            path: `${s_sugar_config_1.default('storage.srcDir')}/css/index.css`,
            dev: {
                path: `${s_sugar_config_1.default('storage.srcDir')}/css/index.css`
            }
        }
    },
    js: {
        main: {
            id: 'main',
            type: 'module',
            defer: true,
            path: `${s_sugar_config_1.default('storage.distDir')}/js/index.js`,
            dev: {
                path: `${s_sugar_config_1.default('storage.srcDir')}/js/index.ts`
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFzc2V0cy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRkFBeUQ7QUFFekQsa0JBQWU7SUFDYixHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDSixFQUFFLEVBQUUsTUFBTTtZQUNWLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLEdBQUcsd0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0I7WUFDeEQsR0FBRyxFQUFFO2dCQUNILElBQUksRUFBRSxHQUFHLHdCQUFhLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCO2FBQ3pEO1NBQ0Y7S0FDRjtJQUNELEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxHQUFHLHdCQUFhLENBQUMsaUJBQWlCLENBQUMsY0FBYztZQUN2RCxHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLEdBQUcsd0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjO2FBQ3ZEO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==