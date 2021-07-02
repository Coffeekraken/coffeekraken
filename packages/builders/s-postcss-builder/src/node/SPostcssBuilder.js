import __SBuilder from '@coffeekraken/s-builder';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default class SPostcssBuilder extends __SBuilder {
    /**
     * @name            postcssBuilderSettings
     * @type            ISPostcssBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get postcssBuilderSettings() {
        return this._settings.postcssBuilder;
    }
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            postcssBuilder: {}
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Bvc3Rjc3NCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBa0R0RSxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsVUFBVTtJQUVuRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHNCQUFzQjtRQUN0QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNkLGNBQWMsRUFBRSxFQUFFO1NBQ3JCLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBY0oifQ==