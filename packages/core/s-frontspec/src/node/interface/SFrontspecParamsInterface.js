// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontspecParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecParamsInterface extends __SInterface {
}
SFrontspecParamsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: __SugarConfig.get('frontspec.cache')
    },
    env: {
        type: 'String',
        default: undefined
    },
    clearCache: {
        type: 'Boolean',
        default: false
    }
};
export default SFrontspecParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY1BhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWNQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxZQUFZOztBQUMzQyxvQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7S0FDOUM7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQUVKLGVBQWUseUJBQXlCLENBQUMifQ==