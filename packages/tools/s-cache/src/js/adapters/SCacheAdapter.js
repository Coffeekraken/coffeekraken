// @shared
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/src/shared/object/deepMerge';
export default class SCacheAdapter extends __SClass {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.
     *
     * @param         {Object}          [settings={}]             An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(__deepMerge({
            cacheAdapter: {}
        }, settings));
    }
    setCache(cache) {
        this.cache = cache;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDYWNoZUFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUVWLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLGlEQUFpRCxDQUFDO0FBc0QxRSxNQUFNLENBQUMsT0FBTyxPQUFnQixhQUFjLFNBQVEsUUFBUTtJQUkxRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxZQUFZLEVBQUUsRUFBRTtTQUNqQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWU7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQXFGRiJ9