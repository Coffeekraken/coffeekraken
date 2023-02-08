
export interface ISetCookieSettings {
    path: string;
    domain: string;
    expires: string;
    'max-age': number;
    secure: boolean;
    samesite: boolean | 'strict' | 'lax';
    httpOnly: boolean;
}
export default function __setCookie(name: string, value: any, settings?: Partial<ISetCookieSettings>): void;
