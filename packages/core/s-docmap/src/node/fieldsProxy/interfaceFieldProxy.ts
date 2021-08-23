/**
 * @name            interfaceFieldProxy
 * @namespace       node.fieldsProxy
 * @type                Function
 * @platform        node
 * @platform        ts
 * @status          beta
 *
 * This field proxy take the "interface" field and transform it to full
 * interface with props etc...
 *
 * @param       {any}           data        The interface data to process
 * @return      {ISDocMapInterfaceField}            The full interface data
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISDocMapInterfaceField {}

export default async function interfaceFieldProxy(data: any): ISDocMapInterfaceField {
    const int = (await import(data.path)).default;
    return int.toObject();
}
