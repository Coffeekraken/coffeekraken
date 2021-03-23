// @ts-nocheck

import __SType from '../../type/SType';
import { ISDescriptorResultObj } from '../SDescriptorResult';
import SDescriptor, {
  ISDescriptorRule,
  ISDescriptorSettings
} from '../_SDescriptor';

/**
 * @name          typeRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 *
 * This rule allows you to make sure a value does match the passed type like:
 * - String | Array<String>
 * - Boolean
 * - Number
 * - etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export interface IParams {
  value: boolean;
}
export interface IRuleSettings {}

const ruleObj: ISDescriptorRule = {
  name: 'Type',
  id: 'type',
  settings: {},
  message: (resultObj: any): string => {
    return `This value has to be of type "<yellow>${resultObj.expected.type}</yellow>". Received "<red>${resultObj.received.type}</red>"`;
  },
  processParams: (params: any) => {
    if (!params?.type && typeof params !== 'string') {
      throw new Error(
        `<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...`
      );
    }
    return {
      type: params.type ?? params,
      cast: params.cast ?? true,
      plop: params.plop
    };
  },
  apply: (
    value: any,
    params: IParams,
    ruleSettings: IRuleSettings,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj | true => {
    const type = new __SType(params.type, {
      metas: {
        id: settings.id
      }
    });

    if (params.cast && !type.is(value)) {
      value = type.cast(value);
      if (params.plop) {
        console.log('CC', params, value);
      }
    }

    if (!type.is(value)) {
      return new Error('Something false');
    }
    return value;
  }
};

// register the new rule
SDescriptor.registerRule(ruleObj);

export default ruleObj;
