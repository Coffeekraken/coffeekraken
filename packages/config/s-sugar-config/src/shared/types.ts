export * from '../config/storage.config.js';

import type { IStorageConfig } from '../config/storage.config.js';

export interface ISSugarConfig {
    storage: IStorageConfig;
}
