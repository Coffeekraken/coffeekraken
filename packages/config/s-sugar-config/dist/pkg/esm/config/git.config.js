import { __packageJsonSync } from '@coffeekraken/sugar/package';
import __childProcess from 'child_process';
export function postprocess(api) {
    var _a, _b, _c, _d;
    try {
        if (!((_a = api.this.repo) === null || _a === void 0 ? void 0 : _a.url)) {
            const packageJson = __packageJsonSync();
            if ((_b = packageJson.repository) === null || _b === void 0 ? void 0 : _b.url) {
                api.this.repo.url = packageJson.repository.url;
            }
            else {
                const url = __childProcess
                    .execSync('git config --get remote.origin.url')
                    .toString()
                    .trim();
                api.this.repo.url = url;
            }
        }
        if (!((_c = api.this.user) === null || _c === void 0 ? void 0 : _c.name)) {
            const name = __childProcess
                .execSync('git config --get user.name')
                .toString()
                .trim();
            api.this.user.name = name;
        }
        if (!((_d = api.this.user) === null || _d === void 0 ? void 0 : _d.email)) {
            const email = __childProcess
                .execSync('git config --get user.email')
                .toString()
                .trim();
            api.this.user.email = email;
        }
    }
    catch (e) { }
    return api.this;
}
export default function (api) {
    if (api.env.platform !== 'node')
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            url: undefined,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUUzQyxNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQUc7O0lBQzNCLElBQUk7UUFDQSxJQUFJLENBQUMsQ0FBQSxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBRSxHQUFHLENBQUEsRUFBRTtZQUNyQixNQUFNLFdBQVcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3hDLElBQUksTUFBQSxXQUFXLENBQUMsVUFBVSwwQ0FBRSxHQUFHLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQzthQUNsRDtpQkFBTTtnQkFDSCxNQUFNLEdBQUcsR0FBRyxjQUFjO3FCQUNyQixRQUFRLENBQUMsb0NBQW9DLENBQUM7cUJBQzlDLFFBQVEsRUFBRTtxQkFDVixJQUFJLEVBQUUsQ0FBQztnQkFDWixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJLENBQUEsRUFBRTtZQUN0QixNQUFNLElBQUksR0FBRyxjQUFjO2lCQUN0QixRQUFRLENBQUMsNEJBQTRCLENBQUM7aUJBQ3RDLFFBQVEsRUFBRTtpQkFDVixJQUFJLEVBQUUsQ0FBQztZQUNaLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBRSxLQUFLLENBQUEsRUFBRTtZQUN2QixNQUFNLEtBQUssR0FBRyxjQUFjO2lCQUN2QixRQUFRLENBQUMsNkJBQTZCLENBQUM7aUJBQ3ZDLFFBQVEsRUFBRTtpQkFDVixJQUFJLEVBQUUsQ0FBQztZQUNaLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDL0I7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFFZCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLFNBQVM7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsR0FBRyxFQUFFLFNBQVM7U0FDakI7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9