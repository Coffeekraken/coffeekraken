import __childProcess from 'child_process';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
export function postprocess(env, config) {
    var _a, _b, _c, _d;
    try {
        if (!((_a = config.repo) === null || _a === void 0 ? void 0 : _a.url)) {
            const packageJson = __packageJsonSync();
            if ((_b = packageJson.repository) === null || _b === void 0 ? void 0 : _b.url) {
                config.repo.url = packageJson.repository.url;
            }
            else {
                const url = __childProcess
                    .execSync('git config --get remote.origin.url')
                    .toString()
                    .trim();
                config.repo.url = url;
            }
        }
        if (!((_c = config.user) === null || _c === void 0 ? void 0 : _c.name)) {
            const name = __childProcess
                .execSync('git config --get user.name')
                .toString()
                .trim();
            config.user.name = name;
        }
        if (!((_d = config.user) === null || _d === void 0 ? void 0 : _d.email)) {
            const email = __childProcess
                .execSync('git config --get user.email')
                .toString()
                .trim();
            config.user.email = email;
        }
    }
    catch (e) { }
    return config;
}
export default function (env) {
    if (env.platform !== 'node')
        return;
    return {
        user: {
            /**
             * @name            name
             * @namespace       config.git.user
             * @type            String
             * @default         undefined
             *
             * Specify the git user name. Usually taken automatically from your git configuration
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            name: undefined,
            /**
             * @name            email
             * @namespace       config.git.user
             * @type            String
             * @default         undefined
             *
             * Specify the git email. Usually taken automatically from your git configuration
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            email: undefined,
        },
        repo: {
            /**
             * @name            url
             * @namespace       config.git.repo
             * @type            String
             * @default         undefined
             *
             * Specify the git repository url. Usually taken automatically from your git repo config
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            url: undefined,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFFMUUsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTTs7SUFDbkMsSUFBSTtRQUNBLElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsR0FBRyxDQUFBLEVBQUU7WUFDbkIsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztZQUN4QyxJQUFJLE1BQUEsV0FBVyxDQUFDLFVBQVUsMENBQUUsR0FBRyxFQUFFO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQzthQUNoRDtpQkFBTTtnQkFDSCxNQUFNLEdBQUcsR0FBRyxjQUFjO3FCQUNyQixRQUFRLENBQUMsb0NBQW9DLENBQUM7cUJBQzlDLFFBQVEsRUFBRTtxQkFDVixJQUFJLEVBQUUsQ0FBQztnQkFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDekI7U0FDSjtRQUNELElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsSUFBSSxDQUFBLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEdBQUcsY0FBYztpQkFDdEIsUUFBUSxDQUFDLDRCQUE0QixDQUFDO2lCQUN0QyxRQUFRLEVBQUU7aUJBQ1YsSUFBSSxFQUFFLENBQUM7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLEtBQUssQ0FBQSxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLGNBQWM7aUJBQ3ZCLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztpQkFDdkMsUUFBUSxFQUFFO2lCQUNWLElBQUksRUFBRSxDQUFDO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQzdCO0tBQ0o7SUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBRWQsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFcEMsT0FBTztRQUNILElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsU0FBUztZQUNmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsU0FBUztTQUNuQjtRQUNELElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsU0FBUztTQUNqQjtLQUNKLENBQUM7QUFDTixDQUFDIn0=