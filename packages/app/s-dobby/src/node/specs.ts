export * from '../shared/specs';

import { __homeDir } from '@coffeekraken/sugar/path';

export const SDobbyFsPoolSettingsSpecs = {
    type: 'Object',
    title: 'SDobby FS adapter settings',
    description: 'Specify the SDobby FS adapter settings',
    props: {
        rootDir: {
            type: 'String',
            title: 'Root directory',
            description: 'Specify where to save the SDobby configurations',
            default: `${__homeDir()}/.dobby`,
        },
    },
};
