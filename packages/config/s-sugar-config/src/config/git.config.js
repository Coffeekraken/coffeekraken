import __childProcess from 'child_process';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
export function prepare(config) {
    var _a, _b, _c, _d;
    try {
        if (!((_a = config.repo) === null || _a === void 0 ? void 0 : _a.url)) {
            const packageJson = __packageJsonSync();
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
export default function (env) {
    if (env.platform !== 'node')
        return {};
    return {
        user: {
            name: undefined,
            email: undefined,
        },
        repo: {
            url: undefined,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFFMUUsTUFBTSxVQUFVLE9BQU8sQ0FBQyxNQUFNOztJQUMxQixJQUFJO1FBQ0EsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsSUFBSSwwQ0FBRSxHQUFHLENBQUEsRUFBRTtZQUNuQixNQUFNLFdBQVcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3hDLElBQUksTUFBQSxXQUFXLENBQUMsVUFBVSwwQ0FBRSxHQUFHLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDNUYsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLElBQUksQ0FBQSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2RixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDN0I7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFFZCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFFdkMsT0FBTztRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxJQUFJLEVBQUU7WUFDRixHQUFHLEVBQUUsU0FBUztTQUNqQjtLQUNKLENBQUM7QUFDTixDQUFDIn0=