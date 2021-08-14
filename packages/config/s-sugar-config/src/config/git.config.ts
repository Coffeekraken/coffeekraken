import __childProcess from 'child_process';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';

export function prepare(config) {
    try {
        if (!config.repo?.url) {
            const packageJson = __packageJsonSync();
            if (packageJson.repository?.url) {
                config.repo.url = packageJson.repository.url;
            } else {
                const url = __childProcess.execSync('git config --get remote.origin.url').toString().trim();
                config.repo.url = url;
            }
        }
        if (!config.user?.name) {
            const name = __childProcess.execSync('git config --get user.name').toString().trim();
            config.user.name = name;
        }
        if (!config.user?.email) {
            const email = __childProcess.execSync('git config --get user.email').toString().trim();
            config.user.email = email;
        }
    } catch (e) {}

    return config;
}

export default function (env) {
    if (env.platform !== 'node') return;

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
