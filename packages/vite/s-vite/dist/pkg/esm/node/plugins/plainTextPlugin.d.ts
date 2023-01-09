declare const _default: {
    name: string;
    resolveId(id: string, fromPath: string): string;
    load(maybeEncodedId: string): Promise<string>;
};
export default _default;
