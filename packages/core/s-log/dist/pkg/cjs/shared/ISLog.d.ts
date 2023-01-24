
export type ISLogType = 'log' | 'info' | 'warn' | 'error' | 'success';
export interface ISLogMargin {
    top: number;
    bottom: number;
}
export default interface ISLog {
    hash?: string;
    decorators?: boolean;
    time?: boolean;
    clear?: boolean;
    temp?: boolean;
    timestamp?: number;
    group?: string;
    margin: Partial<ISLogMargin>;
    type?: ISLogType;
    as?: string;
    value: any;
    active?: boolean;
    metas?: any;
    logger?: Function;
    notify?: boolean;
    verbose?: boolean;
}
