import __SInterface from '@coffeekraken/s-interface';
import { __fileName } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';

class postcssSugarPluginIconFsMixinInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                type: 'String',
                required: true,
            },
            as: {
                type: 'String',
            },
        };
    }
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

    let as = finalParams.as;
    if (!as) {
        as = __fileName(iconPath.split('.').slice(0, -1).join('.'));
    }

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

    return replaceWith([`/** S-SUGAR-FS-ICON:${as} */`]);
}
