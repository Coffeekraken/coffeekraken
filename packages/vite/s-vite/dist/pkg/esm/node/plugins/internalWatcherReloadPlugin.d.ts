import type { PluginOption } from 'vite';

interface Config {
    config: boolean;
}

declare const _default: (config?: Config) => PluginOption;
export default _default;
