
export interface IDependencyHashObj {
    files?: string[];
    data?: any;
}
export interface IDependencyHashSettings {
    recursive: boolean;
}
export default function __dependenciesHash(dependenciesObj: IDependencyHashObj, settings?: IDependencyHashSettings): Promise<string>;
