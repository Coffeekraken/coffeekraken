
declare function configMiddleware(settings?: {}): (req: any, res: any, next: any) => Promise<any>;
export default configMiddleware;
