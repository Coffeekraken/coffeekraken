import type { ISStateAdapter } from '../../shared/SState';

/**
 * @name        SStateFsAdapter
 * @namespace   js.adapters
 * @type        ISStateAdapter
 * @status      beta
 * @platform    js
 *
 * This state adapter allows you to save your state in the localStorage of the browser
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISStateFsAdapterSettings {
    folder: string;
}

export default class SStateFsAdapter implements ISStateAdapter {
    async = true;
    _id;
    _statesDir;
    _stateFile;
    _settings;
    constructor(id: string, settings?: Partial<ISStateFsAdapterSettings>) {
        this._id = id;
        this._settings = settings;
    }
    async _init() {
        const _packageTmpDir = (
            await import('@coffeekraken/sugar/node/path/packageTmpDir')
        ).default;

        this._statesDir =
            this._settings?.folder ?? `${_packageTmpDir()}/states`;
        this._stateFile = `${this._statesDir}/${this._id}.state.json`;
    }
    save(state: any): Promise<void> {
        return new Promise(async (resolve) => {
            const _fs = await import('fs');

            await this._init();

            // write the new state file
            if (!_fs.existsSync(this._statesDir)) {
                _fs.mkdirSync(this._statesDir);
            }
            if (_fs.existsSync(this._stateFile)) {
                _fs.unlinkSync(this._stateFile);
            }
            _fs.writeFileSync(this._stateFile, JSON.stringify(state, null, 4));
            resolve();
        });
    }
    load(): Promise<any> {
        return new Promise(async (resolve) => {
            const _fs = await import('fs');

            await this._init();

            let fileContent = '{}';
            if (_fs.existsSync(this._stateFile)) {
                fileContent = _fs
                    .readFileSync(this._stateFile, 'utf-8')
                    .toString();
            }
            resolve(JSON.parse(fileContent));
        });
    }
}
