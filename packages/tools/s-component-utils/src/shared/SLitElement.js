// @ts-nocheck
// @TODO            check how to override private static methods
import { LitElement } from 'lit-element';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
export default class SLitElement extends LitElement {
    static _attributeNameForProperty(property) {
        return __dashCase(property);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpdEVsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTGl0RWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsZ0VBQWdFO0FBRWhFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFFcEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFZLFNBQVEsVUFBVTtJQUMvQyxNQUFNLENBQUMseUJBQXlCLENBQUMsUUFBUTtRQUNyQyxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0oifQ==