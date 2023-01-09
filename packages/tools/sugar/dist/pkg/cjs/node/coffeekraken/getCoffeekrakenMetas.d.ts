import { ISemverObject } from '../../shared/version/parseSemverString';

export interface ICoffeekrakenMetas {
    version: ISemverObject;
}
export default function getCoffeekrakenMetas(): ICoffeekrakenMetas;
