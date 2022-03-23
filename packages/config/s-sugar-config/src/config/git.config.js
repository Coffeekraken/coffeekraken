var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "child_process", "@coffeekraken/sugar/node/package/jsonSync"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.postprocess = void 0;
    const child_process_1 = __importDefault(require("child_process"));
    const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
    function postprocess(env, config) {
        var _a, _b, _c, _d;
        try {
            if (!((_a = config.repo) === null || _a === void 0 ? void 0 : _a.url)) {
                const packageJson = (0, jsonSync_1.default)();
                if ((_b = packageJson.repository) === null || _b === void 0 ? void 0 : _b.url) {
                    config.repo.url = packageJson.repository.url;
                }
                else {
                    const url = child_process_1.default
                        .execSync('git config --get remote.origin.url')
                        .toString()
                        .trim();
                    config.repo.url = url;
                }
            }
            if (!((_c = config.user) === null || _c === void 0 ? void 0 : _c.name)) {
                const name = child_process_1.default
                    .execSync('git config --get user.name')
                    .toString()
                    .trim();
                config.user.name = name;
            }
            if (!((_d = config.user) === null || _d === void 0 ? void 0 : _d.email)) {
                const email = child_process_1.default
                    .execSync('git config --get user.email')
                    .toString()
                    .trim();
                config.user.email = email;
            }
        }
        catch (e) { }
        return config;
    }
    exports.postprocess = postprocess;
    function default_1(env) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsa0VBQTJDO0lBQzNDLHlGQUEwRTtJQUUxRSxTQUFnQixXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU07O1FBQ25DLElBQUk7WUFDQSxJQUFJLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxJQUFJLDBDQUFFLEdBQUcsQ0FBQSxFQUFFO2dCQUNuQixNQUFNLFdBQVcsR0FBRyxJQUFBLGtCQUFpQixHQUFFLENBQUM7Z0JBQ3hDLElBQUksTUFBQSxXQUFXLENBQUMsVUFBVSwwQ0FBRSxHQUFHLEVBQUU7b0JBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2lCQUNoRDtxQkFBTTtvQkFDSCxNQUFNLEdBQUcsR0FBRyx1QkFBYzt5QkFDckIsUUFBUSxDQUFDLG9DQUFvQyxDQUFDO3lCQUM5QyxRQUFRLEVBQUU7eUJBQ1YsSUFBSSxFQUFFLENBQUM7b0JBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2lCQUN6QjthQUNKO1lBQ0QsSUFBSSxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsSUFBSSwwQ0FBRSxJQUFJLENBQUEsRUFBRTtnQkFDcEIsTUFBTSxJQUFJLEdBQUcsdUJBQWM7cUJBQ3RCLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQztxQkFDdEMsUUFBUSxFQUFFO3FCQUNWLElBQUksRUFBRSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsS0FBSyxDQUFBLEVBQUU7Z0JBQ3JCLE1BQU0sS0FBSyxHQUFHLHVCQUFjO3FCQUN2QixRQUFRLENBQUMsNkJBQTZCLENBQUM7cUJBQ3ZDLFFBQVEsRUFBRTtxQkFDVixJQUFJLEVBQUUsQ0FBQztnQkFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDN0I7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7UUFFZCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBL0JELGtDQStCQztJQUVELG1CQUF5QixHQUFHO1FBQ3hCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTztRQUVwQyxPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxTQUFTO2FBQ25CO1lBQ0QsSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEdBQUcsRUFBRSxTQUFTO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUE3Q0QsNEJBNkNDIn0=