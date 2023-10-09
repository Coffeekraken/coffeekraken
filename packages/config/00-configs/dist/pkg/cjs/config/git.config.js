"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postprocess = void 0;
const package_1 = require("@coffeekraken/sugar/package");
const child_process_1 = __importDefault(require("child_process"));
function postprocess(api) {
    var _a, _b, _c, _d;
    try {
        if (!((_a = api.this.repo) === null || _a === void 0 ? void 0 : _a.url)) {
            const packageJson = (0, package_1.__packageJsonSync)();
            if ((_b = packageJson.repository) === null || _b === void 0 ? void 0 : _b.url) {
                api.this.repo.url = packageJson.repository.url;
            }
            else {
                const url = child_process_1.default
                    .execSync('git config --get remote.origin.url')
                    .toString()
                    .trim();
                api.this.repo.url = url;
            }
        }
        if (!((_c = api.this.user) === null || _c === void 0 ? void 0 : _c.name)) {
            const name = child_process_1.default
                .execSync('git config --get user.name')
                .toString()
                .trim();
            api.this.user.name = name;
        }
        if (!((_d = api.this.user) === null || _d === void 0 ? void 0 : _d.email)) {
            const email = child_process_1.default
                .execSync('git config --get user.email')
                .toString()
                .trim();
            api.this.user.email = email;
        }
    }
    catch (e) { }
    return api.this;
}
exports.postprocess = postprocess;
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlEQUFnRTtBQUNoRSxrRUFBMkM7QUFFM0MsU0FBZ0IsV0FBVyxDQUFDLEdBQUc7O0lBQzNCLElBQUk7UUFDQSxJQUFJLENBQUMsQ0FBQSxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBRSxHQUFHLENBQUEsRUFBRTtZQUNyQixNQUFNLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixHQUFFLENBQUM7WUFDeEMsSUFBSSxNQUFBLFdBQVcsQ0FBQyxVQUFVLDBDQUFFLEdBQUcsRUFBRTtnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2FBQ2xEO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxHQUFHLHVCQUFjO3FCQUNyQixRQUFRLENBQUMsb0NBQW9DLENBQUM7cUJBQzlDLFFBQVEsRUFBRTtxQkFDVixJQUFJLEVBQUUsQ0FBQztnQkFDWixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJLENBQUEsRUFBRTtZQUN0QixNQUFNLElBQUksR0FBRyx1QkFBYztpQkFDdEIsUUFBUSxDQUFDLDRCQUE0QixDQUFDO2lCQUN0QyxRQUFRLEVBQUU7aUJBQ1YsSUFBSSxFQUFFLENBQUM7WUFDWixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLENBQUEsTUFBQSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksMENBQUUsS0FBSyxDQUFBLEVBQUU7WUFDdkIsTUFBTSxLQUFLLEdBQUcsdUJBQWM7aUJBQ3ZCLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQztpQkFDdkMsUUFBUSxFQUFFO2lCQUNWLElBQUksRUFBRSxDQUFDO1lBQ1osR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUMvQjtLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtJQUVkLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDO0FBL0JELGtDQStCQztBQUVELG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNILElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsU0FBUztZQUNmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsU0FBUztTQUNuQjtRQUNELElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxHQUFHLEVBQUUsU0FBUztTQUNqQjtLQUNKLENBQUM7QUFDTixDQUFDO0FBN0NELDRCQTZDQyJ9