// @ts-nocheck

import __SType from '@coffeekraken/s-type';
import { ISDescriptorResultObj } from '../SDescriptorResult';
import { ISDescriptorRule, ISDescriptorSettings } from '../_SDescriptor';

/**
 * @name          typeRule
 * @namespace     sugar.js.descriptor.rules
 * @type          ISDescriptorRule
 *
 * This rule allows you to make sure a value does match the passed type like:
 * - String | Array<String>
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
  prority: 10,
  name: 'Type',
  id: 'type',
  settings: {},
  processParams: (params: any) => {
    if (!params?.type && typeof params !== 'string') {
      throw new Error(
        `<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...`
      );
    }

    return {
      ...(typeof params !== 'string' ? params : {}),
      type: params.type ?? params,
      cast: params.cast ?? true
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
      value = type.cast(value, params);
    }
    if (!type.is(value)) {
      return new Error(
        `The value must be of type "<yellow>${
          params.type
        }</yellow>" but you've passed a value of type "<cyan>${typeof value}</cyan>"`
      );
    }
    return value;
  }
};

export default ruleObj;
