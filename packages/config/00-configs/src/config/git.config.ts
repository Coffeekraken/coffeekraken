import { __packageJsonSync } from '@coffeekraken/sugar/package';
import __childProcess from 'child_process';

export function postprocess(api) {
    try {
        if (!api.this.repo?.url) {
            const packageJson = __packageJsonSync();
            if (packageJson.repository?.url) {
                api.this.repo.url = packageJson.repository.url;
            } else {
                const url = __childProcess
                    .execSync('git config --get remote.origin.url')
                    .toString()
                    .trim();
                api.this.repo.url = url;
            }
        }
        if (!api.this.user?.name) {
            const name = __childProcess
                .execSync('git config --get user.name')
                .toString()
                .trim();
            api.this.user.name = name;
        }
        if (!api.this.user?.email) {
            const email = __childProcess
                .execSync('git config --get user.email')
                .toString()
                .trim();
            api.this.user.email = email;
        }
    } catch (e) {}

    return api.this;
}

export default function (api) {
    if (api.env.platform !== 'node') return;

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
