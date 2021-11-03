import __childProcess from 'child_process';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
export function postprocess(config) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFFMUUsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFNOztJQUM5QixJQUFJO1FBQ0EsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsSUFBSSwwQ0FBRSxHQUFHLENBQUEsRUFBRTtZQUNuQixNQUFNLFdBQVcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3hDLElBQUksTUFBQSxXQUFXLENBQUMsVUFBVSwwQ0FBRSxHQUFHLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxHQUFHLGNBQWM7cUJBQ3JCLFFBQVEsQ0FBQyxvQ0FBb0MsQ0FBQztxQkFDOUMsUUFBUSxFQUFFO3FCQUNWLElBQUksRUFBRSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzthQUN6QjtTQUNKO1FBQ0QsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsSUFBSSwwQ0FBRSxJQUFJLENBQUEsRUFBRTtZQUNwQixNQUFNLElBQUksR0FBRyxjQUFjO2lCQUN0QixRQUFRLENBQUMsNEJBQTRCLENBQUM7aUJBQ3RDLFFBQVEsRUFBRTtpQkFDVixJQUFJLEVBQUUsQ0FBQztZQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsS0FBSyxDQUFBLEVBQUU7WUFDckIsTUFBTSxLQUFLLEdBQUcsY0FBYztpQkFDdkIsUUFBUSxDQUFDLDZCQUE2QixDQUFDO2lCQUN2QyxRQUFRLEVBQUU7aUJBQ1YsSUFBSSxFQUFFLENBQUM7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDN0I7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFFZCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxTQUFTO1lBQ2Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxTQUFTO1NBQ25CO1FBQ0QsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILEdBQUcsRUFBRSxTQUFTO1NBQ2pCO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==