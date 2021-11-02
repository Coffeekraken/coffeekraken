import __childProcess from 'child_process';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';

export function postprocess(config) {
    try {
        if (!config.repo?.url) {
            const packageJson = __packageJsonSync();
            if (packageJson.repository?.url) {
                config.repo.url = packageJson.repository.url;
            } else {
                const url = __childProcess
                    .execSync('git config --get remote.origin.url')
                    .toString()
                    .trim();
                config.repo.url = url;
            }
        }
        if (!config.user?.name) {
            const name = __childProcess
                .execSync('git config --get user.name')
                .toString()
                .trim();
            config.user.name = name;
        }
        if (!config.user?.email) {
            const email = __childProcess
                .execSync('git config --get user.email')
                .toString()
                .trim();
            config.user.email = email;
        }
    } catch (e) {}

    return config;
}

export default function (env) {
    if (env.platform !== 'node') return;

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
