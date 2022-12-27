import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';

export default {
    slugs: ['/changelog/:version?'],
    params: {},
    views: [
        {
            data({ req }) {
                const versions = __readJsonSync(
                    `${__dirname()}/../../../versions.json`,
                );
                const lastVersion = Object.keys(versions)[0];
                let requestedVersion = versions[lastVersion];
                requestedVersion.version = lastVersion;
                if (versions[req.params.version]) {
                    requestedVersion = versions[req.params.version];
                    requestedVersion.version = req.params.version;
                }
                return {
                    requestedVersion,
                };
            },
            path: 'pages.changelog.changelog',
        },
    ],
};
