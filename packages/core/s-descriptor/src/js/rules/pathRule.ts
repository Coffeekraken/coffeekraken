// @ts-nocheck

import { __isGlob } from '@coffeekraken/sugar/is';
import { __isPath } from '@coffeekraken/sugar/shared/is/path';
import type { ISDescriptorResultObj } from '../SDescriptorResult';
import type { ISDescriptorRule, ISDescriptorSettings } from '../_SDescriptor';

/**
 * @name          pathRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 * @status        wip
 *
 * This rule allows you to make sure a value is not under a certain value
 *
 * @todo      tests
 * @todo      doc
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export interface IRuleParams {
    value: boolean;
}
export interface IRuleSettings {}

const ruleObj: ISDescriptorRule = {
    name: 'Path',
    id: 'path',
    settings: {
        mapOnArray: true,
    },
    processParams: (params: number) => {
        return {
            absolute: params.absolute ?? false,
            exists: params.exists ?? false,
            create: params.create ?? false,
            rootDir:
                params.rootDir ??
                (process && process.cwd ? process.cwd() : '/'),
            glob: params.glob ?? false,
            tokens: params.tokens ?? true,
            cast: params.cast ?? true,
        };
    },
    apply: (
        value: any,
        params: IRuleParams,
        ruleSettings: IRuleSettings,
        settings: ISDescriptorSettings,
    ): ISDescriptorResultObj | true => {
        if (typeof value !== 'string') {
            return new Error(
                'The path value must be a <yellow>String</yellow>',
            );
        }

        // function toAbsolute(path) {
        //   if (params.absolute && path.slice(0, 1) !== '/') {
        //     if (!params.cast)
        //       return new Error(
        //         `The passed path "<cyan>${path}</cyan>" must be absolute and cannot be casted automatically`
        //       );
        //     path = `${rootDir}${path}`;
        //   }
        //   return path;
        // }

        if (params.glob) {
            switch (params.glob) {
                case true:
                    break;
                case false:
                    if (__isGlob(value))
                        return new Error(
                            `The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`,
                        );
                    break;
            }
        }

        if (!__isPath(value)) {
            return new Error(
                `The passed path "<cyan>${value}</cyan>" is not a valid path`,
            );
        }

        if (params.exists) {
            return new Error(
                `<red>[SDescriptor.pathRule]</red> Sorry but the "exists" parameter cannot be used in browser context"`,
            );
        }

        return value;
    },
};

export default ruleObj;
