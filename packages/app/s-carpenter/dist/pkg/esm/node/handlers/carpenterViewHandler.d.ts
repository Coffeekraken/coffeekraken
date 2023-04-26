export interface ICarpenterViewHandlerViewData {
    $specs?: any;
    $source?: any;
    [key: string]: any;
}
export default function carpenterViewHandler({ req, res }: {
    req: any;
    res: any;
}): Promise<any>;
