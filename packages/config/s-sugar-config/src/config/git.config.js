import __childProcess from 'child_process';
import __packageJson from '@coffeekraken/sugar/node/package/json';
export function prepare(config) {
    var _a, _b, _c, _d;
    try {
        if (!((_a = config.repo) === null || _a === void 0 ? void 0 : _a.url)) {
            const packageJson = __packageJson();
            if ((_b = packageJson.repository) === null || _b === void 0 ? void 0 : _b.url) {
                config.repo.url = packageJson.repository.url;
            }
            else {
                const url = __childProcess.execSync('git config --get remote.origin.url').toString().trim();
                config.repo.url = url;
            }
        }
        if (!((_c = config.user) === null || _c === void 0 ? void 0 : _c.name)) {
            const name = __childProcess.execSync('git config --get user.name').toString().trim();
            config.user.name = name;
        }
        if (!((_d = config.user) === null || _d === void 0 ? void 0 : _d.email)) {
            const email = __childProcess.execSync('git config --get user.email').toString().trim();
            config.user.email = email;
        }
    }
    catch (e) { }
    return config;
}
export default {
    user: {
        name: undefined,
        email: undefined
    },
    repo: {
        url: undefined
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLHVDQUF1QyxDQUFDO0FBRWxFLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTTs7SUFDMUIsSUFBSTtRQUNBLElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsR0FBRyxDQUFBLEVBQUU7WUFDbkIsTUFBTSxXQUFXLEdBQUcsYUFBYSxFQUFFLENBQUM7WUFDcEMsSUFBSSxNQUFBLFdBQVcsQ0FBQyxVQUFVLDBDQUFFLEdBQUcsRUFBRTtnQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0gsTUFBTSxHQUFHLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUM1RixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDekI7U0FDSjtRQUNELElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsSUFBSSxDQUFBLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsS0FBSyxDQUFBLEVBQUU7WUFDckIsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM3QjtLQUNKO0lBQUMsT0FBTSxDQUFDLEVBQUUsR0FBRTtJQUViLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxlQUFlO0lBQ1gsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsU0FBUztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNGLEdBQUcsRUFBRSxTQUFTO0tBQ2pCO0NBQ0osQ0FBQSJ9