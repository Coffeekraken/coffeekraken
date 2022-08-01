export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        environments: {
            dev: {
                branch: 'develop',
                urls: {
                    website: {
                        label: 'Template',
                        url: 'http://localhost:3000',
                    },
                    admin: {
                        label: 'Admin',
                        url: 'http://localhost:3000/admin',
                    },
                },
            },
            staging: {
                branch: 'staging',
                urls: {
                    website: {
                        label: 'Template',
                        url: 'http://staging.localhost:3000',
                    },
                    admin: {
                        label: 'Admin',
                        url: 'http://staging.localhost:3000/admin',
                    },
                },
            },
            preprod: {
                branch: 'preprod',
                urls: {
                    website: {
                        label: 'Template',
                        url: 'http://preprod.localhost:3000',
                    },
                    admin: {
                        label: 'Admin',
                        url: 'http://preprod.localhost:3000/admin',
                    },
                },
            },
            prod: {
                branch: 'prod',
                urls: {
                    website: {
                        label: 'Template',
                        url: 'http://prod.localhost:3000',
                    },
                    admin: {
                        label: 'Admin',
                        url: 'http://prod.localhost:3000/admin',
                    },
                },
            },
        },
    };
}
