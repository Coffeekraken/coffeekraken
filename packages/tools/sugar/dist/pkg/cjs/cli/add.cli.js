"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const prependToFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/prependToFileSync"));
const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const detectType_1 = __importDefault(require("@coffeekraken/sugar/node/project/detectType"));
const fs_1 = __importDefault(require("fs"));
const SSugarToolkitParamsInterface_1 = __importDefault(require("./interface/SSugarToolkitParamsInterface"));
exports.default = (stringArgs = '') => {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const finalParams = SSugarToolkitParamsInterface_1.default.apply(stringArgs);
        const rootPath = (0, packageRoot_1.default)(process.cwd());
        const projectType = (0, detectType_1.default)(rootPath);
        emit('log', {
            value: `<yellow>${projectType.type}</yellow> project detected in version <cyan>${projectType.version}</cyan>`,
        });
        // installing the actual package
        emit('log', {
            value: `Installing the actual <cyan>@coffeekraken/sugar</cyan>...`,
        });
        try {
            yield pipe((0, install_1.default)('@coffeekraken/sugar'));
        }
        catch (e) {
            emit('log', {
                value: `Something went wrong when installing the @coffeekraken/sugar package. Please try to install it manually.`,
            });
        }
        // pleasant css syntax
        if (yield emit('ask', {
            type: 'confirm',
            message: `Add the <yellow>pleasant css syntax</yellow> support`,
            default: true,
        })) {
            switch (projectType.type) {
                case 'next':
                    console.log('adding to next');
                    // adding the js needed
                    fs_1.default.writeFileSync(`${rootPath}/pages/_sugar.ts`, [
                        `import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';`,
                        `if (typeof window === 'object') {`,
                        `   __expandPleasantCssClassnamesLive();`,
                        `}`,
                    ].join('\n'));
                    // adding the≤ import in the _app.tsx file
                    (0, prependToFileSync_1.default)(`${rootPath}/pages/_app.tsx`, ["import './_sugar';"].join('\n'));
                    break;
            }
        }
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCxzR0FBZ0Y7QUFDaEYsbUZBQWdFO0FBQ2hFLDRGQUFzRTtBQUN0RSw2RkFBOEU7QUFDOUUsNENBQXNCO0FBQ3RCLDRHQUFzRjtBQUV0RixrQkFBZSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUMvQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxNQUFNLFdBQVcsR0FBRyxzQ0FBOEIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckUsTUFBTSxRQUFRLEdBQUcsSUFBQSxxQkFBYSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sV0FBVyxHQUFHLElBQUEsb0JBQW1CLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSxXQUFXLFdBQVcsQ0FBQyxJQUFJLCtDQUErQyxXQUFXLENBQUMsT0FBTyxTQUFTO1NBQ2hILENBQUMsQ0FBQztRQUVILGdDQUFnQztRQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLDJEQUEyRDtTQUNyRSxDQUFDLENBQUM7UUFDSCxJQUFJO1lBQ0EsTUFBTSxJQUFJLENBQUMsSUFBQSxpQkFBWSxFQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztTQUNuRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsMEdBQTBHO2FBQ3BILENBQUMsQ0FBQztTQUNOO1FBRUQsc0JBQXNCO1FBQ3RCLElBQ0ksTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUsc0RBQXNEO1lBQy9ELE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUMsRUFDSjtZQUNFLFFBQVEsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDdEIsS0FBSyxNQUFNO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDOUIsdUJBQXVCO29CQUN2QixZQUFJLENBQUMsYUFBYSxDQUNkLEdBQUcsUUFBUSxrQkFBa0IsRUFDN0I7d0JBQ0ksOEdBQThHO3dCQUM5RyxtQ0FBbUM7d0JBQ25DLHlDQUF5Qzt3QkFDekMsR0FBRztxQkFDTixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZixDQUFDO29CQUNGLDBDQUEwQztvQkFDMUMsSUFBQSwyQkFBbUIsRUFDZixHQUFHLFFBQVEsaUJBQWlCLEVBQzVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BDLENBQUM7b0JBQ0YsTUFBTTthQUNiO1NBQ0o7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==