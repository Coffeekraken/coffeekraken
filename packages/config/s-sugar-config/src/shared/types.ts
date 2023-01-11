export * from '../config/storage.config';

import type { IStorageConfig } from '../config/storage.config';

export interface ISSugarConfig {
    storage: IStorageConfig;
}
