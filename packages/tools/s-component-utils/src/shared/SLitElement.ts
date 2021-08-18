import { LitElement } from 'lit-element';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';

export default class SLitElement extends LitElement {
    static _attributeNameForProperty(property) {
        return __dashCase(property);
    }
}
