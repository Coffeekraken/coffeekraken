export interface ICarpenterPagesHandlerViewData {
    $specs?: any;
    $source?: any;
    [key: string]: any;
}
export interface ICarpenterPage {
    path: string;
    json: any;
}
export default function carpenterPagesHandler({ req, res }: {
    req: any;
    res: any;
}): Promise<void>;
