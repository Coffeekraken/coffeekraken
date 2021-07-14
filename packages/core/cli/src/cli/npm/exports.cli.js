"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
function default_1(stringArgs = '') {
    const packageJsonExports = {
    // node: {},
    // default: {}
    };
    const packageJson = require(`${packageRoot_1.default()}/package.json`);
    glob_1.default
        .sync('src/js/**/*.js', {
        cwd: packageRoot_1.default(),
        ignore: [
            '__wip__',
            '**/__wip__/**',
            '__tests__',
            '**/__tests__/**',
            '__tests__.wip',
            '**/__tests__.wip/**'
        ]
    })
        .forEach((path) => {
        return;
        //   packageJsonExports.default[
        //     path.replace('src/js/', './').replace(/\.js$/, '')
        //   ] = `./${path}`;
        // packageJsonExports.default[path.replace('src/js/', './')] = `./${path}`;
    });
    glob_1.default
        .sync('src/node/**/*.js', {
        cwd: packageRoot_1.default(),
        ignore: [
            '__wip__',
            '**/__wip__/**',
            '__tests__',
            '**/__tests__/**',
            '__tests__.wip',
            '**/__tests__.wip/**'
        ]
    })
        .forEach((path) => {
        packageJsonExports[path.replace('src/node/', './').replace(/\.js$/, '')] = `./${path}`;
        // packageJsonExports.default[path.replace('src/js/', './')] = `./${path}`;
    });
    packageJson.exports = Object.assign(Object.assign({}, packageJsonExports), (packageJson._exports || {}));
    fs_1.default.writeFileSync(`${packageRoot_1.default()}/package.json`, JSON.stringify(packageJson, null, 4));
    console.log(packageJson);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0cy5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHBvcnRzLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUEwQjtBQUMxQiw4RUFBd0Q7QUFDeEQsNENBQXNCO0FBRXRCLG1CQUF5QixVQUFVLEdBQUcsRUFBRTtJQUN0QyxNQUFNLGtCQUFrQixHQUFHO0lBQ3pCLFlBQVk7SUFDWixjQUFjO0tBQ2YsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLHFCQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFFL0QsY0FBTTtTQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUN0QixHQUFHLEVBQUUscUJBQWEsRUFBRTtRQUNwQixNQUFNLEVBQUU7WUFDTixTQUFTO1lBQ1QsZUFBZTtZQUNmLFdBQVc7WUFDWCxpQkFBaUI7WUFDakIsZUFBZTtZQUNmLHFCQUFxQjtTQUN0QjtLQUNGLENBQUM7U0FDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNoQixPQUFPO1FBQ1AsZ0NBQWdDO1FBQ2hDLHlEQUF5RDtRQUN6RCxxQkFBcUI7UUFDckIsMkVBQTJFO0lBQzdFLENBQUMsQ0FBQyxDQUFDO0lBRUwsY0FBTTtTQUNILElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUN4QixHQUFHLEVBQUUscUJBQWEsRUFBRTtRQUNwQixNQUFNLEVBQUU7WUFDTixTQUFTO1lBQ1QsZUFBZTtZQUNmLFdBQVc7WUFDWCxpQkFBaUI7WUFDakIsZUFBZTtZQUNmLHFCQUFxQjtTQUN0QjtLQUNGLENBQUM7U0FDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNoQixrQkFBa0IsQ0FDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FDckQsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2hCLDJFQUEyRTtJQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVMLFdBQVcsQ0FBQyxPQUFPLG1DQUNkLGtCQUFrQixHQUNsQixDQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ2hDLENBQUM7SUFFRixZQUFJLENBQUMsYUFBYSxDQUNoQixHQUFHLHFCQUFhLEVBQUUsZUFBZSxFQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ3JDLENBQUM7SUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUExREQsNEJBMERDIn0=