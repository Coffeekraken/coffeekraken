"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function detectProjectType(cwd = process.cwd()) {
    const packageJson = JSON.parse(fs_1.default.readFileSync(`${cwd}/package.json`, 'utf8').toString());
    // detecting the package type (next, generic, etc...)
    if (fs_1.default.existsSync(`${cwd}/next.config.js`)) {
        const version = packageJson.dependencies.next.replace(/\^/, '');
        return {
            type: 'next',
            version,
            rawVersion: packageJson.dependencies.next,
            major: parseInt(version.split('.')[0]),
            minor: parseInt(version.split('.')[1]),
            fix: parseInt(version.split('.')[2]),
        };
    }
    // detect sugar projects
    if (fs_1.default.existsSync(`${cwd}/sugar.json`)) {
        let sugarVersion;
        for (let [packageName, version] of Object.entries(packageJson.dependencies)) {
            if (packageName.match(/^@coffeekraken\//)) {
                sugarVersion = version;
                break;
            }
        }
        if (sugarVersion) {
            return {
                type: 'sugar',
                version: sugarVersion,
                rawVersion: packageJson.dependencies.next,
                major: parseInt(sugarVersion.split('.')[0]),
                minor: parseInt(sugarVersion.split('.')[1]),
                fix: parseInt(sugarVersion.split('.')[2]),
            };
        }
    }
    return {
        type: 'unknown',
        version: '1.0.0',
        rawVersion: '1.0.0',
        major: 1,
        minor: 0,
        fix: 0,
    };
}
exports.default = detectProjectType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBa0N0QixTQUF3QixpQkFBaUIsQ0FDckMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7SUFFbkIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDMUIsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUM5RCxDQUFDO0lBRUYscURBQXFEO0lBQ3JELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsRUFBRTtRQUMxQyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWhFLE9BQU87WUFDSCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU87WUFDUCxVQUFVLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJO1lBQ3pDLEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxLQUFLLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDLENBQUM7S0FDTDtJQUVELHdCQUF3QjtJQUN4QixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxFQUFFO1FBQ3RDLElBQUksWUFBWSxDQUFDO1FBQ2pCLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUM3QyxXQUFXLENBQUMsWUFBWSxDQUMzQixFQUFFO1lBQ0MsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3ZDLFlBQVksR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxZQUFZLEVBQUU7WUFDZCxPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixVQUFVLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJO2dCQUN6QyxLQUFLLEVBQUUsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEtBQUssRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsR0FBRyxFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVDLENBQUM7U0FDTDtLQUNKO0lBRUQsT0FBTztRQUNILElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLE9BQU87UUFDaEIsVUFBVSxFQUFFLE9BQU87UUFDbkIsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsQ0FBQztRQUNSLEdBQUcsRUFBRSxDQUFDO0tBQ1QsQ0FBQztBQUNOLENBQUM7QUFwREQsb0NBb0RDIn0=