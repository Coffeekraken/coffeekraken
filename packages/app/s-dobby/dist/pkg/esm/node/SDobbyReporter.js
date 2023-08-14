import __SClass from '@coffeekraken/s-class';
/**
 * @name                SDobbyReporter
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base reporter
 *
 * @param           {ISDobbyReporterSettings}          [settings={}]           Some settings to configure your dobby reporter instance
 *
 * @example         js
 * import { __SDobbyReporter } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobb extends __SDobbyReporter {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyReporter extends __SClass {
    /**
     * @name        type
     * @type        String
     *
     * Access the reporter type
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get type() {
        return this.metas.type;
    }
    /**
     * @name        name
     * @name        String
     *
     * Access the reporter name
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get name() {
        return this.metas.name;
    }
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(reporterMetas) {
        super();
        this.metas = reporterMetas;
        this.settings = reporterMetas.settings;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBSzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBZSxTQUFRLFFBQVE7SUF1QmhEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLGFBQW9DO1FBQzVDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQzNDLENBQUM7Q0FDSiJ9