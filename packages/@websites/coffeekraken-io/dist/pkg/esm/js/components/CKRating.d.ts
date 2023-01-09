import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CKRatings extends __SLitComponent {
    _settings: {};
    static get properties(): any;
    _ratingsApi: {
        _app: any;
        _db: any;
        _auth: any;
        _googleProvider: any;
        _user: any;
        _ratingObj: any;
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
    };
    state: {
        already: boolean;
        state: string;
        user: {
            email: any;
            name: any;
            pictureUrl: any;
        };
        rating: number;
        comment: string;
        ratings: any[];
    };
    constructor();
    mount(): Promise<void>;
    firstUpdated(): Promise<void>;
    _signInWithGoogle(): Promise<void>;
    _submit(): Promise<void>;
    renderRating(ratingObj: any): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
