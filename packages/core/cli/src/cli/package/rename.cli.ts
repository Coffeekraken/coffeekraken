// @ts-nocheck
import __SCliPackageRenameParamsInterface from '../../node/package/interface/SCliPackageRenameParamsInterface';
import __SPromise from '@coffeekraken/s-promise';

export default (stringArgs = '') => {
    return new __SPromise(async ({resolve, reject, emit, pipe}) => {
        const finalParams = __SCliPackageRenameParamsInterface.apply(stringArgs);

        if (!finalParams.name) {
            finalParams.name = await emit('ask', {
                type: 'input',
                message: 'Please enter the new name for your package',
                validate: (value) => {
                    return true;
                    return value.match(/^[a-zA-Z0-9_@-]+$/);
                }
            });
        }

        finalParams.folder = await emit('ask', {
            type: 'boolean',
            message: 'Do you want to rename the folder as well ?'
        });

        console.log(finalParams);

    });
};
