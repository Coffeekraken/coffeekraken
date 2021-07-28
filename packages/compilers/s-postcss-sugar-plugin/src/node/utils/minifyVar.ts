// import __shorter from 'shorter';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';

export default function minifyVar(variableStr: string): string {
    return variableStr;
    const encoded = __md5.encrypt(variableStr.replace(/^--/, ''));
    const minifiedArray: string[] = [];
    let cur = 0, every = 3;
    encoded.split('').forEach((char, i) => {
        if (!cur) minifiedArray.push(char);
        cur++;
        if (cur >= every) cur = 0;
    });
    return '--s' + minifiedArray.join('');

}