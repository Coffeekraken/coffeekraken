// @ts-nocheck
import __fs from 'fs';
import __deepMerge from '../../object/deepMerge';
import __writeFileSync from '../../fs/writeFileSync';
import __diff from '../../object/diff';
import __SConfigAdapter from './SConfigAdapter';
import __packageRoot from '../../path/packageRoot';
import __path from 'path';
import __chokidar from 'chokidar';
export default class SConfigFolderAdapter extends __SConfigAdapter {
    get configFolderAdapterSettings() {
        return this._settings.configFolderAdapter;
    }
    constructor(settings) {
        super(__deepMerge({
            configFolderAdapter: {
                fileName: '[name].config.js',
                folderName: '.sugar',
                defaultConfigPath: __path.resolve(__dirname, '../../config'),
                appConfigPath: `${__packageRoot(process.cwd())}/[folderName]`,
                userConfigPath: `${__packageRoot(process.cwd())}/.local/[folderName]`
            }
        }, settings || {}));
        this.configFolderAdapterSettings.folderName = this.configFolderAdapterSettings.folderName.replace('[name]', this.name);
        if (this.configFolderAdapterSettings.defaultConfigPath)
            this.configFolderAdapterSettings.defaultConfigPath = this.configFolderAdapterSettings.defaultConfigPath.replace('[folderName]', this.configFolderAdapterSettings.folderName);
        if (this.configFolderAdapterSettings.appConfigPath)
            this.configFolderAdapterSettings.appConfigPath = this.configFolderAdapterSettings.appConfigPath.replace('[folderName]', this.configFolderAdapterSettings.folderName);
        if (this.configFolderAdapterSettings.userConfigPath)
            this.configFolderAdapterSettings.userConfigPath = this.configFolderAdapterSettings.userConfigPath.replace('[folderName]', this.configFolderAdapterSettings.folderName);
        // watch for changes
        const watchPaths = [];
        if (this.configFolderAdapterSettings.defaultConfigPath &&
            __fs.existsSync(this.configFolderAdapterSettings.defaultConfigPath)) {
            watchPaths.push(this.configFolderAdapterSettings.defaultConfigPath);
        }
        if (this.configFolderAdapterSettings.appConfigPath &&
            __fs.existsSync(this.configFolderAdapterSettings.appConfigPath)) {
            watchPaths.push(this.configFolderAdapterSettings.appConfigPath);
        }
        if (this.configFolderAdapterSettings.userConfigPath &&
            __fs.existsSync(this.configFolderAdapterSettings.userConfigPath)) {
            watchPaths.push(this.configFolderAdapterSettings.userConfigPath);
        }
        __chokidar
            .watch(watchPaths, {
            ignoreInitial: true
        })
            .on('change', (p) => this.emit('update', p))
            .on('unlink', (p) => this.emit('update', p))
            .on('add', (p) => this.emit('update', p));
    }
    load() {
        this._defaultConfig = {};
        this._appConfig = {};
        this._userConfig = {};
        if (this.configFolderAdapterSettings.defaultConfigPath &&
            __fs.existsSync(this.configFolderAdapterSettings.defaultConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`] = true;
            __fs
                .readdirSync(this.configFolderAdapterSettings.defaultConfigPath)
                .forEach((file) => {
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                    return;
                if (this._defaultConfig[file.replace('.config.js', '')] !== undefined)
                    return;
                const configData = require(`${this.configFolderAdapterSettings.defaultConfigPath}/${file}`);
                this._defaultConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
            });
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`] = JSON.stringify(this._defaultConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`]) {
            this._defaultConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.defaultConfigPath}`]);
        }
        if (this.configFolderAdapterSettings.defaultConfigPath !==
            this.configFolderAdapterSettings.appConfigPath &&
            this.configFolderAdapterSettings.appConfigPath &&
            __fs.existsSync(this.configFolderAdapterSettings.appConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`] = true; // intermediate value
            __fs
                .readdirSync(this.configFolderAdapterSettings.appConfigPath)
                .forEach((file) => {
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                    return;
                const configData = require(`${this.configFolderAdapterSettings.appConfigPath}/${file}`);
                this._appConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
            });
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`] = JSON.stringify(this._appConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`]) {
            this._appConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.appConfigPath}`]);
        }
        if (this.configFolderAdapterSettings.defaultConfigPath !==
            this.configFolderAdapterSettings.userConfigPath &&
            this.configFolderAdapterSettings.appConfigPath !==
                this.configFolderAdapterSettings.userConfigPath &&
            this.configFolderAdapterSettings.userConfigPath &&
            __fs.existsSync(this.configFolderAdapterSettings.userConfigPath)) {
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`] = true; // intermediate value
            __fs
                .readdirSync(this.configFolderAdapterSettings.userConfigPath)
                .forEach((file) => {
                if (!file.includes(this.configFolderAdapterSettings.fileName.replace('[name]', '')))
                    return;
                const configData = require(`${this.configFolderAdapterSettings.userConfigPath}/${file}`);
                this._userConfig[file.replace('.config.js', '')] =
                    Object.keys(configData).length === 1 && configData.default
                        ? configData.default
                        : configData;
            });
            process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`] = JSON.stringify(this._userConfig);
        }
        else if (process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`]) {
            this._userConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.configFolderAdapterSettings.userConfigPath}`]);
        }
        // mix the configs and save them in the instance
        const n = __deepMerge(this._defaultConfig, this._appConfig, this._userConfig);
        return n;
    }
    save(newConfig = {}) {
        if (!this.configFolderAdapterSettings.userConfigPath) {
            throw new Error(`You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`);
        }
        const baseConfig = __deepMerge(this._defaultConfig, this._appConfig);
        Object.keys(baseConfig).forEach((name) => {
            const configToSave = __diff(baseConfig[name], newConfig[name] || {});
            const newConfigString = `
      module.exports = ${JSON.stringify(configToSave)};
    `;
            // write the new config file
            __writeFileSync(this.configFolderAdapterSettings.userConfigPath +
                '/' +
                this.configFolderAdapterSettings.fileName.replace('[name]', name), newConfigString);
        });
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZvbGRlckFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnRm9sZGVyQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZDLE9BQU8sZ0JBQWdCLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQW1DbEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxvQkFBcUIsU0FBUSxnQkFBZ0I7SUFDaEUsSUFBSSwyQkFBMkI7UUFDN0IsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLG1CQUFtQixDQUFDO0lBQ25ELENBQUM7SUFFRCxZQUFZLFFBQTJDO1FBQ3JELEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxtQkFBbUIsRUFBRTtnQkFDbkIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQztnQkFDNUQsYUFBYSxFQUFFLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlO2dCQUM3RCxjQUFjLEVBQUUsR0FBRyxhQUFhLENBQzlCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDZCxzQkFBc0I7YUFDeEI7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsMkJBQTJC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