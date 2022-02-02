// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __childProcess from 'child_process';
import __fs from 'fs';
import __SCliPackageInstallParamsInterface from '../../node/package/interface/SCliPackageInstallParamsInterface';

export default (stringArgs = '') => {
    return new __SPromise(async ({resolve, reject, emit, pipe}) => {
        const finalParams = __SCliPackageInstallParamsInterface.apply(stringArgs);
        
        if (__fs.existsSync(`${process.cwd()}/package.json`)) {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${__SSugarConfig.get('package.manager')}</cyan>...`
            });
            __childProcess.execSync(`${__SSugarConfig.get('package.manager')} install`);
        }

        if (__fs.existsSync(`${process.cwd()}/composer.json`)) {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`
            });
            __childProcess.execSync('composer install');
        }
       
        resolve();

    });
};
