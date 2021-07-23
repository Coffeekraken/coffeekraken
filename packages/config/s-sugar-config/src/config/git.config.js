import __childProcess from 'child_process';
import __packageJson from '@coffeekraken/sugar/node/package/json';
export function prepare(config) {
    var _a, _b, _c;
    if (!((_a = config.repo) === null || _a === void 0 ? void 0 : _a.url)) {
        const packageJson = __packageJson();
        if (packageJson.repository.url) {
            config.repo.url = packageJson.repository.url;
        }
        else {
            const url = __childProcess.execSync('git config --get remote.origin.url').toString().trim();
            config.repo.url = url;
        }
    }
    if (!((_b = config.user) === null || _b === void 0 ? void 0 : _b.name)) {
        const name = __childProcess.execSync('git config --get user.name').toString().trim();
        config.user.name = name;
    }
    if (!((_c = config.user) === null || _c === void 0 ? void 0 : _c.email)) {
        const email = __childProcess.execSync('git config --get user.email').toString().trim();
        config.user.email = email;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sYUFBYSxNQUFNLHVDQUF1QyxDQUFDO0FBRWxFLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTTs7SUFDMUIsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsSUFBSSwwQ0FBRSxHQUFHLENBQUEsRUFBRTtRQUNuQixNQUFNLFdBQVcsR0FBRyxhQUFhLEVBQUUsQ0FBQztRQUNwQyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1NBQ2hEO2FBQU07WUFDSCxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUYsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ3pCO0tBQ0o7SUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLElBQUksQ0FBQSxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7S0FDM0I7SUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLEtBQUssQ0FBQSxFQUFFO1FBQ3JCLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2RixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDN0I7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsZUFBZTtJQUNYLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLFNBQVM7S0FDbkI7SUFDRCxJQUFJLEVBQUU7UUFDRixHQUFHLEVBQUUsU0FBUztLQUNqQjtDQUNKLENBQUEifQ==