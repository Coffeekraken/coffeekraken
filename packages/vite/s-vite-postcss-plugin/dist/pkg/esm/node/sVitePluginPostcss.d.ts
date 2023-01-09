
export default function sVitePluginPostcss(): {
    name: string;
    transform(src: any, id: any): Promise<{
        code: string;
        map: any;
    }>;
};
