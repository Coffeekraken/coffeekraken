export declare const postcss = true;
declare const _default: {
    name: string;
    configResolved(resolvedConfig: any): void;
    transform(src: any, id: any): Promise<{
        code: any;
        map: any;
    }>;
};
export default _default;
