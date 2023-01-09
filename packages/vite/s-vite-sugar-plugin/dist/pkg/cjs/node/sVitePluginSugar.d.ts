
export default function sVitePluginSugar(settings?: any): {
    name: string;
    configResolved(resolvedConfig: any): void;
    transform(src: any, id: any): Promise<{
        code: any;
        map: any;
    }>;
};
