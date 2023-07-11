// @ts-nocheck

import type { ISDescriptorResultObj } from '../SDescriptorResult.js';
import type {
    ISDescriptorRule,
    ISDescriptorSettings,
} from '../_SDescriptor.js';

/**
 * @name          minRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 *
 * This rule allows you to make sure a value is not under a certain value
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export interface IRuleParams {
    value: boolean;
}
export interface IRuleSettings {}

const ruleObj: ISDescriptorRule = {
    name: 'Min',
    id: 'min',
    settings: {},
    accept: 'Number',
    message: (resultObj: any): string => {
        return `This value has to be minimum "<yellow>${resultObj.min}</yellow>". Received "<red>${resultObj.received}</red>"`;
    },
    processParams: (params: number) => {
        return { value: params };
    },
    apply: (
        value: any,
        params: IRuleParams,
        ruleSettings: IRuleSettings,
        settings: ISDescriptorSettings,
    ): ISDescriptorResultObj | true => {
        if (value < params.value) {
            return new Error(
                `<red>[minRule]</red> Sorry but the passed value "<yellow>${value}</yellow>" must be greater or equal at <cyan>${params.value}</cyan>`,
            );
        }
        return value;
    },
};

export default ruleObj;
