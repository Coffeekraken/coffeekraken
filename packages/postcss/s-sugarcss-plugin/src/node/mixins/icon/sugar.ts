import __SInterface from '@coffeekraken/s-interface';
import { __fileName } from '@coffeekraken/sugar/fs';
import __fs from 'fs';

class SSugarcssPluginIconSugarMixinInterface extends __SInterface {
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

export interface ISSugarcssPluginIconFsMixinParams {
    path: string;
    as: string;
}

export { SSugarcssPluginIconSugarMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
    sourcePath,
    sharedData,
}: {
    params: Partial<ISSugarcssPluginIconFsMixinParams>;
    atRule: any;
    replaceWith: Function;
    sourcePath: string;
    sharedData: any;
}) {
    const finalParams: ISSugarcssPluginIconFsMixinParams = {
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
    const iconFilePath = finalParams.path;
    if (__fs.existsSync(iconFilePath)) {
        sharedData.icons.push({
            path: iconFilePath,
            as,
        });
    } else {
        throw new Error(
            `<red>[sugar.css.mixins.icon.sugar]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists in the sugar library`,
        );
    }

    replaceWith([]);
}
