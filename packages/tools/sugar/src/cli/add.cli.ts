// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __prependToFileSync from '@coffeekraken/sugar/node/fs/prependToFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __detectProjectType from '@coffeekraken/sugar/node/project/detectType';
import __fs from 'fs';
import __SSugarToolkitParamsInterface from './interface/SSugarToolkitParamsInterface';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SSugarToolkitParamsInterface.apply(stringArgs);

        const rootPath = __packageRoot(process.cwd());
        const projectType = __detectProjectType(rootPath);

        emit('log', {
            value: `<yellow>${projectType.type}</yellow> project detected in version <cyan>${projectType.version}</cyan>`,
        });

        // installing the actual package
        emit('log', {
            value: `Installing the actual <cyan>@coffeekraken/sugar</cyan>...`,
        });
        try {
            await pipe(__npmInstall('@coffeekraken/sugar'));
        } catch (e) {
            emit('log', {
                value: `Something went wrong when installing the @coffeekraken/sugar package. Please try to install it manually.`,
            });
        }

        // pleasant css syntax
        if (
            await emit('ask', {
                type: 'confirm',
                message: `Add the <yellow>pleasant css syntax</yellow> support`,
                default: true,
            })
        ) {
            switch (projectType.type) {
                case 'next':
                    console.log('adding to next');
                    // adding the js needed
                    __fs.writeFileSync(
                        `${rootPath}/pages/_sugar.ts`,
                        [
                            `import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';`,
                            `if (typeof window === 'object') {`,
                            `   __expandPleasantCssClassnamesLive();`,
                            `}`,
                        ].join('\n'),
                    );
                    // adding the≤ import in the _app.tsx file
                    __prependToFileSync(
                        `${rootPath}/pages/_app.tsx`,
                        ["import './_sugar';"].join('\n'),
                    );
                    break;
            }
        }

        resolve();
    });
};
