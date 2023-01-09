declare class RatingsApi {
    _app: any;
    _db: any;
    _auth: any;
    _googleProvider: any;
    _user: any;
    _ratingObj: any;
    constructor();
    init(): void;
    getRatingObjForCurrentUser(): Promise<any>;
    _signInWithGoogle(): Promise<{
        email: string;
        name: string;
        pictureUrl: string;
    }>;
    create(ratingObj: any): Promise<void>;
    _readPromise: any;
    read(): Promise<any>;
}
declare const _default: RatingsApi;
export default _default;
