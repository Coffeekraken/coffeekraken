import __SClass from '@coffeekraken/s-class';

import { ISDobbyPocketbaseReporterSettings } from './exports';
import type { ISDobbyReporterMetas, ISDobbyReporterSettings } from './types';

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
     * @name        metas
     * @type        Object
     *
     * Store the reporter metas
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    metas: ISDobbyReporterMetas;

    /**
     * @name        settings
     * @type        Object
     *
     * Store the reporter settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    settings: ISDobbyPocketbaseReporterSettings;

    /**
     * @name        type
     * @type        String
     *
     * Access the reporter type
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get type(): string {
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
    get name(): string {
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
    constructor(reporterMetas?: ISDobbyReporterMetas) {
        super();
        this.metas = reporterMetas;
        this.settings = reporterMetas.settings;
    }
}
