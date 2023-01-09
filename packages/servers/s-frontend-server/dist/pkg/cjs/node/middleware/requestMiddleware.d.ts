
declare function requestMiddleware(settings?: {}): (req: any, res: any, next: any) => Promise<any>;
export default requestMiddleware;
