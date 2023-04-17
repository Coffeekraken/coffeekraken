export interface ICarpenterViewHandlerViewData {
    $specs?: any;
    $source?: any;
    [key: string]: any;
}
export default function carpenterViewHandler({ req, res, specs, }: {
    req: any;
    res: any;
    specs: any;
}): Promise<any>;
