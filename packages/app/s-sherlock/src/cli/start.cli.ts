// @ts-nocheck

import __SDobby from '../node/SDobby.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const dobby = new __SDobby();

        dobby.events.on('ready', () => {
            return;
            dobby.addTask({
                uid: 'responseTime',
                type: 'responseTime',
                name: 'Response time',
                schedule: '*/5 * * * * *',
            });
        });

        dobby.server();

        const result = await dobby.start(stringArgs);
        resolve(result);
    });
};
