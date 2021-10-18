import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __path from 'path';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __fileName from '@coffeekraken/sugar/node/fs/filename';

class postcssSugarPluginIconFsMixinInterface extends __SInterface {
    static definition = {
        path: {
            type: 'String',
            required: true,
        },
        as: {
            type: 'String',
            required: false,
        },
    };
}

export interface IPostcssSugarPluginIconFsMixinParams {
    path: string;
    as: string;
}

export { postcssSugarPluginIconFsMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
    sourcePath,
    sharedData,
}: {
    params: Partial<IPostcssSugarPluginIconFsMixinParams>;
    atRule: any;
    replaceWith: Function;
    sourcePath: string;
    sharedData: any;
}) {
    const finalParams: IPostcssSugarPluginIconFsMixinParams = {
        path: '',
        as: '',
        ...params,
    };

    if (!sharedData.icons) {
        sharedData.icons = [];
    }

    // generating the "as"
    let as = finalParams.as;
    if (!as)
        as = __fileName(finalParams.path.split('.').slice(0, -1).join('.'));

    // reading the icon file
    const potentialFilePathFromRoot = __path.resolve(
        __packageRootDir(),
        finalParams.path,
    );
    const potentialFilePathFromFile = __path.resolve(
        sourcePath,
        finalParams.path,
    );

    if (__fs.existsSync(potentialFilePathFromFile)) {
        sharedData.icons.push({
            path: potentialFilePathFromFile,
            as,
        });
    } else if (__fs.existsSync(potentialFilePathFromRoot)) {
        sharedData.icons.push({
            path: potentialFilePathFromRoot,
            as,
        });
    } else {
        throw new Error(
            `<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`,
        );
    }

    replaceWith([]);
}
