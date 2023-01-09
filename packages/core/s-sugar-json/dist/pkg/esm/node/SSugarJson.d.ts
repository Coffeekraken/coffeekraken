import __SClass from '@coffeekraken/s-class';
import type { ISKitchenAction } from '../../../../app/s-kitchen/dist/pkg/cjs/node/exports';
export interface ISSugarJsonSettings {
    packages: string | boolean;
    includePackage: boolean;
    includeModules: boolean;
    includeGlobal: boolean;
    includeTop: boolean;
}
export interface ISSugarJsonFileCliAction {
    description: string;
    process?: string;
    command?: string;
}
export interface ISSugarJsonFileCli {
    stack: string;
    description: string;
    defaultAction: string;
    actions: Record<string, ISSugarJsonFileCliAction>;
}
export interface ISSugarJsonFileConfigFolder {
    scope: 'default' | 'module' | 'repo' | 'package' | 'user';
    path: string;
}
export interface ISSugarJsonFileConfig {
    folders?: ISSugarJsonFileConfigFolder[];
}
export interface ISSugarJsonFile {
    theme?: string;
    variant?: string;
    recipe?: string;
    cli?: ISSugarJsonFileCli;
    config?: ISSugarJsonFileConfig;
    kitchen?: Record<string, ISKitchenAction>;
}
export default class SSugarJson extends __SClass {
    
    constructor(settings?: ISSugarJsonSettings);
    
    sanitizeJson(sugarJson: any): any;
    
    read(settings?: Partial<ISSugarJsonSettings>): Record<string, ISSugarJsonFile> | ISSugarJsonFile;
    
    current(): ISSugarJsonFile;
    
    search(settings?: ISSugarJsonSettings): string[];
}
