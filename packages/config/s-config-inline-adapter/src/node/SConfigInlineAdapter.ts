// @ts-nocheck

import type { ISConfigEnvObj } from '@coffeekraken/s-config';
import type { ISConfigAdapterSettings } from '@coffeekraken/s-config-adapter';
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                  SConfigInlineAdapter
 * @namespace           node
 * @type                  Class
 * @status              beta
 *
 * This adapter let you pass directly an object to the SConfig instance
 *
 * @param                   {Object}                    json            The json to use as config
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISConfigInlineAdapterSettings
    extends ISConfigAdapterSettings {}

export default class SConfigInlineAdapter extends __SConfigAdapter {
    _json;

    constructor(json, settings: Partial<ISConfigInlineAdapterSettings>) {
        super(__deepMerge({}, settings || {}));
        this._json = json;
    }

    async integrity() {
        const hash = __sha256.encrypt(JSON.stringify(this._json));
        return hash;
    }

    async load(clearCache = false, env: ISConfigEnvObj, configObj) {
        return this._json;
    }
}
