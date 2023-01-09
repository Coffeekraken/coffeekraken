
export interface IRewritesPluginRewrite {
    match: RegExp;
    rewrite(src: string, id: string): string;
}
export default function rewritesPlugin(rewrites: IRewritesPluginRewrite[]): {
    name: string;
    transform(src: any, id: any): Promise<{
        code: any;
        map: any;
    }>;
};
